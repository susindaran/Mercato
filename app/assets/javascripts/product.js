 function addProductToCart(element)
    {
        var productId = element.id.split("-")[1];
        console.log(productId);
        var payload = {};
        var quantity = 1;
        payload['product_id']=productId;
        payload['quantity']=quantity;
        console.log(payload);
        $.ajax({
            url: "/product/add_to_cart.json",
            type: 'POST',
            data: {payload: payload}
        })
            .done( function( response )
            {
              MERCATO.Utils.showToastMessage("Product added to cart", "SUCCESS");
            })
            .fail( function( response )
            {
                console.log("Failure - Code: " + response["status"]);
                console.log("Failure - Message: " + response["responseText"]);
                MERCATO.Utils.showToastMessage('Exception "' + response["responseText"] + '" occurred while trying to add product to cart!', "ERROR");
            });
    }
