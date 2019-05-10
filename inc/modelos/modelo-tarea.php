<?php
    $accion = $_POST['accion'];
    $idProyecto =(int) $_POST['id_proyecto'];
    $tarea = $_POST['tarea'];
    $idTarea = (int) $_POST['id'];

    if($accion == 'crear'){
        //Importamos la conexion
        include '../funciones/conexion.php';
        //Preparamos la consulta a la base de datos
        try{
            $stmt = $conn->prepare("INSERT INTO tareas (nombre,id_proyecto) VALUES (?,?)");
            $stmt->bind_param('ss', $tarea,$idProyecto);
            $stmt->execute();
            if($stmt->affected_rows >0){
                $respuesta = array(
                    'respuesta' => 'correcto',
                    'id_tarea' => $stmt->insert_id,
                    'tipo' => $accion,
                    'tarea' => $tarea
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
     if($accion === 'actualizar'){
         $estado = (int) $_POST['estado'];
        //Importamos la conexion
        include '../funciones/conexion.php';
        //Preparamos la consulta a la base de datos
        try{
            $stmt = $conn->prepare("UPDATE tareas SET estado = ? WHERE id = ?");
            $stmt->bind_param('ii', $estado,$idTarea);
            $stmt->execute();
            if($stmt->affected_rows >0){
                $respuesta = array(
                    'respuesta' => 'correcto'
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