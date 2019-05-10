eventListeners();
//Lista de proyectos
var listaProyectos = document.querySelector('ul#proyectos');

function eventListeners(){
    //Boton para crear proyecto
    document.querySelector('.crear-proyecto a').addEventListener('click',nuevoProyecto);

    //Boton para agregar tarea
    document.querySelector('.nueva-tarea').addEventListener('click',agregarTarea);

    //Botones para las cciones de las tareas
    document.querySelector('.tareas-pendientes').addEventListener('click', accionesTareas);
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


//Agregar una nueva tarea al proyecto actual
function agregarTarea(e){
    e.preventDefault();
    var nombreTarea = document.querySelector('.nombre-tarea').value;
    //Validar que el campo tenga algo escrito
    if(nombreTarea ===''){
        Swal({
            title: 'Error',
            text: 'Una tarea no puede ir vacia',
            type: 'error'
        });
    }else{
        //Insertar en php la tarea

        //Crear llamado a ajax
        var xhr = new XMLHttpRequest();

        //Creando el formdata
        var datos = new FormData();
        datos.append('tarea',nombreTarea);
        datos.append('accion','crear');
        datos.append('id_proyecto',document.querySelector('#id_proyecto').value);

        //Abrir la conexion
        xhr.open('POST','inc/modelos/modelo-tarea.php',true);

        //Ejecutarlo y respuesta
        xhr.onload = function(){
            if(this.status == 200){
                //todo correcto
                var respuesta = JSON.parse(xhr.responseText);
                var resultado = respuesta.respuesta,
                    tarea = respuesta.tarea,
                    idInsertado = respuesta.id_tarea,
                    tipo = respuesta.tipo;
                if(resultado === 'correcto'){
                    //Se agregó correctamente
                    if(tipo === 'crear'){
                        Swal({
                            title: 'Tarea creada',
                            text: 'La tarea: '+tarea+' se creó correctamente',
                            type: 'success'
                        });
                        //Construir el template
                        var nuevaTarea = document.createElement('li');

                        //Agregar el id
                        nuevaTarea.id = 'tarea:'+idInsertado;

                        //Agregar la clase de nueva tarea
                        nuevaTarea.classList.add('tarea');

                        //Construir html
                        nuevaTarea.innerHTML=`
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

                    }
                }else{
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
function accionesTareas(e){
    e.preventDefault();

    if(e.target.classList.contains('fa-check-circle')){
        if(e.target.classList.contains('completo')){
            e.target.classList.remove('completo');
            cambiarEstadoTarea(e.target);
        }else{
            e.target.classList.add('completo');
            cambiarEstadoTarea(e.target);
        }
    }else if(e.target.classList.contains('fa-trash-alt')){

    }
}


//Completa o descompleta una tarea
function cambiarEstadoTarea(tarea){
    var idTarea = tarea.parentElement.parentElement.id.split(':');
    console.log(idTarea[1]);
}
