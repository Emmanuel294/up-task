eventListeners();

function eventListeners(){
    //Boton para crear proyecto
    document.querySelector('.crear-proyecto a').addEventListener('click',nuevoProyecto);
}

function nuevoProyecto(e){
    e.preventDefault();
    console.log('Presionaste nuevo proyecto');
}