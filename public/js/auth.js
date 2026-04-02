// Capturamos los formularios
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
// --- LÓGICA DE LOGIN ---
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página se recargue

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // Hacemos la petición a nuestra API
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();

            if (response.ok) {
                // ¡ÉXITO! Guardamos el token en la "billetera" del navegador (localStorage)
                localStorage.setItem('kanban_token', data.token);
                // Redirigimos al dashboard
                window.location.href = '/dashboard';
            } else {
                alert(data.error || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión con el servidor');
        }
    });
}

// --- LÓGICA DE REGISTRO ---
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, email, password })
            });
            
            const data = await response.json();

            if (response.ok) {
                alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
                window.location.href = '/login';
            } else {
                alert(data.error || 'Error al registrarse');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}