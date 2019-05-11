<?php 
    session_start();
    include("inc/funciones/funciones.php");
    include("inc/layouts/header.php");
    
    if(isset($_GET['cerrar_sesion'])){
        $_SESSION = array();
    }
?>

    <div class="contenedor-formulario">
        <h1>Administrador de proyectos</h1>
        <form id="formulario" class="caja-login" method="post">
            <div class="campo">
                <label for="user">Usuario:</label>
                <input type="text" id="user" name="user" placeholder="Usuario">
            </div>
            <div class="campo">
                <label for="password">Contraseña:</label>
                <input type="password" name="password" id="password" placeholder="Password">
            </div>
            <div class="campo enviar">
                <input type="hidden" id="tipo" value="login">
                <input type="submit" class="boton" value="Iniciar sesión">
            </div>
            <div class="campo">
                <a href="crear-cuenta.php">Crea una cuenta nueva</a>
            </div>
        </form>
    </div>
<?php
    include("inc/layouts/footer.php");
?>