<?php 
    include("inc/funciones/funciones.php");
    include("inc/layouts/header.php");
?>
    <div class="contenedor-formulario">
        <h1>Administrador de proyectos <span>Crear cuenta</span></h1>
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
                <input type="hidden" id="tipo" value="crear">
                <input type="submit" class="boton" value="Crear cuenta">
            </div>
            <div class="campo">
                <a href="login.php">Inicia sesión aquí</a>
            </div>
        </form>
    </div>
<?php
    include("inc/layouts/footer.php");
?>