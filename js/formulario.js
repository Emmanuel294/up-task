
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
        xhr.open('POST', 'inc/modelos/modelo-admin.php', true);

        //Retorno de datos

        xhr.onload = function(){
            if(this.status === 200){
                var respuesta = JSON.parse(xhr.responseText);

                //Si la respuesta es correcta
                if(respuesta.respuesta === 'correcto'){
                    //Si es un nuevo usuario
                    if(respuesta.tipo === 'crear'){
                        Swal({
                            title: 'Usuario creado',
                            text: 'El usuario se creó correctamente',
                            type: 'success'
                        });
                    }
                }else{
                    //Hubo un error
                    Swal({
                        title: 'Error',
                        text: 'Hubo un error!',
                        type: 'error'
                    });
                }
            }
        };

        //Enviar la peticion

        xhr.send(datos);

    }
}