var MERCATO = MERCATO || {};
MERCATO.Customer = MERCATO.Customer || {};
MERCATO.Customer.ProductPage = MERCATO.Customer.ProductPage || {};

MERCATO.Customer.ProductPage = {
    quantityChange: function(element)
    {
        var qty = parseInt(element.value);
        $("#totalPriceDiv").text("Total price: $"+(MERCATO.Customer.ProductPage.productPrice * qty).toFixed(2));
    },
    availability: function()
    {
        var addToCartBtn = $("#addToCartButton");
        if(MERCATO.Customer.ProductPage.productQuantity > 0)
        {
            $("#availabilityDiv").html("<div style='color: green'>In Stock</div>");
            if( addToCartBtn.hasClass("disabled") )
            {
                addToCartBtn.removeClass("disabled");
            }
        }
        else
        {
            $("#availabilityDiv").html("<div style='color: red'>Out of Stock</div>");
            if( !addToCartBtn.hasClass("disabled") )
            {
                addToCartBtn.addClass("disabled");
            }
        }
    },
    addProductToCart: function()
    {
        var payload = {};
        var quantity = parseInt($("#prdQty").val());
        payload['product_id'] = MERCATO.Customer.ProductPage.productId;
        payload['quantity'] = quantity;
        console.log(payload);
        $.ajax({
            url: "/product/add_to_cart.json",
            type: 'POST',
            data: {payload: payload}
        })
        .done( function( response )
        {
            MERCATO.Customer.ProductPage.cartCount += 1;
            $("#aCartBtn").html("Cart ("+MERCATO.Customer.ProductPage.cartCount+")<i class=\"material-icons right\" style=\"line-height: 38px\">shopping_cart</i>");
            MERCATO.Customer.ProductPage.productQuantity -= quantity;
            MERCATO.Customer.ProductPage.availability();
            MERCATO.Utils.showToastMessage("Product added to cart", "SUCCESS");
        })
        .fail( function( response )
        {
            console.log("Failure - Code: " + response["status"]);
            console.log("Failure - Message: " + response["responseText"]);
            MERCATO.Utils.showToastMessage( JSON.parse(response["responseText"])['errors'], "ERROR");
        });
    }
};