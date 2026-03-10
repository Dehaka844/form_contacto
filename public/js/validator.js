document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const serverResponseDiv = document.getElementById('server-response');

    form.addEventListener('submit', function(event) {
        // Prevenimos el envío del formulario para validarlo primero
        event.preventDefault();

        // 1. Validación en el cliente
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isMessageValid) {
            // Si todo es válido en el cliente, enviamos los datos al servidor
            submitForm();
        }
    });

    // --- Funciones de validación individuales ---
    function validateName() {
        const nameError = document.getElementById('name-error');
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'El nombre es obligatorio.';
            nameInput.classList.add('invalid');
            return false;
        }
        nameError.textContent = '';
        nameInput.classList.remove('invalid');
        return true;
    }

    function validateEmail() {
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Por favor, introduce un email válido.';
            emailInput.classList.add('invalid');
            return false;
        }
        emailError.textContent = '';
        emailInput.classList.remove('invalid');
        return true;
    }

    function validateMessage() {
        const messageError = document.getElementById('message-error');
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'El mensaje no puede estar vacío.';
            messageInput.classList.add('invalid');
            return false;
        }
        messageError.textContent = '';
        messageInput.classList.remove('invalid');
        return true;
    }

    // --- Función para enviar el formulario con Fetch API ---
    async function submitForm() {
        const formData = new FormData(form);

        try {
            const response = await fetch('process.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            serverResponseDiv.textContent = result.message;
            if (result.status === 'success') {
                serverResponseDiv.className = 'success';
                form.reset(); // Limpiamos el formulario
            } else {
                serverResponseDiv.className = 'error';
            }
        } catch (error) {
            serverResponseDiv.textContent = 'Ocurrió un error al enviar el formulario. Inténtalo de nuevo.';
            serverResponseDiv.className = 'error';
            console.error('Error:', error);
        }
    }
});
