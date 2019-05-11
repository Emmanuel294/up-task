<?php
    $accion = $_POST['accion'];
    $proyecto = $_POST['proyecto'];
    $user = (int) $_POST['usuario'];

    if($accion == 'crear'){
        //Importamos la conexion
        include '../funciones/conexion.php';
        //Preparamos la consulta a la base de datos
        try{
            $stmt = $conn->prepare("INSERT INTO proyectos (nombre,id_usuario) VALUES (?,?)");
            $stmt->bind_param('si', $proyecto,$user);
            $stmt->execute();
            if($stmt->affected_rows >0){
                $respuesta = array(
                    'respuesta' => 'correcto',
                    'id_proyecto' => $stmt->insert_id,
                    'tipo' => $accion,
                    'nombre_proyecto' => $proyecto,
                    'id_user' => $user
                    
                );
            }else{
                $respuesta = array(
                    'respuesta' => 'error'
                );
            }
            $stmt->close();
            $conn->close();
        }catch(Exception $e){
            $respuesta = array(
                'error' => $e->getMessage()
            );
        }
        echo json_encode($respuesta);
    }
    
?>