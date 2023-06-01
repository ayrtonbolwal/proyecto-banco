let btn_retirar = document.getElementById("btn-retirar");
let btn_depositar = document.getElementById("btn-depositar");
let btn_pagar = document.getElementById("btn-pagar");
let btn_ayuda = document.getElementById("btn-ayuda");

let user_name = document.getElementById("userName");
let user_money = document.getElementById("userMoney");

btn_retirar.addEventListener("click", goToRetirar);
btn_depositar.addEventListener("click", gotToDepositar);
btn_pagar.addEventListener("click", goToPagar);
btn_ayuda.addEventListener("click", goToAyuda);

function goToRetirar() {
  window.location.href = "../retirar/retirar.html";
}
function gotToDepositar() {
  window.location.href = "../depositar/depositar.html";
}
function goToPagar() {
  window.location.href = "../pagar/pagar.html";
}
function goToAyuda() {
  window.location.href = "../ayuda/ayuda.html";
}

function userData() {
  var dataLocalStorage = localStorage.getItem("perfiles");
  var dataJSON = JSON.parse(dataLocalStorage);
  
  var arrayUsers = dataJSON;

  for (var i = 0; i < arrayUsers.length; i++) {
    if (arrayUsers[i].status === true) {
      var user_Data = {
        "id" : arrayUsers[i].id,
        "nombre" : arrayUsers[i].nombre,
        "usuario" : arrayUsers[i].usuario,
        "contrasena" : arrayUsers[i].contrasena,
        "saldo" : arrayUsers[i].saldo,
        "numero_tarjeta" : arrayUsers[i].numero_tarjeta,
        "correo" : arrayUsers[i].correo,
        "contactos" : arrayUsers[i].contactos
      }
    }
  }
  return user_Data;
}

let datosUsuario = userData();
console.log(datosUsuario);

user_name.innerHTML = datosUsuario.nombre;
user_money.innerHTML = '$' + datosUsuario.saldo;