<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Administrador de tareas</title>
    <link rel="stylesheet" href="css/main.css">
</head>
<body class="login">
    <div class="contenedor-formulario">
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
                <input type="submit" class="boton" value="Iniciar sesion">
            </div>
            <div class="campo">
                <a href="crear-cuenta.php">Inicia sesion o crea una cuenta nueva</a>
            </div>
        </form>
    </div>
</body>
</html>