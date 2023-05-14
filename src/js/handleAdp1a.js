/* CAMBIAR ESTE BOTON POR EL DE INICIAR LA PARTIDA LUEGO */
const btnAbandonar = document.getElementsByClassName('btnAbandonar');

/** Function: handleAdp1a
 * change images in "myFichas" to words **/
function Accept() {
    //document.getElementById('popUpFinished').style.visibility='hidden';
      // Obtener todas las imágenes de la página
    let myImages = document.getElementsByClassName("myImages");
    
    // Iterar a través de cada imagen y reemplazar su contenido por el atributo "alt"
    for (let i = 0; i < myImages.length; i++) {
            let altText = myImages[i].alt;
            let p = document.createElement("p");
            p.textContent = altText;
            p.classList.add("altText"); // agrega una clase altText SE PUEDE ELIMINAR MAYBE USEFUL
            myImages[i].replaceWith(p);
    }
}  

btnAbandonar[0].addEventListener('click', Accept);