var MERCATO = MERCATO || {};
MERCATO.Checkout = MERCATO.Checkout || {};

MERCATO.Checkout = {
    onShippingAddressSelected: function (element)
    {
        MERCATO.Checkout.shippingAddressId = parseInt(element.id.split("-")[1]);
        MERCATO.Checkout.stage = Math.max(2, MERCATO.Checkout.stage);

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

    $('.collapsible').collapsible();
});