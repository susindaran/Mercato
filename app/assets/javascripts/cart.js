var MERCATO = MERCATO || {};
MERCATO.Cart  = MERCATO.Cart || {};
MERCATO.Cart.CartItems = MERCATO.Cart.CartItems || {};

MERCATO.Cart = {
    changeProductQuantity: function (element, add)
    {
        var cartId = element.id.split("-")[1];

        var cartItem;
        for(var i = 0; i < MERCATO.Cart.CartItems.count; i++)
        {
            var item = MERCATO.Cart.CartItems['cart_items'][i];
            if (item['cart_id'] == cartId)
            {
                cartItem = item;
                break;
            }
        }

        var payload = {};
        payload.quantity = cartItem.quantity + (add ? 1 : -1);

        $("#aSubQuantity-"+cartId).addClass("disabled");
        $("#aAddQuantity-"+cartId).addClass("disabled");


        $.ajax({
            url: "/cart/"+cartId+".json",
            type: 'PUT',
            data: {payload: payload}
        }).done(function (response) {
            console.log(response);

            cartItem.quantity = payload.quantity;
            $("#spQuantity-"+cartId).text(payload.quantity);
            $("#divCartItemPrice-"+cartId).text("$"+(cartItem.product.price * cartItem.quantity));

            MERCATO.Cart.calculatePriceDetails();
            MERCATO.Utils.showToastMessage("Cart item updated successfully!", "SUCCESS");
            $("#aAddQuantity-"+cartId).removeClass("disabled");
        }).fail(function (response) {
            console.log("Failure - Code: " + response["status"]);
            console.log("Failure - Message: " + response["responseText"]);
            if( JSON.parse(response["responseText"])["errors"][0].indexOf("quantity exceeds") > -1 )
            {
                MERCATO.Utils.showToastMessage("Product out of stock!", "ERROR");
            }
            else
            {
                MERCATO.Utils.showToastMessage('Exception "' + response["responseText"] + '" occurred while trying to update cart item!', "ERROR");
            }
        }).always(function () {
            if( payload.quantity > 1 )
            {
                $("#aSubQuantity-"+cartId).removeClass("disabled");
            }
        });
    },
    removeProductFromCart: function (element)
    {
        var cartId = element.id.split("-")[1];

        $("#divProgressBar-"+cartId).css("display", "block");
        //Make ajax call to delete item from cart
        $.ajax({
            url: "/cart/" + cartId + ".json",
            type: 'DELETE'
        }).done( function( response ) {
            console.log(response);

            //Removing the item from the cart items data map (Mercato.Cart.CartItems)
            for(var i = 0; i < MERCATO.Cart.CartItems.count; i++)
            {
                var cartItem = MERCATO.Cart.CartItems['cart_items'][i];
                if( cartItem['cart_id'] == cartId )
                {
                    MERCATO.Cart.CartItems['cart_items'].splice(i, 1);
                    break;
                }
            }

            MERCATO.Cart.CartItems.count--;

            //Removing the card
            setTimeout(function () {
                $("#divCartItemCard-"+cartId).fadeOut(500, function () {
                    $("#divProgressBar-"+cartId).css("display", "none");
                    $(this).remove();
                });
            },1000);

            //Disabling the 'proceed to checkout' buttons if there are no items in cart
            if( MERCATO.Cart.CartItems.count <= 0 )
            {
                $(".proceed-checkout-btn").addClass("disabled");
            }

            MERCATO.Cart.calculatePriceDetails();
            MERCATO.Utils.showToastMessage("Item removed from cart", "SUCCESS");
        }).fail( function( response ) {
            console.log("Failure - Code: " + response["status"]);
            console.log("Failure - Message: " + response["responseText"]);
            MERCATO.Utils.showToastMessage('Exception "' + response["responseText"] + '" occurred while trying to delete item from cart!', "ERROR");
        });
    },
    calculatePriceDetails: function ()
    {
        MERCATO.Cart.CartItems['price_details']['total_price'] = 0;
        MERCATO.Cart.CartItems['price_details']['discounts'] = 0;
        for(var i = 0; i < MERCATO.Cart.CartItems.count; i++)
        {
            var cartItem = MERCATO.Cart.CartItems['cart_items'][i];

            MERCATO.Cart.CartItems['price_details']['total_price'] += (cartItem['product']['price'] * cartItem['quantity']);
            if( cartItem['offer'] !== undefined )
            {
                MERCATO.Cart.CartItems['price_details']['discounts'] += ((cartItem['offer']['discount'] * cartItem['product']['price'] / 100) * cartItem['quantity']);
            }
        }
        MERCATO.Cart.CartItems['price_details']['amount_payable'] = MERCATO.Cart.CartItems['price_details']['total_price'] - MERCATO.Cart.CartItems['price_details']['discounts'];

        $("#divTotalCartPrice").text("$"+MERCATO.Cart.CartItems['price_details']['total_price']);
        $("#divTotalCartDiscounts").text("$"+MERCATO.Cart.CartItems['price_details']['discounts']);
        $("#divAmountPayable").text("$"+MERCATO.Cart.CartItems['price_details']['amount_payable']);
    }
};