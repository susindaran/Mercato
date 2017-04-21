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
        if( newFrequency < 5 || newFrequency > 60 )
        {
            MERCATO.Utils.showToastMessage('Frequency should be between 5 to 60 days', "ERROR");
            return;
        }
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
    },
    updateSubscriptionStatus: function(element)
    {
        var subscriptionId = parseInt(element.id.split("-")[1]);
        var updateStatusBtn = $("#aUpdateStatus-"+subscriptionId);
        var statusHolder = $("#subscriptionStatus-"+subscriptionId);
        var currentStatus = statusHolder.text();
        var targetStatus = '';

        if( currentStatus === 'ACTIVE' )
        {
            targetStatus = 'INACTIVE';
        }
        else if( currentStatus === 'INACTIVE')
        {
            targetStatus = 'ACTIVE'
        }

        var payload = {subscription_status: targetStatus};
        $.ajax({
            url: "/users/subscriptions/"+subscriptionId,
            type: 'PUT',
            data: {payload: payload}
        })
        .done( function( response )
        {
            console.log(response);
            MERCATO.Utils.showToastMessage('Subscription has been updated !', "SUCCESS");

            if( targetStatus === 'ACTIVE' )
            {
                updateStatusBtn.text('DEACTIVATE');
                statusHolder.text( 'ACTIVE' );
            }
            else if( targetStatus === 'INACTIVE' )
            {
                updateStatusBtn.text('ACTIVATE');
                statusHolder.text( 'INACTIVE' );
            }
        })
        .fail( function( response )
        {
            console.log("Failure - Code: " + response["status"]);
            console.log("Failure - Message: " + response["responseText"]);
            MERCATO.Utils.showToastMessage('Exception "' + response["responseText"] + '" occurred while trying to update subscription!', "ERROR");
        });
    }
 };