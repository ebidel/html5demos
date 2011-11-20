
function FormPersistenceSetup(formname) {
  formName = formname;

  var elems = document.querySelectorAll("textarea, input");
  var len = elems.length;
  for (var i = 0; i < len; i++) {
    var elem = elems[i];
    elem.addEventListener("input", function(item) {
      localStorage[formName + "-" + item.srcElement.id] = item.srcElement.value;
      var debug = document.getElementById("data-persistence-debug");
      debug.innerHTML = "Last auto-saved <code>"+ item.srcElement.id +"</code> at: " + new Date();
    }, false);
  } 
}

function FormPersistenceRestore(formname) {
  var len = localStorage.length;
  for (var i = 0; i < len; i++) {
    var key = localStorage.key(i);
    if (key.indexOf(formname + "-") == 0) {
      var id = key.substr(formname.length+1);
      var value = localStorage[key];
      var elem = document.getElementById(id);
      elem.value = value;
    }
  }
}

function FormPersistenceClear(formname) {
  var len = localStorage.length;
  console.log(len);
  for (var i = 0; i < len; i++) {
    var key = localStorage.key(i);
    if (key.indexOf(formname + "-") == 0) {
      i--;
      len--;
      localStorage.removeItem(key);
    }
  }
}

function FormPersistenceCanRestore(formname) {
  var dataAvailable = false;
  var len = localStorage.length;
  for (var i = 0; i < len; i++) {
    var key = localStorage.key(i);
    if (key.indexOf(formname + "-") == 0) {
      dataAvailable = true;
    }
  }
  return dataAvailable;
}



