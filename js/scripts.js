eventListeners();
//Lista de proyectos
var listaProyectos = document.querySelector('ul#proyectos');

function eventListeners() {
    //Document ready
    document.addEventListener('DOMContentLoaded',function(){
        actualizarProgreso();
    })

    //Boton para crear proyecto
    document.querySelector('.crear-proyecto a').addEventListener('click', nuevoProyecto);

    //Boton para agregar tarea
    document.querySelector('.nueva-tarea').addEventListener('click', agregarTarea);

    //Botones para las cciones de las tareas
    document.querySelector('.tareas-pendientes').addEventListener('click', accionesTareas);
}

function nuevoProyecto(e) {
    e.preventDefault();
    //Crear un input para el nombre del nuevo proyecto
    var nuevoProyecto = document.createElement('li');
    nuevoProyecto.innerHTML = "<input type=\"text\" id=\"nuevo-proyecto\">";
    listaProyectos.appendChild(nuevoProyecto);

    //Seleccionar el id con el nuevo proyecto
    var inputNuevoProyecto = document.querySelector('#nuevo-proyecto');

    //Al presionar enter crear el proyecto
    inputNuevoProyecto.addEventListener('keypress', function (e) {
        var tecla = e.wish || e.keyCode;
        if (tecla == 13) {
            guardarProyectoBD(inputNuevoProyecto.value);
            listaProyectos.removeChild(nuevoProyecto);
        }
    });
}

function guardarProyectoBD(nombreProyecto) {
    //Creamos el lamado a ajax
    var xhr = new XMLHttpRequest();

    //Enviar los datos con formdata

    var datos = new FormData();
    datos.append('proyecto', nombreProyecto);
    datos.append('accion', 'crear');

    //Abrimos la conexion
    xhr.open('POST', 'inc/modelos/modelo-proyecto.php', true);

    //En la carga
    xhr.onload = function () {
        if (this.status === 200) {
            //Obtenemos la respuesta del servidor
            var respuesta = JSON.parse(xhr.responseText);
            var proyecto = respuesta.nombre_proyecto,
                idProyecto = respuesta.id_proyecto,
                tipo = respuesta.tipo,
                resultado = respuesta.respuesta;

            //Comprobamos que se insertó
            if (resultado === 'correcto') {
                if (tipo === 'crear') {
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
                        text: 'El proyecto: ' + proyecto + ' se creó',
                        type: 'success'
                    }).then(resultado => {
                        //Redireccionar a la nueva pagina del proyecto
                        window.location.href = 'index.php?id_proyecto=' + idProyecto;
                    });


                }
            } else {
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


//Agregar una nueva tarea al proyecto actual
function agregarTarea(e) {
    e.preventDefault();
    var nombreTarea = document.querySelector('.nombre-tarea').value;
    //Validar que el campo tenga algo escrito
    if (nombreTarea === '') {
        Swal({
            title: 'Error',
            text: 'Una tarea no puede ir vacia',
            type: 'error'
        });
    } else {
        //Insertar en php la tarea

        //Crear llamado a ajax
        var xhr = new XMLHttpRequest();

        //Creando el formdata
        var datos = new FormData();
        datos.append('tarea', nombreTarea);
        datos.append('accion', 'crear');
        datos.append('id_proyecto', document.querySelector('#id_proyecto').value);

        //Abrir la conexion
        xhr.open('POST', 'inc/modelos/modelo-tarea.php', true);

        //Ejecutarlo y respuesta
        xhr.onload = function () {
            if (this.status == 200) {
                //todo correcto
                var respuesta = JSON.parse(xhr.responseText);
                var resultado = respuesta.respuesta,
                    tarea = respuesta.tarea,
                    idInsertado = respuesta.id_tarea,
                    tipo = respuesta.tipo;
                if (resultado === 'correcto') {
                    //Se agregó correctamente
                    if (tipo === 'crear') {
                        Swal({
                            title: 'Tarea creada',
                            text: 'La tarea: ' + tarea + ' se creó correctamente',
                            type: 'success'
                        });
                        //Seleccionar el parrafo con lista-vacia
                        var parrafoLv = document.querySelectorAll('.lista-vacia');
                        if(parrafoLv.length > 0){
                            document.querySelector('.lista-vacia').remove();
                        }

                        //Construir el template
                        var nuevaTarea = document.createElement('li');

                        //Agregar el id
                        nuevaTarea.id = 'tarea:' + idInsertado;

                        //Agregar la clase de nueva tarea
                        nuevaTarea.classList.add('tarea');

                        //Construir html
                        nuevaTarea.innerHTML = `
                            <p>${tarea}</p>
                            <div class="acciones">
                                <i class="far fa-check-circle"></i>
                                <i class="fas fa-trash-alt"></i>
                            </div>
                        `;
                        //Agregarlo al HTML
                        var listado = document.querySelector('.tareas-pendientes ul');
                        listado.appendChild(nuevaTarea);

                        document.querySelector('.agregar-tarea').reset;

                        //Actualizar progreso de la barra
                        actualizarProgreso();
                    }
                } else {
                    //Error
                    Swal({
                        title: 'Error',
                        text: 'Hubo un error!',
                        type: 'error'
                    });
                }
            }
        }

        //Consulta
        xhr.send(datos);
    }
}

//Cambia el estado de las tareas o las elimina
function accionesTareas(e) {
    e.preventDefault();

    if (e.target.classList.contains('fa-check-circle')) {
        if (e.target.classList.contains('completo')) {
            e.target.classList.remove('completo');
            cambiarEstadoTarea(e.target, 0);
        } else {
            e.target.classList.add('completo');
            cambiarEstadoTarea(e.target, 1);
        }
    } else if (e.target.classList.contains('fa-trash-alt')) {
        Swal.fire({
            title: 'Seguro(a)?',
            text: "Esta acción no se puede deshacer",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                var tareaEliminar = e.target.parentElement.parentElement;

                //Borrar de la BD
                eliminarTareaBD(tareaEliminar);
                //Borrar del HTML
                tareaEliminar.remove();
                Swal.fire(
                    'Eliminado!',
                    'La tarea fue eliminada.',
                    'success'
                )
            }
        })
    }
}


//Completa o descompleta una tarea
function cambiarEstadoTarea(tarea, estado) {
    var idTarea = tarea.parentElement.parentElement.id.split(':');

    //Crear llamado ajax
    var xhr = new XMLHttpRequest();

    //Informacion
    var datos = new FormData();
    datos.append('id', idTarea[1]);
    datos.append('accion', 'actualizar');
    datos.append('estado', estado);

    //Abrir la conexion
    xhr.open('POST', 'inc/modelos/modelo-tarea.php');

    //Al cargar
    xhr.onload = function () {
        if (this.status === 200) {
            //console.log(JSON.parse(xhr.responseText));
            //Actualizar progreso de la barra
            actualizarProgreso();
        }
    };

    //Mandar los datos
    xhr.send(datos);

}


//Eliminar la tarea de la base de datos
function eliminarTareaBD(tarea){
    var idTarea = tarea.id.split(':');

    //Crear llamado ajax
    var xhr = new XMLHttpRequest();

    //Informacion
    var datos = new FormData();
    datos.append('id', idTarea[1]);
    datos.append('accion', 'eliminar');

    //Abrir la conexion
    xhr.open('POST', 'inc/modelos/modelo-tarea.php');

    //Al cargar
    xhr.onload = function () {
        if (this.status === 200) {
            var resultado = JSON.parse(xhr.responseText);
            var respuesta = resultado.respuesta;
            if(respuesta === 'error'){
                Swal({
                    title: 'Error',
                    text: 'Hubo un error al borrar la tarea',
                    type: 'error'
                });
            }
            //Comprobar que haya tareas restantes
            var listaTareas = document.querySelectorAll('li.tarea');
            if(listaTareas.length == 0){
                document.querySelector('.tareas-pendientes ul').innerHTML = '<p class="lista-vacia">No hay tareas en este proyecto</p>';
            }
            //Actualizar progreso
            actualizarProgreso();
        }
    };

    //Mandar los datos
    xhr.send(datos);
}

//Actualiza el avance del proyecto
function actualizarProgreso(){
    //Obtener todas las tareas
    const tareas = document.querySelectorAll('.tarea');
    
    //Obtener las tareas completadas
    const tareasCompletadas = document.querySelectorAll('i.completo');

    //Determinar el avance
    const avance = Math.round((tareasCompletadas.length/tareas.length)*100);
    
    //Asignar el avance a la barra
    const porcentaje = document.querySelector('#porcentaje');
    porcentaje.style.width = avance+'%';

    //Mostrar alerta al coompletar el 100%
    if(avance == 100){
        Swal({
            title: 'Proyecto terminado',
            text: 'Ya no tienes tareas pendientes!',
            type: 'success'
        });
    }
}