var MERCATO = MERCATO || {};
MERCATO.Customer = MERCATO.Customer || {};
MERCATO.Customer.Subscriptions = MERCATO.Customer.Subscriptions || {};

MERCATO.Customer.Subscriptions = {
    skipDueDate: function (element)
    {
        var subscriptionId = parseInt(element.id.split("-")[1]);
         $.ajax({
                    url: "/users/subscriptions/skip/"+subscriptionId,
                    type: 'POST'
        })
        .done( function( response )
        {
            console.log(response);
            var nextDueDate = response['next_due_date'];
            $("#tdNextDueDate-"+subscriptionId).text(nextDueDate);
            MERCATO.Utils.showToastMessage('Subscription\'s next delivery will be skipped!', "SUCCESS");

         })
        .fail( function( response )
        {
            console.log("Failure - Code: " + response["status"]);
            console.log("Failure - Message: " + response["responseText"]);
            MERCATO.Utils.showToastMessage('Exception "' + response["responseText"] + '" occurred while trying to skip next delivery!', "ERROR");
        });
    }
 };