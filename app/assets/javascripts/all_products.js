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
        MERCATO.Admin.AllProducts.calculatePages();

        var navigationBar = $('#ulPageNavigation');
        navigationBar.twbsPagination('destroy');
        navigationBar.twbsPagination(
        {
            totalPages: MERCATO.Admin.AllProducts.pages,
            visiblePages: 7,
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
    }
};