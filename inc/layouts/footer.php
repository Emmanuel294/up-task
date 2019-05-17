    <footer>
    
    <?php 
        $actual = obtenerPaginaActual();
        if($actual == "crear-cuenta" || $actual == "login"){
            echo "<script src=" . "js/formulario.js "."></script>";
        }else{
            echo "<script src=" . "js/scripts.js "."></script>";
        }
    ?>
    <div class="contenido-footer">
        <p class="copy">Powered by ZFC&copy;</p>
        <div class="obj">
            <h3>Objetivo</h3>
            <p>Esta pagina ayuda a administrar las tareas de los proyectos que se van a realizar. Puedes agregar nuevos proyectos así como nuevas tareas.</p>
        </div>
        <div class="redes">
            <h3>Nuestras redes sociales</h3>
            <a href="#"><i class="fab fa-facebook-square"></i></a>
            <a href="#"><i class="fab fa-twitter-square"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
        </div>
    </div>
    <script src="js/sweetalert2.all.min.js"></script>
    </footer>
</body>
</html>