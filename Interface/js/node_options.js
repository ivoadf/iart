function construct_table() {
  var table = $("#node_options tbody");
  Object.keys(node_attr).forEach(function(key, index) {
    var tr, td0, td1, td2;
    td0 = $("<td>" + key + "</td>");
    if (node_attr[key]) {
      tr = $("<tr class='danger'></tr>");
      td1 = $("<td><div class='radio'><label><input type='radio' name='optionsRadios" + index + "' id='optionsRadios" + index + "1' value='false'>Input Node</label></div></td>");
      td2 = $("<td><div class='radio'><label><input type='radio' name='optionsRadios" + index + "' id='optionsRadios" + index + "2' value='true' checked>Output Node</label></div></td>");
    } else {
      tr = $("<tr class='info'></tr>");
      td1 = $("<td><div class='radio'><label><input type='radio' name='optionsRadios" + index + "' id='optionsRadios" + index + "1' value='false' checked>Input Node</label></div></td>");
      td2 = $("<td><div class='radio'><label><input type='radio' name='optionsRadios" + index + "' id='optionsRadios" + index + "2' value='true'>Output Node</label></div></td>");
    }
    tr.append(td0);
    tr.append(td1);
    tr.append(td2);
    table.append(tr);
  })
  $("tr td input").change(function() {
    node_attr[$(this).parents("tr").children("td").html()] = this.value;
    $(this).parents("tr").toggleClass('info');
    $(this).parents("tr").toggleClass('danger');
  })
  $("#options").slideToggle('fast');
}

var hidden_layers = [1];

$(document).ready(function() {
  $("#hidden_layers_num").keyup(function() {
    var val = $(this).val()
    if (isNaN(val) || val < 1 || val > 20) {
      show_error($(this).parent(), "Hidden layers number between 1 and 20")
    } else {
      $("#hidden_layer_list").html("")
      hidden_layers = [];
      for (var i = 0; i < val; i++) {
        hidden_layers[i] = 1;
        var div = $("<div class='input-group'></div>");
        var span = $("<span class='input-group-addon'>Node number hidden layer #" + (i + 1) + "</span>");
        var input = $("<input value='1' type='text' class='form-control hidden-layer' id='hidden_layer_" + i + "'>");
        div.append(span);
        div.append(input);
        $("#hidden_layer_list").append(div);
      }
      hiddenLayerNodeNum();
  }
  })
})

function hiddenLayerNodeNum(){
  $(".hidden-layer").keyup(function() {
    var val = $(this).val()
    if (isNaN(val) || val < 1 || val > 20) {
      show_error($(this).parent(), "Hidden layer node number between 1 and 20")
    } else {
      hidden_layers[parseInt(this.id.replace("hidden_layer_", ""))] = parseInt(val);
    }
  })
}

hiddenLayerNodeNum();
