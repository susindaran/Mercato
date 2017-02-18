$(document).ready(function()
  {
    $('#formEditProfile').bind("ajax:success", function(data, status, xhr)
    {
      console.log("Update success!");
      $("#divUpdateErrorMessage").html("");
      var $toastContent = $('<span style="color: green">Profile updated successfully</span>');
      Materialize.toast($toastContent, 5000);
    })
    .bind("ajax:error", function(xhr, status, error)
    {
      console.log("Update profile failed");
      var errorMessage = JSON.parse(status['responseText']);
      console.log(status);
      $("#divUpdateErrorMessage").html(errorMessage['error']);
      var $toastContent = $('<span style="color: red">'+errorMessage['error']+'</span>');
      Materialize.toast($toastContent, 5000);
    });
  }
);
