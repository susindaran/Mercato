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
    },


    decreaseQuantity: function(element)
    {
            var subscriptionId = parseInt(element.id.split("-")[1]);

        var quantity=parseInt($("#qty-"+subscriptionId).text());
        if(quantity<20)
        {
                $("#aAddQuantity-"+subscriptionId).removeClass("disabled");

        }
        if(quantity>1)
        {
        var updatedQuantity=quantity-1;
        $("#qty-"+subscriptionId).text(updatedQuantity);
        }
        else
        {
                $("#aSubQuantity-"+subscriptionId).addClass("disabled");
        }
MERCATO.Customer.Subscriptions.enableUpdateButton(subscriptionId);
    },

    increaseQuantity: function(element)
    {
            var subscriptionId = parseInt(element.id.split("-")[1]);
        var quantity=parseInt($("#qty-"+subscriptionId).text());
        if(quantity>0)
        {
        $("#aSubQuantity-"+subscriptionId).removeClass("disabled");
        }
        if(quantity<20)
        {
        var updatedQuantity=quantity+1;
        $("#qty-"+subscriptionId).text(updatedQuantity);
        }
        else
        {
               $("#aAddQuantity-"+subscriptionId).addClass("disabled");

        }
MERCATO.Customer.Subscriptions.enableUpdateButton(subscriptionId);
    },

    enableUpdateButton: function(subscriptionId)
    {

                    $("#tdEditSubscription-"+subscriptionId).removeClass("disabled");

    },


    updateSubscription: function(element)
    {
                var subscriptionId = parseInt(element.id.split("-")[1]);

        var newFrequency=parseInt($("#tdFrequency-"+subscriptionId).val());
        var newQuantity=parseInt($("#qty-"+subscriptionId).text());
        var payload={};
        payload['quantity']=newQuantity;
        payload['frequency_in_days']=newFrequency;
console.log(payload);
        $.ajax({
            url: "/users/subscriptions/"+subscriptionId,
            type: 'PUT',
            data: {payload: payload}
        })
        .done( function( response )
                {
                    console.log(response);
                    MERCATO.Utils.showToastMessage('Subscription has been updated !', "SUCCESS");
                    $("#tdEditSubscription-"+subscriptionId).addClass("disabled");

                 })
                .fail( function( response )
                {
                    console.log("Failure - Code: " + response["status"]);
                    console.log("Failure - Message: " + response["responseText"]);
                    MERCATO.Utils.showToastMessage('Exception "' + response["responseText"] + '" occurred while trying to skip next delivery!', "ERROR");
                });
    }
 };