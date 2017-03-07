$(document).ready(function()
{
    $('#formAdminLogin')
        .bind("ajax:success", function(data, status, xhr)
        {
            console.log("Login success!");
            $("#divAdminLoginErrorMessage").html("");
            window.location.replace ('/admin/home');
        })
        .bind("ajax:error", function(xhr, status, error)
        {
            console.log("Login failure");
            console.log(status);
            MERCATO.Utils.showToastMessage("Invalid Username or Password", "ERROR");
            $("#divAdminLoginErrorMessage").html("Invalid Username or Password");
        });
});