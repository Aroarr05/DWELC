
function emailCifrado(email){
    let partesEmail = email.split("@");
    let parteLocal = partesEmail[0];
    let parteDominio = partesEmail[1];

    //let parteLocalProtegida = parteLocal.substring(0,Math.min(4,parteLocal.length))+"..."; no hace falta es repetir las cosas
    let parteLocalProtegida = parteLocal.substring(0,4)+"...";

    return parteLocalProtegida + "@" + parteDominio;

}
console.log(emailCifrado("aroa.rivas.rios@gmail.com"));