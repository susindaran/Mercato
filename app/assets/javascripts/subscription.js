var MERCATO = MERCATO || {};
MERCATO.Subscription = MERCATO.Subscription || {};

MERCATO.Subscription = {
    onShippingAddressSelected: function (element)
    {
        MERCATO.Subscription.shippingAddressId = parseInt(element.id.split("-")[1]);
        MERCATO.Subscription.stage = Math.max(2, MERCATO.Subscription.stage);

        var state = $("#addressCardState-"+MERCATO.Subscription.shippingAddressId).text().split(" ")[1];

        $.ajax({
            url: "/cart/tax_details/"+state+".json",
            type: 'GET'
        })
        .done( function( response )
        {
            console.log(response);
            MERCATO.Subscription.tax = (response.tax * MERCATO.Subscription.initialPriceTotal / 100);
            $("#tdTaxSummary").text("$"+MERCATO.Subscription.tax.toFixed(2));
            $("#tdTotalAmountPayable").text("$"+(MERCATO.Subscription.tax + MERCATO.Subscription.initialPriceTotal).toFixed(2));
        })
        .fail( function( response )
        {
            console.log("Failure - Code: " + response["status"]);
            console.log("Failure - Message: " + response["responseText"]);
            MERCATO.Utils.showToastMessage('Exception "' + response["responseText"] + '" occurred while trying to fetch tax details!', "ERROR");
        });

        var billingAddressCollapsible = $("#divSubscribeBillingAddressCollapsibleHeader");
        if( billingAddressCollapsible.hasClass("disabled") )
        {
            billingAddressCollapsible.removeClass("disabled");
        }

        setTimeout( function () {
            $('#divSubscribeBillingAddressCollapsibleHeader').click();
        }, 500);
    },
    onBillingAddressSelected: function (element)
    {
        MERCATO.Subscription.billingAddressId = parseInt(element.id.split("-")[1]);
        MERCATO.Subscription.stage = Math.max(3, MERCATO.Subscription.stage);

        var orderSummaryCollapsible = $("#divSubscribeOrderSummaryCollapsibleHeader");
        if( orderSummaryCollapsible.hasClass("disabled") )
        {
            orderSummaryCollapsible.removeClass("disabled");
        }

        setTimeout( function () {
            $('#divSubscribeOrderSummaryCollapsibleHeader').click();
        }, 500);
    },
    onProceedSubscriptionClicked: function ()
    {
        MERCATO.Subscription.stage = Math.max(4, MERCATO.Subscription.stage);

        var paymentCollapsible = $("#divSubscribePaymentCollapsibleHeader");
        if( paymentCollapsible.hasClass("disabled") )
        {
            paymentCollapsible.removeClass("disabled");
        }

        setTimeout( function () {
            $('#divSubscribePaymentCollapsibleHeader').click();
        }, 500);
    },
    onCardSelected: function (element)
    {
        MERCATO.Subscription.cardNumber = element.id.split("-")[1];
        console.log(MERCATO.Subscription.cardNumber);

        var placeOrderButton = $("#aSubscribeBtn");
        if( placeOrderButton.hasClass("disabled") )
        {
            placeOrderButton.removeClass("disabled");
        }
    },
    onSubscribeClicked: function ()
    {
        var payload = {};
        payload['billing_address_id'] = parseInt(MERCATO.Subscription.billingAddressId);
        payload['shipping_address_id'] = parseInt(MERCATO.Subscription.shippingAddressId);

        //TODO: When subscription API supports card number, add this to the payload
        // payload['card_number'] = MERCATO.Subscription.cardNumber;

        payload['cart_ids'] = [];
        payload['frequencies'] = [];
        $('input.subscribe-frequency-input').each(function(){
            var cartId = parseInt($(this).attr('id').split("-")[1]);
            var freq = parseInt($(this).val());

            payload['cart_ids'].push(cartId);
            payload['frequencies'].push(freq);
        });

        console.log(payload);
        $.ajax({
            url: "/cart/subscribe.json",
            type: 'POST',
            data: {payload: payload}
        })
        .done( function( response )
        {
            console.log(response);
            MERCATO.Utils.showToastMessage("Subscription created successfully", "SUCCESS");
            window.setTimeout( function(){
                window.location = "/users/subscriptions";
            }, 1000 );
        })
        .fail( function( response )
        {
            console.log("Failure - Code: " + response["status"]);
            console.log("Failure - Message: " + response["responseText"]);
            MERCATO.Utils.showToastMessage(JSON.parse(response["responseText"])['errors'], "ERROR");
        });
    },
    onUnsubscribeClicked: function (element)
    {
        var subscription_id=element.id.split("-")[1];
        $.ajax({
            url: "/users/subscriptions/"+subscription_id,
            type: 'DELETE'

        })
        .done( function( response )
        {
            console.log(response);
            MERCATO.Utils.showToastMessage("Product removed from subscription", "SUCCESS");
            $("#subscriptionRow-"+subscription_id).remove();
        })
        .fail( function( response )
        {
            console.log("Failure - Code: " + response["status"]);
            console.log("Failure - Message: " + response["responseText"]);
            MERCATO.Utils.showToastMessage('Exception "' + response["responseText"] + '" occurred while trying to unsubscribe!', "ERROR");
        });
    }
};

$(document).ready(function () {
   MERCATO.Subscription.stage = 1;
   $("#divSubscribeBillingAddressCollapsibleHeader").on('click', function (event) {
       if( MERCATO.Subscription.stage < 2 )
       {
           event.preventDefault();
           event.stopPropagation();
       }
   });

    $("#divSubscribeOrderSummaryCollapsibleHeader").on('click', function (event) {
        if( MERCATO.Subscription.stage < 3 )
        {
            event.preventDefault();
            event.stopPropagation();
        }
    });

    $("#divSubscribePaymentCollapsibleHeader").on('click', function (event) {
        if( MERCATO.Subscription.stage < 4 )
        {
            event.preventDefault();
            event.stopPropagation();
        }
    });
});