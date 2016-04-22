function construct_table() {
  var table = $("#node_options tbody");
  Object.keys(node_attr).forEach(function(key, index) {
    var tr, td0, td1, td2, td3;
    td0 = $("<td>" + key + "</td>");
    if (node_attr[key] == 1) {
      tr = $("<tr class='danger'></tr>");
      td1 = $("<td><div class='radio'><label><input type='radio' name='optionsRadios" + index + "' id='optionsRadios" + index + "1' value='0'>Input Node</label></div></td>");
      td2 = $("<td><div class='radio'><label><input type='radio' name='optionsRadios" + index + "' id='optionsRadios" + index + "2' value='1' checked>Output Node</label></div></td>");
      td3 = $("<td><div class='radio'><label><input type='radio' name='optionsRadios" + index + "' id='optionsRadios" + index + "3' value='2' >Disable Node</label></div></td>");
    }
    else if(node_attr[key] == 2){
      tr = $("<tr class='active'></tr>");
      td1 = $("<td><div class='radio'><label><input type='radio' name='optionsRadios" + index + "' id='optionsRadios" + index + "1' value='0'>Input Node</label></div></td>");
      td2 = $("<td><div class='radio'><label><input type='radio' name='optionsRadios" + index + "' id='optionsRadios" + index + "2' value='1'>Output Node</label></div></td>");
      td3 = $("<td><div class='radio'><label><input type='radio' name='optionsRadios" + index + "' id='optionsRadios" + index + "3' value='2' checked>Disable Node</label></div></td>");
    }
    else {
      tr = $("<tr class='info'></tr>");
      td1 = $("<td><div class='radio'><label><input type='radio' name='optionsRadios" + index + "' id='optionsRadios" + index + "1' value='0' checked>Input Node</label></div></td>");
      td2 = $("<td><div class='radio'><label><input type='radio' name='optionsRadios" + index + "' id='optionsRadios" + index + "2' value='1'>Output Node</label></div></td>");
      td3 = $("<td><div class='radio'><label><input type='radio' name='optionsRadios" + index + "' id='optionsRadios" + index + "3' value='2' >Disable Node</label></div></td>");
    }
    tr.append(td0);
    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    table.append(tr);
  })
  var classes = ['info', 'danger', 'active'];

  $("tr td input").change(function() {
    node_attr[$(this).parents("tr").children("td").html()] = this.value;
    for(var i = 0; i < classes.length; i++){
      if($(this).parents("tr").hasClass(classes[i])){
        $(this).parents("tr").toggleClass(classes[i]);
      }
    }
    $(this).parents("tr").toggleClass(classes[this.value]);
  })
  $("#options").slideToggle('fast');
}

var hidden_layers = [];
hidden_layers[0] = 1;

function constructHiddenLayers(){
        $("#hidden_layer_list").html("")
  for(var i = 0; i < hidden_layers.length; i++){
    if(hidden_layers[i] == null){
      hidden_layers[i] = 1;
    }
    var val = hidden_layers[i];
    var div = $("<div class='input-group'></div>");
    var span = $("<span class='input-group-addon'>Node number hidden layer #" + (i + 1) + "</span>");
    var input = $("<input value='" + val + "' type='text' class='form-control hidden-layer' id='hidden_layer_" + i + "'>");
    div.append(span);
    div.append(input);
    $("#hidden_layer_list").append(div);
  }
}

$(document).ready(function() {
  $("#hidden_layers_num").keyup(function() {
    var val = $(this).val()
    if (isNaN(val) || val < 1 || val > 20) {
      show_error($(this).parent(), "Hidden layers number between 1 and 20")
    } else {
      hidden_layers = new Array(parseInt(val))
      constructHiddenLayers();
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
