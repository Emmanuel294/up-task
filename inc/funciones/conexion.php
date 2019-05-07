<?php 
    $conn = new mysqli('localhost','root','12345Jajaje','administradorTareas');
    if($conn->connect_error){
        echo $conn->connect_error;
    }
    $conn->set_charset('utf8');
?>