
const COKKIE_EXPIRATION_MINUTES = 10;
const CONFIRMATION_INTERVAL_MINUTES = 5;
const CommentKey = "userComment";

function getCookie(name){
    const value= `;${document.cokkie}`;
    const parts = value.split(`;${name}=`);
    if (parts.length===2) return parts.pop().split(';').shift();
    return null;
}

function setCookie(name, value, minutes){
    const date = new Date();
    date.setTime(date.getTime()+ minutes*60*1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function deleteCookie(name){
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

function initialize() {
    const userName = getCookie("userName");
    const greeting = document.querySelector("#greeting");
    const nameForm = document.querySelector("#name-form");
    const loggedIn = document.querySelector("#logged-in");
    const userNameSpan = document.querySelector("#user-name");
    const commentArea = document.querySelector("#comment-area");
  
    if (userName) {
      greeting.innerText = "¡Bienvenido de nuevo!";
      userNameSpan.innerText = userName;
      loggedIn.style.display = "block";
  
      // Restaurar comentario si existe
      const savedComment = getCookie(commentKey);
      if (savedComment) commentArea.value = decodeURIComponent(savedComment);
  
      // Intervalo para confirmar que el usuario está presente
      const confirmationInterval = setInterval(() => {
        const stillHere = confirm("¿Sigues aquí?");
        if (stillHere) {
          setCookie("userName", userName, COOKIE_EXPIRATION_MINUTES);
        } else {
          deleteCookie("userName");
          deleteCookie(commentKey);
          clearInterval(confirmationInterval);
          location.reload();
        }
      }, CONFIRMATION_INTERVAL_MINUTES * 60 * 1000);
  
      // Guardar automáticamente el contenido del área de texto
      commentArea.addEventListener("input", () => {
        setCookie(commentKey, encodeURIComponent(commentArea.value), COOKIE_EXPIRATION_MINUTES);
      });
    } else {
      greeting.innerText = "¡Bienvenido! Por favor, ingresa tu nombre.";
      nameForm.style.display = "block";
    }
  
    nameForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const userName = document.querySelector("#username").value.trim();
      if (userName) {
        setCookie("userName", userName, COOKIE_EXPIRATION_MINUTES);
        location.reload();
      }
    });
  }
  
  // Eliminar cookie automáticamente al cerrar el navegador (configurar como cookie de sesión)
  window.addEventListener("beforeunload", () => {
    deleteCookie(commentKey);
  });
  
  document.addEventListener("DOMContentLoaded", initialize);