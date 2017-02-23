var MERCATO = MERCATO || {};
MERCATO.Utils = MERCATO.Utils || {};

MERCATO.Utils.validateJsonString = function( jsonString )
{
    try { JSON.parse( jsonString ); } catch( e ) { return false; }
    return true;
};

MERCATO.Utils.showToastMessage = function( message, type, duration )
{
    if (typeof(type)==='undefined') type = "INFO";
    if (typeof(duration)==='undefined') duration = 5000;

    var color = "";
    switch( type )
    {
        case "INFO":
            color = "#233ec3";
            break;
        case "ERROR":
            color = "red";
            break;
        case "SUCCESS":
            color = "#00b800";
            break;
    }
    var toastElement = $('<span style="color: '+color+'">'+message+'</span>');
    Materialize.toast(toastElement, duration, "mc-toast");
};