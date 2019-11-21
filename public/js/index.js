let files;

document.querySelector("input[type=file]").onchange = function(event) {
  files = event.target.files;
  for (var i = 0; i < files.length; i++) {
    let f = files[i];

    if (!f.type.match('video.*')) {
      continue;
    }

    var source = document.createElement('video'); //added now
    source.width = 180;
    source.height = 140;
    source.controls = true;
    source.src = URL.createObjectURL(files[i]);
    source.setAttribute("style", "margin-right: 10px; margin-top: 10px; border: #607D8B 1px;");
    document.getElementById("videoContainer").appendChild(source); // append `<video>` element

  }
}

let getSelectedFiles = function() {
  if(typeof(files) === 'undefined'){
    return 'No file is selected.';
  }else{
    return files;
  }
}