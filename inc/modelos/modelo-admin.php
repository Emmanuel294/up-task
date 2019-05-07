<?php 
    
    
    $accion = $_POST['accion'];
    $usuario = $_POST['usuario'];
    $password = $_POST['password'];
    if($accion == 'crear'){
        //Codigo para crear administrador

        //Hashear password
        $opciones = array(
            'cost' => 12
        );

        $hashPassword = password_hash($password, PASSWORD_BCRYPT, $opciones);

        //Importar la conexion
        include '../funciones/conexion.php';
        $respuesta = array(
            'pass' => $hashPassword
        );
        echo json_encode($respuesta);
    }
    if($accion == 'login'){
        //Codigo para logguear un administrador

        
    }

?>