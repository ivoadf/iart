var brain = require('brain');
var net;
window.createNetwork = function (hidden_layers){
  net = new brain.NeuralNetwork(hidden_layers);
}
window.trainNetwork = function (node_attr, train_set, options){
  var train_array = [];
  for(i=0;i<train_set.length;i++){
    input_hash = {};
    output_hash = {};
    Object.keys(train_set[i]).forEach(function (key) {
      var value = train_set[i][key];
      if(node_attr[key]=='0'){//input node
        input_hash[key] = value;
      }
      else if(node_attr[key]=='1'){//output node
        output_hash[key] = value;
      }
    })
    var train_hash = {};
    train_hash['input'] = input_hash;
    train_hash['output'] = output_hash;
    train_array.push(train_hash);
  }
  return net.train(train_array,options)
}
