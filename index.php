<?php 
    include("inc/funciones/sesiones.php");
    include("inc/funciones/funciones.php");
    include("inc/layouts/header.php");
    include("inc/layouts/barra.php");
?>
    

    <div class="contenedor">
        <aside class="contenedor-proyectos">
            <div class="panel crear-proyecto">
                <a href="#" class="boton">Nuevo proyecto <i class="fas fa-plus"></i></a>
            </div>
            <div class="panel lista-proyectos">
                <h2>Proyectos</h2>
                <ul id="proyectos">
                    <li>
                        <a href="#">
                            Diseño de la pagina web
                        </a>
                    </li>
                    <li>
                            <a href="#">
                                Carrito de SEMB
                            </a>
                        </li>
                </ul>
            </div>
        </aside>

        <main class="contenido-principal">
            <h1>
                <span>Diseño de la pagina web</span>
            </h1>
            <form action="#" clasS="agregar-tarea">
                <div class="campo">
                    <label for="tarea">Tarea:</label>
                    <input type="text" name="tarea" id="tarea" placeholder="Nombre de la tarea" class="nombre-tarea">
                </div>
                <div class="campo enviar">
                    <input type="hidden" id="id_proyecto" value="id_proyecto">
                    <input type="submit" class="boton nueva-tarea" value="Agregar">
                </div>
            </form>

            <h2>Listado de tareas</h2>

            <div class="tareas-pendientes">
                <ul>
                    <li id="<?php echo $tarea['id'] ?>" class="tarea">
                        <p>Diseño del inicio</p>
                        <div class="acciones">
                                <i class="far fa-check-circle"></i>
                                <i class="fas fa-trash-alt"></i>
                        </div>
                    </li>
                    <li id="<?php echo $tarea['id'] ?>" class="tarea">
                        <p>Diseño del registro</p>
                        <div class="acciones">
                                <i class="far fa-check-circle"></i>
                                <i class="fas fa-trash-alt"></i>
                        </div>
                    </li>
                </ul>
            </div>
        </main>
    </div><!--.contenedor-->
<?php
    include("inc/layouts/footer.php");
?>