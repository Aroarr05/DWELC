# Examen: Bestiario Mágico Interactivo

## Idea Principal

Crearás una especie de “Pokédex” pero con criaturas fantásticas como dragones, unicornios, grifos, etc. Tendrás un array de objetos con las siguientes propiedades:  
- `nombre`
- `habitat`
- `descripcion`
- `anioDescubrimiento`
- `img`
- `peligrosidad` (nivel de peligrosidad de la criatura).

---

## Objetivos Clave

### DOMContentLoaded
1. **Carga inicial**:  
   - Usa `DOMContentLoaded` para asegurarte de que la lista de criaturas se cargue y se generen las cartas dinámicamente en el contenedor del bestiario.

---

### Formulario Avanzado
2. **Filtros combinados**:  
   - Crea un buscador con las siguientes características:  
     - **Checkboxes**: para seleccionar el tipo de hábitat (ej. bosque, montaña, etc.).  
     - **Rango de años**: permite buscar criaturas descubiertas entre dos años específicos (desde y hasta).  
     - **Input para nombre**: filtra por nombre, usando métodos como `includes()` o `toLowerCase()`.  
   - El botón “Buscar” aplicará todos los filtros combinados y mostrará solo las cartas que cumplan con las condiciones.

3. **Estilo dinámico**:  
   - Cada carta debe tener su `classList` modificada para indicar la peligrosidad.  
     - Por ejemplo:  
       - Si la peligrosidad es alta, añade una clase `card-danger` que cambie el fondo a rojo.

---

### setInterval y Manejo de Strings
4. **Auto-lectura de descripciones**:  
   - Cada criatura tendrá un botón “Auto-lectura”.  
   - Al pulsarlo, usa `setInterval` para mostrar progresivamente la descripción de la criatura en un `<span>`.  
     - Cada 2 segundos, se muestra la siguiente frase o palabra de la descripción.  
   - Usa métodos de strings como `split()`, `substring()`, `includes()`, etc., para procesar y manipular el texto.

---

### Cookies y Fetch
5. **Modo oscuro/claro**:  
   - Implementa un **toggle** para cambiar entre modo oscuro y modo claro.  
   - Guarda esta preferencia en una cookie para que al recargar la página se mantenga el modo seleccionado.  

6. **Extra (opcional)**:  
   - Realiza un `fetch` a un archivo JSON remoto o local que contenga criaturas nuevas.  
   - Une las criaturas obtenidas con el array existente usando el operador `spread`.

---

## Puntos de Evaluación

1. Manipulación del DOM con eventos para checkboxes, selects e inputs.
2. Implementación de filtros múltiples usando métodos como `includes`, `slice`, `substring`, etc.
3. Uso de `setInterval` para mostrar progresivamente texto de las descripciones.
4. Implementación de cookies para guardar y recuperar el modo oscuro/claro.
5. Uso de `fetch` y `spread` para unir arrays de criaturas (opcional).

---

## Instrucciones

- Los nombres de los archivos que crees deben incluir tu nombre.
- En el título del archivo HTML debe aparecer tu nombre.
- En la parte superior del archivo HTML debe aparecer un encabezado con tu nombre y apellidos.

## Entrega del Ejercicio Práctico

- Sube un `.zip` con todos los archivos creados y enlazados correctamente.
- Entrega el archivo en la tarea correspondiente de Moodle Centros.
