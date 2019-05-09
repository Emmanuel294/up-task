<?php
//Obtiene la pagina actual cuando se ejecuta
function obtenerPaginaActual()
{
    $archivo = basename($_SERVER['PHP_SELF']);
    $pagina = str_replace(".php", "", $archivo);
    return $pagina;
}

/*Consultas */
/**Obtener todos los proyectos */
function obtenerProyectos()
{
    include 'conexion.php';
    try {
        $proyectos = $conn->query('SELECT id, nombre FROM proyectos');
        return $proyectos;
    } catch (Exception $e) {
        echo "Error! : " . $e->getMessage();
        return false;
    }
}

/**Obtener el nombre del proyecto */

function obtenerNombreDelProyecto($id = null){
    include 'conexion.php';
    try {
        $proyectos = $conn->query("SELECT id, nombre FROM proyectos WHERE id = {$id} ");
        return $proyectos;
    } catch (Exception $e) {
        echo "Error! : " . $e->getMessage();
        return false;
    }
}
