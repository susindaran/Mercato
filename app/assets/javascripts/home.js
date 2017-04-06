var MERCATO = MERCATO || {};
MERCATO.Home  = MERCATO.AllProducts || {};

MERCATO.Home = {
    getProducts: function (element)
    {

    $.ajax({
                url: "/home/"+element.value+"?page="+1+"&size="+25,
                type: 'GET'
            })
//                .done( function( response )
//                {
//                    console.log(response);
//
//                })
//                .fail( function( response )
//                {
//                    console.log("Failure - Code: " + response["status"]);
//                    console.log("Failure - Message: " + response["responseText"]);
//                    MERCATO.Utils.showToastMessage('Exception "' + response["responseText"] + '" occurred while trying to change order detail status!', "ERROR");
//                });
                }
};