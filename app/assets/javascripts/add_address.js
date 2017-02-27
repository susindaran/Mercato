$(document).ready(function()
{
    $('#formNewAddress').bind("ajax:success", function(data, status, xhr)
    {
        console.log("Add Address success!");
        $("#divNewAddressFormMessage").html("");
        MERCATO.Utils.showToastMessage("Address added successfully", "SUCCESS");
        window.setTimeout( function(){
            window.location = "/users/edit";
        }, 1000 );
    })
        .bind("ajax:error", function(xhr, status, error)
        {
            console.log("Add address failed");
            console.log(status);
            $("#divNewAddressFormMessage").html(status['responseText']);
            MERCATO.Utils.showToastMessage('Exception "' + status["responseText"] + '" occurred while trying to add address!', "ERROR");
        });
});
