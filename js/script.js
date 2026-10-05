// ===============================
// GESTIÓN PÚBLICA - JAVASCRIPT
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeToggle = document.getElementById("themeToggle");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    // MODO OSCURO / CLARO
    const savedTheme = localStorage.getItem("tema");
    if (savedTheme === "oscuro") {
        body.classList.add("dark-mode");
        if (themeToggle) themeToggle.textContent = "☀️";
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            const oscuro = body.classList.contains("dark-mode");
            localStorage.setItem("tema", oscuro ? "oscuro" : "claro");
            themeToggle.textContent = oscuro ? "☀️" : "🌙";
        });
    }

    // MENÚ RESPONSIVO
    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
            menuToggle.textContent = navLinks.classList.contains("open") ? "✕" : "☰";
        });
    }

    // FORMULARIO DE CONTACTO
    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const nombre = document.getElementById("nombre");
            const email = document.getElementById("email");
            const asunto = document.getElementById("asunto");
            const mensaje = document.getElementById("mensaje");

            const campos = [
                { input: nombre, error: "nombreError", texto: "Ingresa tu nombre." },
                { input: email, error: "emailError", texto: "Ingresa un correo válido." },
                { input: asunto, error: "asuntoError", texto: "Ingresa el asunto." },
                { input: mensaje, error: "mensajeError", texto: "Escribe un mensaje." }
            ];

            let formularioValido = true;

            campos.forEach(campo => {
                const grupo = campo.input.closest(".form-group");
                const error = document.getElementById(campo.error);

                grupo.classList.remove("invalid");
                error.textContent = "";

                if (!campo.input.value.trim()) {
                    grupo.classList.add("invalid");
                    error.textContent = campo.texto;
                    formularioValido = false;
                }
            });

            if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                email.closest(".form-group").classList.add("invalid");
                document.getElementById("emailError").textContent = "El correo no tiene un formato válido.";
                formularioValido = false;
            }

            const formMessage = document.getElementById("formMessage");

            if (formularioValido) {
                formMessage.className = "form-message success";
                formMessage.textContent = `¡Gracias, ${nombre.value.trim()}! Tu mensaje fue validado correctamente.`;
                form.reset();
            } else {
                formMessage.className = "form-message error-message";
                formMessage.textContent = "Por favor, revisa los campos marcados.";
            }
        });
    }
});
