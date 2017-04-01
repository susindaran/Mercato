var MERCATO = MERCATO || {};
MERCATO.Admin  = MERCATO.Admin || {};
MERCATO.Admin.AllOrderDetails  = MERCATO.Admin.AllOrderDetails || {};

MERCATO.Admin.AllOrderDetails = {
    getOrderDetailTable: function (page )
    {
        var type = document.getElementById("sltOrderDetailStatus").value;
        $.ajax({
            url: "/admin/order_detail/"+type+"/?page="+page+"&size="+MERCATO.Admin.AllOrderDetails.pageSize,
            type: 'GET'
        })
            .done( function( response )
            {

            });
    },
    onPageSizeChanged: function( element )
    {
        MERCATO.Admin.AllOrderDetails.pageSize = parseInt( element.value );
        MERCATO.Admin.AllOrderDetails.drawNavigationBar( 1, true );
        console.log("redraw");
    },
    onStatusSelectionChanged: function (element)
    {
        console.log(element.value);
        $.ajax({
            url: "/admin/order_detail/"+element.value+"/?page="+1+"&size="+MERCATO.Admin.AllOrderDetails.pageSize,
            type: 'GET'
        })
            .done( function( response )
            {
                MERCATO.Admin.AllOrderDetails.drawNavigationBar( 1, true );
                console.log(MERCATO.Admin.AllOrderDetails.pages);
            });
    },
    drawNavigationBar: function( startPage, redraw )
    {
        MERCATO.Admin.AllOrderDetails.calculatePages();
        console.log(MERCATO.Admin.AllOrderDetails.pages);
        var navigationBar = $('#ulPageNavigation');
        if( redraw == true )
        {
            navigationBar.twbsPagination('destroy');
        }
        if( MERCATO.Admin.AllOrderDetails.pages > 0)
        {
            navigationBar.twbsPagination(
                {
                    totalPages: MERCATO.Admin.AllOrderDetails.pages,
                    visiblePages: 7,
                    startPage: MERCATO.Admin.AllOrderDetails.pages < startPage ? MERCATO.Admin.AllOrderDetails.pages : startPage,
                    onPageClick: function (event, page)
                    {
                        MERCATO.Admin.AllOrderDetails.getOrderDetailTable( page );
                    }
                });
        }
    },
    calculatePages: function()
    {
        MERCATO.Admin.AllOrderDetails.pages = (MERCATO.Admin.AllOrderDetails.totalCount / MERCATO.Admin.AllOrderDetails.pageSize) +
            (MERCATO.Admin.AllOrderDetails.totalCount % MERCATO.Admin.AllOrderDetails.pageSize == 0 ? 0 : 1);
    },
    changeOrderDetailStatus: function(element )
    {
        var elementId = element.parentNode.id;
        var index = elementId.split("-")[1];
        var shipmentId = $("#tdOrderDetailId-"+index).text();
        var shipmentStatus = $("#tdStatus-"+index).text();

        var shipmentChange = {
            "PENDING": "PACKED",
            "PACKED": "SHIPPED",
            "SHIPPED": "INVOICED",
            "RETURN_INITIATED": "RETURN_RECEIVED"
        };
        $.ajax({
            url: "/admin/order_detail/" + shipmentId + ".json?status="+shipmentChange[shipmentStatus],
            type: 'POST'
        })
            .done( function( response )
            {
                console.log(response);
                var currentPage = $('#ulPageNavigation').twbsPagination('getCurrentPage');
                MERCATO.Admin.AllOrderDetails.drawNavigationBar( currentPage, true );

                MERCATO.Utils.showToastMessage("Order Detail status changed", "SUCCESS");
            })
            .fail( function( response )
            {
                console.log("Failure - Code: " + response["status"]);
                console.log("Failure - Message: " + response["responseText"]);
                MERCATO.Utils.showToastMessage('Exception "' + response["responseText"] + '" occurred while trying to change order detail status!', "ERROR");
            });
    }
};