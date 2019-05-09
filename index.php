<?php 
    include("inc/funciones/sesiones.php");
    include("inc/funciones/funciones.php");
    include("inc/layouts/header.php");
    include("inc/layouts/barra.php");
    
    //Obtener el id de la url
    if(isset($_GET['id_proyecto'])){
        $idProyecto = $_GET['id_proyecto'];
    }
?>
    

    <div class="contenedor">
        <?php 
            include("inc/layouts/sidebar.php");
        ?>
        <main class="contenido-principal">
        <?php
                    $proyecto = obtenerNombreDelProyecto($idProyecto);
                    if($proyecto):?>
            <h1>Proyecto actual:
                <?php
                    foreach($proyecto as $nombre):?>
                            <span><?php echo $nombre['nombre']; ?></span>
                    <?php
                    endforeach;
                ?>
                
            </h1>
            <form action="#" clasS="agregar-tarea">
                <div class="campo">
                    <label for="tarea">Tarea:</label>
                    <input type="text" name="tarea" id="tarea" placeholder="Nombre de la tarea" class="nombre-tarea">
                </div>
                <div class="campo enviar">
                    <input type="hidden" id="<?php echo $idProyecto ?>" value="id_proyecto">
                    <input type="submit" class="boton nueva-tarea" value="Agregar">
                </div>
            </form>
        <?php  
            else:
                //Si no hay proyectos seleccionados
                echo "<p>Selecciona un proyecto a la izquierda</p>";
            endif;
        ?>
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