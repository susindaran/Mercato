$(document).ready(function()
{
  $('#formLogin')
    .bind("ajax:success", function(data, status, xhr)
    {
        console.log("Login success!");
        $("#divLoginErrorMessage").html("");
        window.location.reload (true);
    })
    .bind("ajax:error", function(xhr, status, error)
    {
        console.log("Login failure");
        console.log(status);
        $("#divLoginErrorMessage").html("Invalid Username or Password");
    });
});
