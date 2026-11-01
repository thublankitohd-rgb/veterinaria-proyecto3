/**
 * LÓGICA JAVASCRIPT: VALIDACIONES Y EFECTO DE PISADAS DINÁMICAS
 */
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const confirmModalElement = document.getElementById('confirmModal');
    const confirmModal = new bootstrap.Modal(confirmModalElement);

    // Efecto de rastro de pisadas de perro al mover el cursor
    let lastTime = 0;
    document.addEventListener('mousemove', (e) => {
        const currentTime = Date.now();
        // Generar una huella cada 120ms para no saturar el rendimiento
        if (currentTime - lastTime > 120) {
            lastTime = currentTime;
            const paw = document.createElement('div');
            paw.classList.add('paw-print');
            paw.style.left = `${e.pageX}px`;
            paw.style.top = `${e.pageY}px`;
            document.body.appendChild(paw);

            // Eliminar el elemento del DOM después de que termine la animación
            setTimeout(() => {
                paw.remove();
            }, 1000);
        }
    });

    // Validar formato de email
    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // Evento de envío del formulario
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const nameInput = document.getElementById('userName');
        const emailInput = document.getElementById('userEmail');
        const messageInput = document.getElementById('userMessage');

        let isFormValid = true;

        // Validar Nombre
        if (nameInput.value.trim() === '') {
            nameInput.classList.add('is-invalid');
            isFormValid = false;
        } else {
            nameInput.classList.remove('is-invalid');
            nameInput.classList.add('is-valid');
        }

        // Validar Correo
        if (!isValidEmail(emailInput.value.trim())) {
            emailInput.classList.add('is-invalid');
            isFormValid = false;
        } else {
            emailInput.classList.remove('is-invalid');
            emailInput.classList.add('is-valid');
        }

        // Validar Mensaje
        if (messageInput.value.trim() === '') {
            messageInput.classList.add('is-invalid');
            isFormValid = false;
        } else {
            messageInput.classList.remove('is-invalid');
            messageInput.classList.add('is-valid');
        }

        // Procesar si es válido
        if (isFormValid) {
            const recipient = "contacto@saludanimalrd.com";
            const subject = encodeURIComponent(`Consulta de Mascota - ${nameInput.value.trim()}`);
            const body = encodeURIComponent(`Hola Salud Animal RD,\n\nNombre: ${nameInput.value.trim()}\nCorreo: ${emailInput.value.trim()}\n\nMensaje:\n${messageInput.value.trim()}`);
            
            const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

            // Abrir Modal de Confirmación
            confirmModal.show();

            // Abrir cliente de correo
            setTimeout(() => {
                window.location.href = mailtoUrl;
            }, 800);

            // Limpiar formulario
            contactForm.reset();
            nameInput.classList.remove('is-valid');
            emailInput.classList.remove('is-valid');
            messageInput.classList.remove('is-valid');
        }
    });

    // Quitar alerta al escribir
    ['userName', 'userEmail', 'userMessage'].forEach((id) => {
        const field = document.getElementById(id);
        field.addEventListener('input', () => {
            if (field.classList.contains('is-invalid')) {
                field.classList.remove('is-invalid');
            }
        });
    });
});