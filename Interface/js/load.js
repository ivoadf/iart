function readArray(array, line){
  var split0 = line.split(';');
  for(var i = 0; i < split0.length; i++){
    var split1 = split0[i].split(':');
    if(data_attr[i] == null){
      data_attr[i] = split1[0];
    }
    array[split1[0]] = parseFloat(split1[1]);
  }
}

$(document).ready(function(){
  $("#load").click(function(){
    var lines = $("#add textarea").val().replace(/"/g, "").split('\n');
    iterations = parseInt(lines[0]);
    $("#iterations").val(iterations);
    threshold = parseFloat(lines[1]);
    $("#threshold").val(threshold);
    momentum = parseFloat(lines[2]);
    $("#momentum").val(momentum);
    learning_rate = parseFloat(lines[3]);
    $("#learning_rate").val(learning_rate);

    var layers = lines[4].split(',');
    for(var i = 0; i < layers.length; i++){
      hidden_layers[i] = parseInt(layers[i]);
    }

    readArray(node_attr, lines[5])

    var train = lines[6].split("|");
    for(var i = 0; i < train.length; i++){
      train_set[i] = [];
      readArray(train_set[i], train[i]);
    }

    var test = lines[7].split("|");
    for(var i = 0; i < test.length; i++){
      test_set[i] = [];
      readArray(test_set[i], test[i])
    }
    $("#add").slideToggle('fast')
    construct_table();
    $("#hidden_layers_num").val(hidden_layers.length);
    constructHiddenLayers();
  })
})
