function DNDFileController(id, thumbsId) {
  var el_ = document.getElementById(id);
  var thumbnails_ = document.getElementById(thumbsId);

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

      var reader = new FileReader();

      reader.onerror = function(evt) {
         var msg = 'Error ' + evt.target.error.code;
         switch (evt.target.error.code) {
           case FileError.NOT_READABLE_ERR:
             msg += ': NOT_READABLE_ERR';
             break;
         };
         alert(msg);
      };

      reader.onload = (function(aFile) {
        return function(evt) {
          if (evt.target.readyState == FileReader.DONE) {
            thumbnails_.insertAdjacentHTML(
                'afterBegin', '<img src="' + evt.target.result + '" alt="' +
                aFile.name + '" title="' + aFile.name + '" />');
          }
        };
      })(file);

      reader.readAsDataURL(file);
    }

    return false;
  };

  el_.addEventListener("dragenter", this.dragenter, false);
  el_.addEventListener("dragover", this.dragover, false);
  el_.addEventListener("dragleave", this.dragleave, false);
  el_.addEventListener("drop", this.drop, false);
};