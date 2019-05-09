eventListeners();
//Lista de proyectos
var listaProyectos = document.querySelector('ul#proyectos');

function eventListeners(){
    //Boton para crear proyecto
    document.querySelector('.crear-proyecto a').addEventListener('click',nuevoProyecto);
}

function nuevoProyecto(e){
    e.preventDefault();
    //Crear un input para el nombre del nuevo proyecto
    var nuevoProyecto = document.createElement('li');
    nuevoProyecto.innerHTML = "<input type=\"text\" id=\"nuevo-proyecto\">";
    listaProyectos.appendChild(nuevoProyecto);

    //Seleccionar el id con el nuevo proyecto
    var inputNuevoProyecto = document.querySelector('#nuevo-proyecto');

    //Al presionar enter crear el proyecto
    inputNuevoProyecto.addEventListener('keypress', function(e){
        var tecla = e.wish || e.keyCode;
        if(tecla == 13){
            guardarProyectoBD(inputNuevoProyecto.value);
            listaProyectos.removeChild(nuevoProyecto);
        }
    });
}

function guardarProyectoBD(nombreProyecto){
    //Creamos el lamado a ajax
    var xhr = new XMLHttpRequest();

    //Enviar los datos con formdata
    
    var datos = new FormData();
    datos.append('proyecto',nombreProyecto);
    datos.append('accion', 'crear');

    //Abrimos la conexion
    xhr.open('POST','inc/modelos/modelo-proyecto.php', true);

    //En la carga
    xhr.onload = function(){
        if(this.status === 200){
            //Obtenemos la respuesta del servidor
            var respuesta = JSON.parse(xhr.responseText);
            var proyecto = respuesta.nombre_proyecto,
                idProyecto = respuesta.id_proyecto,
                tipo = respuesta.tipo,
                resultado = respuesta.respuesta;
            
                //Comprobamos que se insertó
                if(resultado === 'correcto'){
                    if(tipo === 'crear'){
                        //Se creó un nuevo proyecto
                        //inyectar el nuevo proyecto en el html
                        var nuevoProyecto = document.createElement('li');
                        nuevoProyecto.innerHTML = `
                            <a href="index.php?id_proyecto=${idProyecto}" id="proyecto:${idProyecto}">
                                ${proyecto}
                            </a>
                        `;
                        //Agregar al HTML
                        listaProyectos.appendChild(nuevoProyecto);

                        //Enviar el alert de que se creó
                        Swal({
                            title: 'Proyecto creado',
                            text: 'El proyecto: '+proyecto+' se creó',
                            type: 'success'
                        }).then(resultado =>{
                            //Redireccionar a la nueva pagina del proyecto
                            window.location.href = 'index.php?id_proyecto='+idProyecto;
                        });
                        
                        
                    }
                }else{
                    //Hubo error
                    Swal({
                        title: 'Error!',
                        text: 'Hubo un error',
                        type: 'error'
                    });
                }
        }
    };

    //Enviamos el request
    xhr.send(datos);
}

