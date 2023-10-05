function modifyButtonAsCounter() {
  var btn = $("#central_btn");
  const original_text = btn.val();
  
  // tiempo duracion código OTP
  // esto debe estar coordinado con servidor..
  var segs = 90;

  var counter = setInterval(() => {
    btn.attr('value', 'Tiempo para reenvío de código: ' + segs);
    segs--;
  }, 1000);
  
}

function showNotification(id) {
  var toastLiveExample = document.getElementById(id);
  var toast = new bootstrap.Toast(toastLiveExample)
  toast.show();
}

function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function chequearEmail() {
    var ingresarBtn = $("#central_btn");
  
    ingresarBtn.click(e => {
      var email = $("#email").val();
      
      if(email == "") {
        showNotification("error_datos");
      } else {
        if(!emailIsValid(email)) {
          showNotification("email_incorrecto");
        } else {
          var server_response = true; // aqui se haria peticion POST al sv para ver si email pertenece a algun user.. 
          // y en ese caso, se enviaria correo mediante alguna API de correos(o quiza propia)
          if(server_response) {
            showNotification("good_email");
            modifyButtonAsCounter();
          } else {
            showNotification("email_incorrecto");
          }
        }
      }

    });
}

function core() {
  console.info('[INFO] forget.js !\n\n');

  chequearEmail();
}

export {core}