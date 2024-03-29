<?php 
    include("inc/funciones/sesiones.php");
    include("inc/funciones/funciones.php");
    include("inc/layouts/header.php");
    include("inc/layouts/barra.php");
    
    //Obtener el id de la url
    if(isset($_GET['id_proyecto'])){
        $idProyecto = $_GET['id_proyecto'];
    }
    if(isset($_GET['id_user'])){
        $user = (int)$_GET['id_user'];
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
            <form action="#" class="agregar-tarea">
                <div class="campo">
                    <label for="tarea">Tarea:</label>
                    <input type="text" name="tarea" id="tarea" placeholder="Nombre de la tarea" class="nombre-tarea">
                </div>
                <div class="campo enviar">
                    <input type="hidden" value="<?php echo $idProyecto ?>" id="id_proyecto">
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
                    <?php 
                        //Obtener las tareas del proyecto actual
                        $tareas = obtenerTareasProyecto($idProyecto);
                        if($tareas->num_rows >0){
                            //Si hay tareas
                            foreach($tareas as $tarea): ?>
                                <li id="tarea:<?php echo $tarea['id'] ?>" class="tarea">
                                    <p><?php echo $tarea['nombre'] ?></p>
                                    <div class="acciones">
                                        <i class="far fa-check-circle <?php echo ($tarea['estado'] == '1' ? 'completo' : '');?>"></i>
                                        <i class="fas fa-trash-alt"></i>
                                    </div>
                                </li>

                         <?php   endforeach;
                        }
                        else{
                            //No hay tareas
                            
                            echo "<p class=\"lista-vacia\">No hay tareas en este proyecto</p>";
                        }
                    ?>
                    
                </ul>
            </div>
            <div class="avance">
                <h2>Avance del proyecto</h2>
                <div id="barra-avance" class="barra-avance">
                    <div id="porcentaje" class="porcentaje">

                    </div>
                </div>
            </div>
        </main>
    </div><!--.contenedor-->
<?php
    include("inc/layouts/footer.php");
?>