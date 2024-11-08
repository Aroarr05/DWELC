
function datos(){
    let numeros = parseInt(prompt("Introduce numeros: "))
    return numeros;
}
//isNaN()
while (datos) {
    
}

//FUNCION PARA CALCUALAR EL PROMEDIO 
function calcularPromedio(calificaciones){
    let suma = 0;
    for (let i = 0; i < calificaciones.length; i++) {
        const element = calificaciones[i];
    }
    return suma/ calificaciones.length;
}

//FUNCION QUE CALCULA LA EVALUACION DEL PROMEDIO 
function evaluacion(promedio){
    if(promedio<5){
        return "Reprobado";
    }else if(promedio >= 5 && promedio > 7){
        return "Suficiente";
    }else if(promedio >= 7 && promedio > 9){
        return "Bueno";
    }else{
        return "Sobresaliente";
    }
}
function main(){

}