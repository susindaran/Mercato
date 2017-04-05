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