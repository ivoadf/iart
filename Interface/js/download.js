//http://stackoverflow.com/a/18197511
function download() {
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(createDataFile()));
  pom.setAttribute('download', 'network.txt');

  if (document.createEvent) {
    var event = document.createEvent('MouseEvents');
    event.initEvent('click', true, true);
    pom.dispatchEvent(event);
  } else {
    pom.click();
  }
}

function writeSet(set) {
  var ret = "";
  for (var j = 0; j < set.length; j++) {
    for (var i = 0; i < data_attr.length; i++) {
      ret += data_attr[i] + ":" + set[j][data_attr[i]];
      if (i < data_attr.length - 1)
        ret += ";"
    }
    if (j < set.length - 1)
      ret += "|"
  }
  return ret;
}

function createDataFile() {
  var file = "";
  file += "iterations\n";
  file += iterations;
  file += "\nthreshold\n";
  file += threshold;
  file += "\nmomentum\n";
  file += momentum;
  file += "\nlearning_rate\n";
  file += learning_rate;
  file += "\nhidden_layers\n";
  file += hidden_layers;
  file += "\nnode_attr\n";
  for (var i = 0; i < data_attr.length; i++) {
    file += data_attr[i] + ":" + node_attr[data_attr[i]];
    if (i < data_attr.length - 1)
      file += ";"
  }
  file += "\ntrain_set\n";
  file += writeSet(train_set);
  file += "\ntest_set\n";
  file += writeSet(test_set);
  return file;
}
