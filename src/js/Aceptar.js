const btnAccept = document.getElementsByClassName('btnAccept');

/** Function: Accept
 * return to home page when clicked **/
function Accept() {
    window.location.href = "/src/xhtml/homePage.xhtml";
}
btnAccept[0].addEventListener('click', Accept);