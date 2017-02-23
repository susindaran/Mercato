var MERCATO = MERCATO || {};
MERCATO.Customer  = MERCATO.Customer || {};
MERCATO.Customer.EditProfile  = MERCATO.Customer.EditProfile || {};

MERCATO.Customer.EditProfile = {
    deleteAddress: function( element )
    {
        var elementId = element.id;
        var addressId = elementId.split("-")[1];

        $.ajax({
            url: "/users/address/" + addressId + ".json",
            type: 'DELETE'
        })
        .done( function( response )
            {
                console.log(response);

                var parentCardElement = document.getElementById("divAddressCard-"+addressId);
                parentCardElement.parentNode.removeChild( parentCardElement );

                MERCATO.Utils.showToastMessage("Address successfully deleted", "SUCCESS");
            }
        ).fail( function( response )
        {
            console.log("Failure - Code: " + response["status"]);
            console.log("Failure - Message: " + response["responseText"]);
            MERCATO.Utils.showToastMessage('Exception "' + response["responseText"] + '" occurred while trying to delete address!', "ERROR");
        }
        );

    },
    editAddress: function (element)
    {

    },
    deleteCardDetail: function (element)
    {
        var elementId = element.id;
        var cardNumber = elementId.split("-")[1];

        $.ajax({
            url: "/users/card_detail/" + cardNumber + ".json",
            type: 'DELETE'
        })
        .done( function( response )
            {
                console.log(response);

                var parentCardElement = document.getElementById("divCardDetailCard-"+cardNumber);
                parentCardElement.parentNode.removeChild(parentCardElement);

                MERCATO.Utils.showToastMessage("Card Details successfully deleted", "SUCCESS");
            }
        ).fail( function( response )
        {
            console.log("Failure - Code: " + response["status"]);
            console.log("Failure - Message: " + response["responseText"]);
            MERCATO.Utils.showToastMessage('Exception "' + response["responseText"] + '" occurred while trying to delete card details!', "ERROR");
        }
        );
    },
    editCardDetail: function (element)
    {

    }
};

$(document).ready(function()
{
    $('#formEditProfile').bind("ajax:success", function(data, status, xhr)
    {
        console.log("Update success!");
        $("#divUpdateErrorMessage").html("");
        MERCATO.Utils.showToastMessage("Profile updated successfully", "SUCCESS");
    })
    .bind("ajax:error", function(xhr, status, error)
    {
        console.log("Update profile failed");
        var errorMessage = JSON.parse(status['responseText']);
        console.log(status);
        $("#divUpdateErrorMessage").html(errorMessage['error']);
        MERCATO.Utils.showToastMessage('Exception "' + status["responseText"] + '" occurred while trying to update profile!', "ERROR");
    });
});
