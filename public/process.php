<?php
// Establecemos la cabecera para devolver una respuesta en formato JSON
header('Content-Type: application/json');

// --- 1. Validación en el Servidor ---
// Esto es CRUCIAL. Nunca confíes en la validación del cliente.

$errors = [];
$response = [];

// Comprobamos que el método de la petición sea POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Validación del nombre
    $name = trim($_POST['name']);
    if (empty($name)) {
        $errors[] = 'El nombre es obligatorio.';
    }

    // Validación del email
    $email = trim($_POST['email']);
    if (empty($email)) {
        $errors[] = 'El email es obligatorio.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // filter_var es la forma correcta y segura de validar un email en PHP
        $errors[] = 'El formato del email no es válido.';
    }

    // Validación del mensaje
    $message = trim($_POST['message']);
    if (empty($message)) {
        $errors[] = 'El mensaje no puede estar vacío.';
    }

    // --- 2. Procesamiento de los datos ---

    if (empty($errors)) {
        // Si no hay errores, procedemos a "enviar el email".
        // En un proyecto real, aquí usarías una librería como PHPMailer.
        // Para este ejemplo, solo simulamos el éxito.
        
        // mail($to, $subject, $body, $headers); // Línea de ejemplo real

        $response['status'] = 'success';
        $response['message'] = '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.';
        
    } else {
        // Si hay errores de validación, los devolvemos.
        $response['status'] = 'error';
        // Unimos todos los errores en un solo mensaje.
        $response['message'] = implode(' ', $errors);
    }

} else {
    // Si alguien intenta acceder a este script directamente por GET
    $response['status'] = 'error';
    $response['message'] = 'Método de petición no válido.';
}

// --- 3. Devolver la respuesta JSON ---
echo json_encode($response);
?>
