var MERCATO = MERCATO || {};
MERCATO.Admin  = MERCATO.Admin || {};
MERCATO.Admin.AllProducts  = MERCATO.Admin.AllProducts || {};
MERCATO.Admin.AllProducts.totalCount = -1;
MERCATO.Admin.AllProducts.pageSize = -1;
MERCATO.Admin.AllProducts.pages = -1;

MERCATO.Admin.AllProducts = {
    getProductTable: function ( page )
    {
        $.get("/admin/product?page="+page+"&size="+MERCATO.Admin.AllProducts.pageSize);
    },
    onPageSizeChanged: function( element )
    {
        MERCATO.Admin.AllProducts.pageSize = parseInt( element.value );
        MERCATO.Admin.AllProducts.drawNavigationBar( 1, true );
    },
    drawNavigationBar: function( startPage, redraw )
    {
        MERCATO.Admin.AllProducts.calculatePages();
        var navigationBar = $('#ulPageNavigation');
        if( redraw == true )
        {
            navigationBar.twbsPagination('destroy');
        }
        navigationBar.twbsPagination(
            {
                totalPages: MERCATO.Admin.AllProducts.pages,
                visiblePages: 7,
                startPage: startPage,
                onPageClick: function (event, page)
                {
                    MERCATO.Admin.AllProducts.getProductTable( page );
                }
            });
    },
    calculatePages: function()
    {
        MERCATO.Admin.AllProducts.pages = (MERCATO.Admin.AllProducts.totalCount / MERCATO.Admin.AllProducts.pageSize) +
            (MERCATO.Admin.AllProducts.totalCount % MERCATO.Admin.AllProducts.pageSize == 0 ? 0 : 1);
    },
    openDeleteModal: function( element )
    {
        var elementId = element.parentNode.id;
        var rowIndex = elementId.split("-")[1];
        var productID = $("#tdProductId-"+rowIndex).text();

        $("#divDeleteProductModalContent").text("Are you sure you want to delete the product - " + productID);
        $("#hidDeleteProductId").val( productID );

        $("#divDeleteProductModal").modal('open');
    },
    deleteProduct: function()
    {
        var productId = $("#hidDeleteProductId").val();
        console.log(productId);
        $.ajax({
            url: "/admin/product/" + productId + ".json",
            type: 'DELETE'
        })
            .done( function( response )
            {
                console.log(response);
                var currentPage = $('#ulPageNavigation').twbsPagination('getCurrentPage');
                MERCATO.Admin.AllProducts.totalCount--;
                MERCATO.Admin.AllProducts.drawNavigationBar( currentPage, true );

                MERCATO.Utils.showToastMessage("Product successfully deleted", "SUCCESS");
            })
            .fail( function( response )
            {
                console.log("Failure - Code: " + response["status"]);
                console.log("Failure - Message: " + response["responseText"]);
                MERCATO.Utils.showToastMessage('Exception "' + response["responseText"] + '" occurred while trying to delete product!', "ERROR");
            });
    }
};