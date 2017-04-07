var MERCATO = MERCATO || {};
MERCATO.Checkout = MERCATO.Checkout || {};

MERCATO.Checkout = {
    onShippingAddressSelected: function (element)
    {
        MERCATO.Checkout.shippingAddressId = parseInt(element.id.split("-")[1]);
        MERCATO.Checkout.stage = Math.max(2, MERCATO.Checkout.stage);

        var state = $("#addressCardState-"+MERCATO.Checkout.shippingAddressId).text().split(" ")[1];

        $.ajax({
            url: "/cart/tax_details/"+state+".json",
            type: 'GET'
        })
        .done( function( response )
        {
            console.log(response);
            MERCATO.Checkout.tax = (response.tax * MERCATO.Checkout.initialPriceTotal / 100);
            $("#tdTaxSummary").text("$"+MERCATO.Checkout.tax.toFixed(2));
            $("#tdTotalAmountPayable").text("$"+(MERCATO.Checkout.tax + MERCATO.Checkout.initialPriceTotal).toFixed(2));
        })
        .fail( function( response )
        {
            console.log("Failure - Code: " + response["status"]);
            console.log("Failure - Message: " + response["responseText"]);
            MERCATO.Utils.showToastMessage('Exception "' + response["responseText"] + '" occurred while trying to fetch tax details!', "ERROR");
        });

        var billingAddressCollapsible = $("#divBillingAddressCollapsibleHeader");
        if( billingAddressCollapsible.hasClass("disabled") )
        {
            billingAddressCollapsible.removeClass("disabled");
        }

        setTimeout( function () {
            $('#divBillingAddressCollapsibleHeader').click();
        }, 500);
    },
    onBillingAddressSelected: function (element)
    {
        MERCATO.Checkout.billingAddressId = parseInt(element.id.split("-")[1]);
        MERCATO.Checkout.stage = Math.max(3, MERCATO.Checkout.stage);

        var orderSummaryCollapsible = $("#divOrderSummaryCollapsibleHeader");
        if( orderSummaryCollapsible.hasClass("disabled") )
        {
            orderSummaryCollapsible.removeClass("disabled");
        }

        setTimeout( function () {
            $('#divOrderSummaryCollapsibleHeader').click();
        }, 500);
    },
    onProceedCheckoutClicked: function ()
    {
        MERCATO.Checkout.stage = Math.max(4, MERCATO.Checkout.stage);

        var paymentCollapsible = $("#divPaymentCollapsibleHeader");
        if( paymentCollapsible.hasClass("disabled") )
        {
            paymentCollapsible.removeClass("disabled");
        }

        setTimeout( function () {
            $('#divPaymentCollapsibleHeader').click();
        }, 500);
    },
    onCardSelected: function (element)
    {
        MERCATO.Checkout.cardNumber = element.id.split("-")[1];
        console.log(MERCATO.Checkout.cardNumber);

        var placeOrderButton = $("#aPlaceOrderBtn");
        if( placeOrderButton.hasClass("disabled") )
        {
            placeOrderButton.removeClass("disabled");
        }
    },
    onPlaceOrderClicked: function ()
    {
        var payload = {};
        payload['billing_address_id'] = parseInt(MERCATO.Checkout.billingAddressId);
        payload['shipping_address_id'] = parseInt(MERCATO.Checkout.shippingAddressId);
        payload['card_number'] = MERCATO.Checkout.cardNumber;

        $.ajax({
            url: "/cart/checkout.json",
            type: 'POST',
            data: {payload: payload}
        })
        .done( function( response )
        {
            console.log(response);
            MERCATO.Utils.showToastMessage("Order placed successfully", "SUCCESS");
            window.setTimeout( function(){
                window.location = "/users/orders";
            }, 1000 );
        })
        .fail( function( response )
        {
            console.log("Failure - Code: " + response["status"]);
            console.log("Failure - Message: " + response["responseText"]);
            MERCATO.Utils.showToastMessage('Exception "' + response["responseText"] + '" occurred while trying to place order!', "ERROR");
        });
    }
};

$(document).ready(function () {
   MERCATO.Checkout.stage = 1;
   $("#divBillingAddressCollapsibleHeader").on('click', function (event) {
       if( MERCATO.Checkout.stage < 2 )
       {
           event.preventDefault();
           event.stopPropagation();
       }
   });

    $("#divOrderSummaryCollapsibleHeader").on('click', function (event) {
        if( MERCATO.Checkout.stage < 3 )
        {
            event.preventDefault();
            event.stopPropagation();
        }
    });

    $("#divPaymentCollapsibleHeader").on('click', function (event) {
        if( MERCATO.Checkout.stage < 4 )
        {
            event.preventDefault();
            event.stopPropagation();
        }
    });
});