var MERCATO = MERCATO || {};
MERCATO.Users  = MERCATO.Users || {};
MERCATO.Users.ReturnOrder  = MERCATO.Users.ReturnOrder || {};

MERCATO.Users.ReturnOrder = {
    onReturnClicked: function (element)
    {
        var order_detail_id = parseInt(element.id.split("-")[1]);

        var payload = {};
        payload['order_detail_ids'] = [order_detail_id];
        payload['order_detail_status'] = "RETURN_INITIATED";

        console.log(payload);
        $.ajax({
            url: "/users/order_detail/",
            type: 'PUT',
            data: {payload: payload}
        })
        .done( function( response )
        {
            console.log(response);
            MERCATO.Utils.showToastMessage("Return Initiated successfully", "SUCCESS");
            $("#tdReturnProduct-"+order_detail_id).remove();
            $("#tdStatus-"+order_detail_id).text("RETURN_INITIATED");
        })
        .fail( function( response )
        {
            console.log("Failure - Code: " + response["status"]);
            console.log("Failure - Message: " + response["responseText"]);
            MERCATO.Utils.showToastMessage('Exception "' + response["responseText"] + '" occurred while trying to return product!', "ERROR");
        });
    }
};