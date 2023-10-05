function showNotification(id) {
  var toastLiveExample = document.getElementById(id);
  var toast = new bootstrap.Toast(toastLiveExample)
  toast.show();
}

function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function chequearCredenciales() {
  var ingresarBtn = $("#central_btn");

  ingresarBtn.click(e => {
    var allDataReady = true;

    var data = {
      email: $('#email').val(),
      password: $('#password').val()
    };

    for(var key in data) {
      if(data[key] == "") {
        showNotification("error_datos");
        allDataReady = false;
      }
    }
    
    if(allDataReady) {
       
      if(!emailIsValid(data.email)) {
        console.log(data.email);
        showNotification("email_incorrecto");
      } else {

        var server_response = true; // aqui seria el POST que envia al sv las credenciales para chequearlas

        if(server_response) {
          showNotification("good_datos");
        } else {
          showNotification("credenciales_incorrectas");
        }
      }
    }


  });
}



function core() {
  console.info('[INFO] Login.js !\n\n');

  chequearCredenciales();

}

export {core}