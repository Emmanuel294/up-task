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
            }else{
                $respuesta = array(
                    'respuesta' =>'error'
                );
            }
            $stmt->close();
            $conn->close();
        }catch(Exception $e){
            //En caso de error tomar la exepcion
            $respuesta = array(
                'respuesta' => $e->getMessage()
            );
            
        }
        
    }
    if($accion == 'login'){
        //Codigo para logguear un administrador

        include '../funciones/conexion.php';
        try{
            //Seleccionar el administrador de la base de datos
            $stmt = $conn->prepare("SELECT id,usuario,pass FROM usuario WHERE usuario = ?");
            $stmt->bind_param('s',$usuario);
            $stmt->execute();
            //Loguear el usuario
            $stmt->bind_result($id_usuario,$nombre_usuario,$pass_usuario);
            $stmt->fetch();
            if($nombre_usuario){
                //El usuario existe, verificar el password
                if(password_verify($password,$pass_usuario)){
                    //Login correcto
                    $respuesta = array(
                        'respuesta' => 'correcto',
                        'nombre_usuario' => $nombre_usuario,
                        'tipo' => $accion
                    );
                }else{
                    //login incorrecto, enviar error
                    $respuesta = array(
                        'error' => 'Password incorrecto'
                    );
                }
                
            }else{
                $respuesta = array(
                    'error' => 'Usario no existe'
                );
            }

            $stmt->close();
            $conn->close();
        }catch(Exception $e){
            //En caso de error tomar la exepcion
            $respuesta = array(
                'respuesta' => $e->getMessage()
            );
            
        }
        
    }
    echo json_encode($respuesta);

?>