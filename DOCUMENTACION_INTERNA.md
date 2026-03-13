# Documentación Interna: Formulario de Contacto Seguro

Este documento explica las decisiones de diseño y el flujo de datos del proyecto.

### Flujo de Datos

1.  El usuario abre `index.html` en su navegador.
2.  El usuario rellena el formulario. `validator.js` proporciona feedback en tiempo real si se comete un error.
3.  Al pulsar "Enviar", `validator.js` intercepta el evento `submit`.
4.  El script de JS realiza una última validación completa de todos los campos.
5.  Si la validación del cliente es exitosa, usa la API `fetch` para enviar una petición `POST` a `process.php`. Los datos del formulario se envían en el cuerpo de la petición.
6.  `process.php` recibe la petición. Primero, comprueba que el método sea `POST`.
7.  **El script PHP vuelve a validar CADA CAMPO desde cero.** Ignora por completo el hecho de que ya fueron validados en el cliente.
8.  Si la validación del servidor falla, PHP construye una respuesta JSON con `status: 'error'` y un mensaje.
9.  Si la validación del servidor tiene éxito, PHP simula el envío del correo y construye una respuesta JSON con `status: 'success'`.
10. `validator.js` recibe la respuesta JSON del servidor.
11. El script de JS lee el `status` y el `message` de la respuesta y muestra el mensaje correspondiente en el `div#server-response`, aplicando la clase CSS correcta para el color.

### `public/index.html`
*   **`action="process.php"` y `method="POST"`**: Estos atributos son importantes. Aunque nuestro JS maneja el envío, definen qué pasaría si JavaScript estuviera desactivado. El formulario se enviaría de la forma tradicional a `process.php`.
*   **`novalidate`**: Le decimos al navegador que no muestre sus propios pop-ups de validación. Esto nos da control total sobre la apariencia de los mensajes de error.

### `public/js/validator.js`
*   **`event.preventDefault()`**: La línea más importante. Detiene el envío normal del formulario para que podamos procesarlo con JavaScript.
*   **`new FormData(form)`**: Una forma muy conveniente de recopilar todos los datos de un formulario en un objeto que `fetch` puede enviar fácilmente. Es más simple que obtener el valor de cada campo manualmente.
*   **`await response.json()`**: `fetch` no devuelve directamente el JSON, sino un objeto de respuesta. Este método lee el cuerpo de la respuesta y lo parsea como JSON.

### `public/process.php`
*   **`header('Content-Type: application/json');`**: Esencial. Le dice al cliente (nuestro JavaScript) que el contenido que está recibiendo es JSON, para que pueda procesarlo correctamente.
*   **`$_SERVER["REQUEST_METHOD"]`**: Una variable global de PHP que contiene el método de la petición (GET, POST, etc.). Usarla es la forma estándar de proteger un script contra accesos no deseados.
*   **`$_POST`**: Una variable global de PHP (un array asociativo) que contiene todos los datos enviados a través de una petición POST.
*   **`trim()`**: Elimina espacios en blanco al principio y al final de una cadena. Es una buena práctica para limpiar los datos del usuario antes de validarlos.
*   **`empty()`**: Comprueba si una variable está vacía. Es más robusto que solo comprobar `== ''`.
*   **`filter_var($email, FILTER_VALIDATE_EMAIL)`**: La función de oro para validar emails en PHP. Es mucho más fiable y segura que cualquier expresión regular que puedas escribir a mano.
*   **`json_encode($response)`**: Convierte un array asociativo de PHP en una cadena de texto con formato JSON, lista para ser enviada de vuelta al cliente.

Este proyecto, aunque pequeño, está lleno de buenas prácticas de seguridad y desarrollo web que son muy valoradas.
