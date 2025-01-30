# Examen: Restaurante - La Carta de los Sabores Ocultos

## Idea Principal

Tendrás una tabla donde se listan platos de un restaurante con los siguientes campos:  
- `nombre`
- `ingredientes` (string con ingredientes separados por comas)
- `precio`
- `disponible` (booleano)
- `foto`, entre otros.

---

## Objetivos Clave

### DOM y Manipulación de Tablas
1. **Generación dinámica de filas**:  
   - Genera dinámicamente filas de la tabla con la información de cada plato.  
   - Cada fila tendrá un botón de “Ver Detalles”.  
     - Al pulsar este botón, se abrirá una sección debajo de la fila que muestre los ingredientes detallados, uno por línea (usando `split()` en la string de ingredientes).

---

### Forms y Eventos
2. **Filtros**:  
   - Crea un formulario para filtrar platos por:  
     - **Rango de precio**: permite introducir valores mínimo y máximo.  
     - **Ingrediente**: un campo de texto que filtra platos comparando con `includes()` en la lista de ingredientes.  
   - Al pulsar el botón de filtrar, se mostrará solo lo que cumpla las condiciones.

---

### Temporizadores y Cookies
3. **Mensaje de bienvenida**:  
   - Al cargar la página (`onload`), muestra un mensaje de bienvenida estilo popup (un div en el DOM).  
   - Este mensaje desaparecerá automáticamente tras un `setTimeout` de X segundos.  
4. **Última visita**:  
   - Usa cookies para recordar la última vez que el usuario visitó la carta.  
   - Cuando el usuario vuelva a cargar la página, muestra la fecha/hora de su última visita.

---

### Spread/Rest y Manejo de Strings
5. **Cálculo del precio total**:  
   - Implementa una función que use `rest` para calcular el precio total de varios platos seleccionados.  
     Ejemplo:  
     ```javascript
     function calcularCuenta(...listaPrecios) {
       return listaPrecios.reduce((total, precio) => total + precio, 0);
     }
     ```
6. **Limpieza de datos**:  
   - Usa métodos como `trim()`, `replace()`, `slice()`, `toLowerCase()` para normalizar datos antes de guardarlos.

---

## Puntos de Evaluación

1. Creación y manipulación de la tabla con el DOM.
2. Implementación de filtros multi-criterio (por precios y por ingredientes).
3. Uso de `setTimeout` para mostrar y ocultar mensajes.
4. Uso de cookies para registrar la última visita del usuario.
5. Uso de `rest` para la suma de importes.

---

## Instrucciones

- Los nombres de los archivos que crees deben incluir tu nombre.
- En el título del archivo HTML debe aparecer tu nombre.
- En la parte superior del archivo HTML debe aparecer un encabezado con tu nombre y apellidos.

## Entrega del Ejercicio Práctico

- Sube un `.zip` con todos los archivos creados y enlazados correctamente.
- Entrega el archivo en la tarea correspondiente de Moodle Centros.
