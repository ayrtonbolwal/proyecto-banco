let btn_retirar = document.getElementById('btn-retirar');
let btn_regresar = document.getElementById('btn-regresar')
let input_retirar = document.getElementById('input-cantidad');
let user_name = document.getElementById('userName');
let user_money = document.getElementById('userSaldo');
let mensajeNuevoSaldo = document.getElementById('messageNewSaldo');
let saldo, nuevoSaldo;

function userData() {
    var dataLocalStorage = localStorage.getItem("perfiles");
    var dataJSON = JSON.parse(dataLocalStorage);
    var arrayUsers = dataJSON;

    for (var i = 0; i < arrayUsers.length; i++) {
        if (arrayUsers[i].status === true) {
            var user_Data = {
                "id": arrayUsers[i].id,
                "nombre": arrayUsers[i].nombre,
                "usuario": arrayUsers[i].usuario,
                "contrasena": arrayUsers[i].contrasena,
                "saldo": arrayUsers[i].saldo,
                "numero_tarjeta": arrayUsers[i].numero_tarjeta,
                "correo": arrayUsers[i].correo,
                "contactos": arrayUsers[i].contactos
            }
        }
    }
    return user_Data;
}

function changeData(nuevo_saldo) {
    var dataLocalStorage = localStorage.getItem('perfiles');
    var arrayUsers = JSON.parse(dataLocalStorage);

    for (var i = 0; i < arrayUsers.length; i++) {
        if (arrayUsers[i].status === true) {
            arrayUsers[i].saldo = nuevo_saldo;
        }
    }

    mensajeNuevoSaldo.innerHTML = "Tu nuevo saldo es: $" + nuevo_saldo;
    updateUsersData = JSON.stringify(arrayUsers);
    localStorage.setItem('perfiles', updateUsersData);

}

function retirar() {
    input_retirar = document.getElementById('input-cantidad').value;
    var saldo_actual = user_Data.saldo;
    if (input_retirar === '') {
        mensajeNuevoSaldo.innerHTML = 'Hay campos vacíos';
    } else {
        if ((input_retirar > 20000)) {
            mensajeNuevoSaldo.innerHTML = 'No puedes retirar más de $20000...'
        } else {
            if (input_retirar > saldo_actual) {
                mensajeNuevoSaldo.innerHTML = 'No tienes la cantidad suficiente en saldo...'
            } else {
                cantidad_retirar = input_retirar;
                nuevo_saldo = saldo_actual - cantidad_retirar;
                changeData(nuevo_saldo);
                btn_regresar.style.display = 'flex';
            }
        }
    }
}

function regresar(){
    window.location.href = '../index/index.html';
}


let user_Data = userData();
user_name.innerHTML = user_Data.nombre;
saldo = user_Data.saldo;
user_money.innerHTML = saldo;

btn_retirar.addEventListener('click', retirar);
btn_regresar.addEventListener('click', regresar);