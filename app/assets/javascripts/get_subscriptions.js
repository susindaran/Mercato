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
    updateQuantity: function(element, add)
    {
        var subscriptionId = parseInt(element.id.split("-")[1]);
        var subQtyElement = $("#qty-"+subscriptionId);
        var addQtyBtn = $("#aAddQuantity-"+subscriptionId);
        var subQtyBtn = $("#aSubQuantity-"+subscriptionId);
        var quantity=parseInt( subQtyElement.text() );

        quantity += add ? 1 : -1;
        subQtyElement.text( quantity );

        if( quantity <= 1 && !subQtyBtn.hasClass('disabled') )
        {
            subQtyBtn.addClass('disabled');
        }
        else if( subQtyBtn.hasClass('disabled') )
        {
            subQtyBtn.removeClass('disabled');
        }

        if( quantity >= 20 && !addQtyBtn.hasClass('disabled') )
        {
            addQtyBtn.addClass('disabled');
        }
        else if( addQtyBtn.hasClass('disabled') )
        {
            addQtyBtn.removeClass('disabled');
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
        var newFrequency = parseInt($("#tdFrequency-"+subscriptionId).val());
        var newQuantity = parseInt($("#qty-"+subscriptionId).text());
        var payload={};
        payload['quantity'] = newQuantity;
        payload['frequency_in_days'] = newFrequency;
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
            MERCATO.Utils.showToastMessage('Exception "' + response["responseText"] + '" occurred while trying to update subscription!', "ERROR");
        });
    }
 };