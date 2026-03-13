# Formulario de Contacto con Validación Dual (Cliente y Servidor)

Este proyecto demuestra la implementación de un formulario de contacto seguro, aplicando validaciones tanto en el frontend (con JavaScript) como en el backend (con PHP). El objetivo es ilustrar la importancia de la validación en el servidor como una capa de seguridad fundamental, mientras se ofrece una experiencia de usuario fluida con validación instantánea en el cliente.

## Características

*   **Validación en el Cliente:** Feedback instantáneo al usuario utilizando JavaScript para validar campos vacíos y el formato del email, sin necesidad de recargar la página.
*   **Validación en el Servidor:** Lógica de validación robusta en PHP que actúa como la fuente de verdad, protegiendo la aplicación contra datos maliciosos o envíos que se saltan la validación del cliente.
*   **Comunicación Asíncrona:** El formulario se envía usando la API `fetch` de JavaScript, procesando la respuesta del servidor y mostrando un mensaje de éxito o error sin recargar la página.
*   **Seguridad:** El script de PHP solo acepta peticiones `POST` y utiliza funciones nativas seguras como `filter_var` para la validación.

## Tecnologías Utilizadas

*   **Frontend:**
    *   **HTML5:** Estructura del formulario.
    *   **CSS3:** Estilos para una interfaz limpia y responsiva.
    *   **JavaScript (ES6+):** Para la validación en el lado del cliente y el envío asíncrono del formulario.
*   **Backend:**
    *   **PHP:** Para la validación en el lado del servidor y el procesamiento de los datos del formulario.

## Cómo Ejecutar el Proyecto

Para ejecutar este proyecto, necesitas un entorno de servidor local que pueda interpretar PHP, como XAMPP, WAMP, MAMP o el servidor incorporado de PHP.

**1. Prerrequisitos:**
   *   Tener un entorno de servidor PHP local instalado.
   *   Un navegador web moderno.

**2. Configuración:**

   ```bash
   # 1. Clona el repositorio en la carpeta de tu servidor web (ej. 'htdocs' en XAMPP)
   git clone https://github.com/tu-usuario/contact-form.git
   cd contact-form
   ```

**3. Ejecución con el Servidor Incorporado de PHP (Recomendado ):**

   Este es el método más sencillo y no requiere instalar software adicional si ya tienes PHP.

   ```bash
   # 1. Navega a la carpeta 'public' del proyecto
   cd public

   # 2. Inicia el servidor de desarrollo de PHP
   php -S localhost:8000
   ```
   
   Ahora, abre tu navegador y visita `http://localhost:8000`. Podrás ver y utilizar el formulario de contacto.

**4. Ejecución con XAMPP/WAMP/MAMP:**

   *   Asegúrate de que tu servidor Apache esté funcionando.
   *   Abre tu navegador y navega a la URL correspondiente a la carpeta del proyecto (ej. `http://localhost/contact-form/public/` ).

## El Principio de "Nunca Confíes en el Cliente"

Este proyecto es una demostración práctica de por qué la validación en el servidor no es opcional. Un usuario podría desactivar JavaScript o usar herramientas de desarrollo para enviar una petición `POST` directamente a `process.php` con datos inválidos. La validación en PHP asegura que, sin importar lo que envíe el cliente, el servidor solo procesará datos que cumplan con las reglas de negocio.

---
*Desarrollado por David Arenas Cabeza.*
