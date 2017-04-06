var productPrice = 0;
var productQuantity=0;

function quantityChange(element)
{
    var qty = parseInt(element.value);
    $("#totalPriceDiv").text("Total price: "+(productPrice * qty));
}

function availability()
{
    if(productQuantity > 0)
        $("#availabilityDiv").text("In Stock");
    else
        $("#availabilityDiv").text("Not in Stock");

}


 function addProductToCart(element)
    {
        var productId = element.id.split("-")[1];
        console.log(productId);
        var payload = {};
        var quantity = parseInt($("#prdQty").val());
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
