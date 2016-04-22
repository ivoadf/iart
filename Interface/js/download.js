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
    if (j < set.length - 1){
      ret += "|"
    }
    else{
       ret += "\n";
    }
  }
  return ret;
}

function createDataFile() {
  var file = "";
  file += iterations + "\n";
  file += threshold + "\n";
  file += momentum + "\n";
  file += learning_rate + "\n";
  file += hidden_layers + "\n";
  for (var i = 0; i < data_attr.length; i++) {
    file += data_attr[i] + ":" + node_attr[data_attr[i]];
    if (i < data_attr.length - 1){
      file += ";"
    }
      else{
         file += "\n";
      }
  }
  file += writeSet(train_set);
  file += writeSet(test_set);
  return file;
}
