$(document).ready(function()
{
    $('#new_user').bind("ajax:success", function(data, status, xhr)
    {
        console.log("Add User successfull!");
        $("#divNewUserErrorMessage").html("");
        MERCATO.Utils.showToastMessage("Congrats! You can now login.", "SUCCESS");
        window.setTimeout( function(){
            window.location = "/login/";
        }, 1000 );
    })
        .bind("ajax:error", function(xhr, status, error)
        {
            console.log("Add User failed");
            console.log(status);
            $("#divNewUserErrorMessage").html(JSON.parse(status['responseText'])['error']);
            MERCATO.Utils.showToastMessage('Exception "' + status["responseText"] + '" occurred while trying to add user!', "ERROR");
        });
});