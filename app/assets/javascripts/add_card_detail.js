$(document).ready(function()
{
    $('#formNewCardDetail').bind("ajax:success", function(data, status, xhr)
    {
        console.log("Add Card Detail success!");
        $("#divNewCardDetailFormMessage").html("");
        MERCATO.Utils.showToastMessage("Card Detail added successfully", "SUCCESS");
        window.setTimeout( function(){
            window.location = "/users/edit";
        }, 1000 );
    })
        .bind("ajax:error", function(xhr, status, error)
        {
            console.log("Add Card Detail failed");
            console.log(status);
            $("#divNewCardDetailFormMessage").html(status['responseText']);
            MERCATO.Utils.showToastMessage('Exception "' + status["responseText"] + '" occurred while trying to add card detail!', "ERROR");
        });
});
