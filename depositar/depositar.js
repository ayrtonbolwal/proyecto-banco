let cantidad_deposito = document.getElementById('cantidadDeposito');
let btn_depositar = document.getElementById('btn-depositar');
let messageError = document.getElementById('messageUser-error');
let form_contactos = document.getElementById('form-contactos');
let btn_salir = document.getElementById('btn-salir');
let messageUser_1 = document.getElementById('messageUser-1');

function userData() {
    var dataLocalStorage = localStorage.getItem("perfiles");
    var arrayUsers = JSON.parse(dataLocalStorage);

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

function obtenerDestinatario() {
    var radios = document.getElementsByName('options');
    var contactoDestino;
    var seleccionado = false;

    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            seleccionado = true;
            break;
        }
    }
    if (seleccionado == true) {
        for (i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                contactoDestino = radios[i].value;
                break;
            }
        }
    } else {
        messageError.innerHTML = 'ERROR: No ha seleccionado ningún contacto...';
    }

    return contactoDestino;
}

function changeData(nuevo_saldo) {
    var dataLocalStorage = localStorage.getItem('perfiles');
    var arrayUsers = JSON.parse(dataLocalStorage);

    for (var i = 0; i < arrayUsers.length; i++) {
        if (arrayUsers[i].status === true) {
            arrayUsers[i].saldo = nuevo_saldo;
        }
    }

    updateUsersData = JSON.stringify(arrayUsers);
    localStorage.setItem('perfiles', updateUsersData);
}

function depositar(){
    var input_depositar = document.getElementById('cantidadDeposito').value;
    var nuevo_saldo;

    contactoDestino = obtenerDestinatario();

    var saldo_actual = user_Data.saldo;
    nuevo_saldo = saldo_actual - input_depositar;

    messageError.innerHTML = 'Has enviado la cantidad de $' + input_depositar + ' a ' + contactoDestino + ', tu saldo actual es de: $' + nuevo_saldo;
    changeData(nuevo_saldo);
}

function desplegarContactos(user_Data){
    for ( i = 0; i < user_Data.contactos.length; i++){
        contacto = user_Data.contactos[i]

        var nuevoInput = document.createElement('input');
        var nuevoLabel = document.createElement('label');

        var contenidoLabel = `<span class="nombre-contacto"> ${contacto.nombre} ${contacto.apellido}</span><span class="numero-tarjeta">${contacto.numero_tarjeta}</span>`;
        
        nuevoLabel.setAttribute('for', `option${contacto.id}`);
        nuevoInput.setAttribute('type','radio');
        nuevoInput.setAttribute('id',`option${contacto.id}`);
        nuevoInput.setAttribute('name', 'options');
        nuevoInput.setAttribute('value', `${contacto.nombre}`);
        nuevoLabel.innerHTML=contenidoLabel;

        form_contactos.appendChild(nuevoInput);
        form_contactos.appendChild(nuevoLabel);
    }
}

function salir(){
    window.location.href = '../index/index.html';
}

let user_Data = userData();
messageUser_1.innerHTML = `Hola ${user_Data.nombre} tu saldo actual es de $${user_Data.saldo}`;
desplegarContactos(user_Data);
btn_depositar.addEventListener('click', depositar);
btn_salir.addEventListener('click', salir)