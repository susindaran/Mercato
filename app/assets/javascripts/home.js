var MERCATO = MERCATO || {};
MERCATO.Home  = MERCATO.Home || {};

MERCATO.Home = {
    searchProducts: function (event)
    {
        event.preventDefault();
        var searchQuery = $("#searchQuery").val();
        if(searchQuery !== '' )
        {
            window.location.href = "/?query="+searchQuery;
        }
    }
};