
eventListeners();

function eventListeners(){
    document.querySelector('#formulario').addEventListener('submit', validarRegistro);
}

function validarRegistro(e){
    e.preventDefault();
    
    var usuario = document.querySelector('#user').value,
        password = document.querySelector('#password').value,
        tipo = document.querySelector('#tipo').value;

    if(usuario === '' || password ===''){
        //La validación falló
        Swal.fire({
            type: 'error',
            title: 'Error!!',
            text: 'Ambos campos son obligatorios!'
          })
    }else{
        //Ambos campos son correctos, mandar ejecutar Ajax

        //Datos que se envian al servidor
        var datos = new FormData();
        datos.append('usuario',usuario);
        datos.append('password',password);
        datos.append('accion',tipo);
        
        //Crear el llamado a ajax

        var xhr = new XMLHttpRequest();

        //Abrir la conexion
        xhr.open('POST', 'inc/modelos/modelo-admin.php');
    }
}