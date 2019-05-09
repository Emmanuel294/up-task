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
    //Injectar el HTML
    var nuevoProyecto = document.createElement('li');
    nuevoProyecto.innerHTML = `
        <a href="#">
            ${nombreProyecto}
        </a>
    `;
    listaProyectos.appendChild(nuevoProyecto);
}