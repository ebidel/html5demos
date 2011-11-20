var fileSystem;

function initFileSystem(size, callback) {
	if (size == undefined)
		size = 5;
	window.webkitRequestFileSystem(TEMPORARY, size*1024*1024, function(fs) {
		console.log("FileSystem Ready", fs);
		fileSystem = fs;
		if (callback != undefined) {
		  callback(fs);
		}
	}, onFSError);
}

function saveURLToDisk(obj, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', obj.url, true);
	
	xhr.responseType = 'arraybuffer';
	
	xhr.onload = function(e) {
		var data = xhr.responseType == 'arraybuffer' ? xhr.response : xhr.responseText;
		saveFile(data, obj.filename, obj.type, callback);
	};
	xhr.send(); 
}

function saveFile(arrayBuffer, fileName, type, callback) {
	
	fileSystem.root.getFile(fileName, {create: true}, function(fileEntry) {
	
		fileEntry.createWriter(function(fileWriter) {
			
			fileWriter.onwriteend = function(e) {
				console.log("Write Success: " + fileName);
			};
			
			fileWriter.onerror = function(e) {
				console.log("Write failed: " + e.toString());
			};
			
			var bb = new WebKitBlobBuilder();
			bb.append(arrayBuffer);
			fileWriter.write(bb.getBlob(type));
			
		}, onFSError);	
		console.log(fileEntry.toURL());
		if (callback != undefined) {
		  callback(fileEntry);
		}
	
	}, onFSError);
}

function onFSError(e) {
	var msg = '';
	console.log(e);
	switch (e.code) {
		case FileError.QUOTA_EXCEEDED_ERR:
			msg = 'QUOTA_EXCEEDED_ERR';
			break;
		case FileError.NOT_FOUND_ERR:
			msg = 'NOT_FOUND_ERR';
			break;
		case FileError.SECURITY_ERR:
			msg = 'SECURITY_ERR';
			break;
		case FileError.INVALID_MODIFICATION_ERR:
			msg = 'INVALID_MODIFICATION_ERR';
			break;
		case FileError.INVALID_STATE_ERR:
			msg = 'INVALID_STATE_ERR';
			break;
		default:
			msg = 'Unknown Error';
			break;
	};
	
	console.log('Error: ' + msg);
}