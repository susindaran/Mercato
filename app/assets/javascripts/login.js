$(document).ready(function()
{
  $('#formLogin')
    .bind("ajax:success", function(data, status, xhr)
    {
        console.log("Login success!");
        $("#divLoginErrorMessage").html("");
        window.location.replace('/');
    })
    .bind("ajax:error", function(xhr, status, error)
    {
        console.log("Login failure");
        console.log(status);
        $("#divLoginErrorMessage").html("Invalid Username or Password");
    });

    $('#formEditProfile').bind("ajax:success", function(data, status, xhr)
    {
      console.log("Update success!");
      $("#divUpdateErrorMessage").html("");
      var $toastContent = $('<span style="color: green">Profile updated successfully</span>');
      Materialize.toast($toastContent, 5000);
    })
    .bind("ajax:error", function(xhr, status, error)
    {
      console.log("Update failure");
      console.log(status);
      $("#divUpdateErrorMessage".html("Update failed! Try again later."));
      var $toastContent = $('<span style="color: red">Profile update failed. Please try again later</span>');
      Materialize.toast($toastContent, 5000);
    });
});
