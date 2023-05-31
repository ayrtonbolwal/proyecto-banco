let updateUsersData;
let alertUser = document.getElementById('alertUser');
let btnLogin = document.getElementById('btnLogin');

fetch('perfiles.json')
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('perfiles', JSON.stringify(data));
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });


function signIn() {
    let emailUser = document.getElementById('emailUser').value;
    let passwordUser = document.getElementById('passwordUser').value;
    var dataLocalStorage = localStorage.getItem('perfiles');
    var dataJSON = JSON.parse(dataLocalStorage);
    var arrayUsers = dataJSON.perfiles;

    for (var i = 0; i < arrayUsers.length; i++) {
        if ((emailUser.trim() === '') || (passwordUser.trim() === '')) {
            alertUser.innerHTML = 'Hay campos vacíos...';
        } else {
            if (arrayUsers[i].correo === emailUser) {
                if (arrayUsers[i].contrasena === passwordUser) {
                    arrayUsers[i].status = true;
                    updateUsersData = JSON.stringify(arrayUsers);
                    localStorage.setItem('perfiles', updateUsersData);
                    window.location.href = '../index/index.html';
                } else {
                    alertUser.innerHTML = 'La contraseña ingresada es incorrecta...';
                }
            } else {
                alertUser.innerHTML = 'El correo ingresado es incorrecto...'
            }
        }
    }
}

btnLogin.addEventListener('click', signIn);