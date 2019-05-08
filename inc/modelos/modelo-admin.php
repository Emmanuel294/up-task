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
        $respuesta = array(
            'respuesta' => "Aun no"
        );
        //Importar la conexion
        include '../funciones/conexion.php';
        
        try{
            //Realizar la consulta a la base de datos
            $stmt = $conn->prepare("INSERT INTO usuario (usuario,pass) VALUES (?,?)");
            $stmt->bind_param('ss',$usuario,$hashPassword);
            $stmt->execute();
            if($stmt->affected_rows == 1){
                $respuesta = array(
                    'respuesta' => 'correcto',
                    'id_insertado' => $stmt->insert_id,
                    'tipo' => $accion
                );
            }
            $stmt->close();
            $conn->close();
        }catch(Exception $e){
            //En caso de error tomar la exepcion
            $respuesta = array(
                'pass' => $e->getMessage()
            );
            
        }
        echo json_encode($respuesta);
    }
    if($accion == 'login'){
        //Codigo para logguear un administrador

        
    }

?>