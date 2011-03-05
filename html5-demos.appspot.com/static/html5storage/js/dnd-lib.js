function DNDFileController(id) {
  var el_ = document.getElementById(id);
  var thumbnails_ = document.getElementById('thumbnails');

  window.URL = window.URL ? window.URL :
               window.webkitURL ? window.webkitURL : window;

  this.dragenter = function(e) {
    e.stopPropagation();
    e.preventDefault();
    el_.classList.add('rounded');
  };

  this.dragover = function(e) {
    e.stopPropagation();
    e.preventDefault();
  };

  this.dragleave = function(e) {
    e.stopPropagation();
    e.preventDefault();
    el_.classList.remove('rounded');
  };

  this.drop = function(e) {
    e.stopPropagation();
    e.preventDefault();

    el_.classList.remove('rounded');

    var files = e.dataTransfer.files;

    for (var i = 0, file; file = files[i]; i++) {
      var imageType = /image.*/;
      if (!file.type.match(imageType)) {
        continue;
      }

      // window.URL.createObjectURL()
      var fileUrl = window.URL.createObjectURL(file);
      thumbnails_.insertAdjacentHTML(
        'afterBegin', '<img src="' + fileUrl + '" width="75" height="75" alt="' + file.name + '" title="' + file.name + '" />');

      /*// FileReader
      var reader = new FileReader();

      reader.onerror = function(evt) {
         alert('Error code: ' + evt.target.error.code);
      };
      reader.onload = (function(aFile) {
        return function(evt) {
          if (evt.target.readyState == FileReader.DONE) {
            thumbnails_.insertAdjacentHTML(
                'afterBegin', '<img src="' + evt.target.result + '" width="75" height="75" alt="' + aFile.name + '" title="' + aFile.name + '" />');
          }
        };
      })(file);

      reader.readAsDataURL(file);*/
    }

    return false;
  };

  
  el_.addEventListener("dragenter", this.dragenter, false);
  el_.addEventListener("dragover", this.dragover, false);
  el_.addEventListener("dragleave", this.dragleave, false);
  el_.addEventListener("drop", this.drop, false);
};
