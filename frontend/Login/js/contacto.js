function showNotification(id) {
  var toastLiveExample = document.getElementById(id);
  var toast = new bootstrap.Toast(toastLiveExample)
  toast.show();
}

function chequearDatos() {
  var ingresarBtn = $("#central_btn");

  ingresarBtn.click(e => {
    var data = {
      nombre: $("#nombre").val(),
      msg: $("#contact_msg").val()
    },
     allDataReady = true;
    
    for(var key in data) {
      if(data[key] == "") {
        showNotification("error_datos");
        allDataReady = false;
      } 
    }

    if(allDataReady) {
        showNotification("enviado");
    }

  });
}

function core() {
  console.info('[INFO] contacto.js !\n\n');

  chequearDatos();
}

export {core}