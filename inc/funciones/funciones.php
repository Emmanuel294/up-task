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
function obtenerProyectos($user)
{
    include 'conexion.php';
    try {
        $proyectos = $conn->query('SELECT id, nombre FROM proyectos WHERE id_usuario ='. (int)$user);
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

//Obtener las clases del proyecto
function obtenerTareasProyecto($id = null){
    include 'conexion.php';
    try {
        $proyectos = $conn->query("SELECT id, nombre, estado FROM tareas WHERE id_proyecto = {$id} ");
        return $proyectos;
    } catch (Exception $e) {
        echo "Error! : " . $e->getMessage();
        return false;
    }
}
