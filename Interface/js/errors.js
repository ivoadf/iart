function show_error(clicked, error_message) {
  if ($("#error").length == 0) {
    clicked.after('<div id="error" class="container container-table col-md-10 col-md-offset-1" style="display:none"></br><div class="text-center alert alert-danger"><strong>ERROR: </strong>' + error_message + '</div></div>')
    $("#error").slideToggle('fast');
    setTimeout(function() {
      $("#error").slideToggle('fast', function() {
        $("#error").remove();
      });
    }, 2500)
  }
}
