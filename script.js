document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const validationMessages = document.getElementById('validation-messages');
    validationMessages.innerHTML = '';

    // Validation
    if (username !== 'emilys') {
        validationMessages.innerHTML += '<p>Invalid username. Must be "emilys".</p>';
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        validationMessages.innerHTML += '<p>Invalid email format.</p>';
        return;
    }

    if (password.length < 8) {
        validationMessages.innerHTML += '<p>Password must be at least 8 characters long.</p>';
        return;
    }

    // API Integration
    const loginData = {
        username: username,
        password: password,
        email: email // optional
    };

    fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('authToken', data.token);
            window.location.href = 'home.html'; // Redirect to main page
        } else {
            validationMessages.innerHTML += '<p>Login failed. Please try again.</p>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        validationMessages.innerHTML += '<p>An error occurred. Please try again.</p>';
    });
});

// Auto redirect if already logged in
if (localStorage.getItem('authToken')) {
    window.location.href = 'home.html';
}
