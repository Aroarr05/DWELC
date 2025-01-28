# Examen: Superhéroes al Rescate

## Idea Principal

Tendrás un pequeño catálogo de superhéroes almacenado en un archivo JSON local (o directamente en un array de objetos).  
Cada superhéroe tiene las siguientes propiedades:  
- `nombre`
- `poder`
- `equipo`
- `añoAparicion`
- `img`, entre otros.

---

## Objetivos Clave

### Fetch y Cookies
1. **Carga inicial**:  
   - Al cargar la página (usando `window.onload` o `DOMContentLoaded`), realiza un `fetch` a tu JSON local para obtener el listado de superhéroes.
   - Guarda en una cookie el último superhéroe seleccionado o el último filtro aplicado.  
     Por ejemplo:  
     - Si el filtro fue "Avengers", la página debe recordar este filtro al recargarse.

---

### Manejo de Objetos y Arrays
2. **Filtros**:  
   - Crea un buscador que filtre por:
     - **Nombre**: usando métodos como `includes()`, `toLowerCase()`, etc.
     - **Equipo**: filtrando por la propiedad `equipo`.  
   - Aplica métodos como `map()`, `filter()`, etc., para procesar y mostrar la información en el DOM.

---

### DOM y Eventos
3. **Generación dinámica de contenido**:  
   - Genera tarjetas (o filas de una tabla) dinámicamente con los datos obtenidos del JSON.  
   - Al hacer clic en una tarjeta:
     - Añade un efecto de resalte usando `classList.add(...)`.
     - Muestra un **panel de detalles** del héroe seleccionado.  
4. **Formulario**:  
   - Implementa un formulario que permita añadir un nuevo superhéroe al listado.  
   - Al enviar el formulario:  
     - Manipula el array para incluir el nuevo héroe.
     - Actualiza dinámicamente el DOM.

---

### Timers y Spread/Rest
5. **Rotación automática de imágenes**:  
   - Usa `setInterval` para rotar automáticamente la imagen de cada héroe (o mostrar la próxima imagen de su galería) cada X segundos.  
6. **Funciones con spread/rest**:  
   - Usa `spread` o `rest` en una función que reciba varios valores.  
     Por ejemplo: sumar niveles de poder:  
     ```javascript
     function totalPower(...poderes) {
       return poderes.reduce((acc, poder) => acc + poder, 0);
     }
     ```

---

## Puntos de Evaluación

1. Manejo de formularios (añadir héroe).
2. Uso de métodos como `filter`, `includes`, `replaceAll`, etc.
3. Uso de `fetch` para leer un JSON local.
4. Uso de cookies para guardar últimos filtros o héroes seleccionados.
5. Uso de un `Timer` para realizar cambios automáticos en el DOM.
