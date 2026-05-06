import { fetchData, setCurrentUser } from './main.js';

// ===== Register Form =====
const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", register);
}

function register(event) {
    event.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const user = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        username: document.getElementById("username").value,
        password: password
    };

    fetchData('/user/register', user, 'POST')
        .then(data => {
            if (!data.message) {
                setCurrentUser(data);
                window.location.href = "home.html";
            }
        })
        .catch(err => {
            alert(err.message);
        });
}

// ===== Login Form =====
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", login);
}

function login(event) {
    event.preventDefault();

    const user = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    fetchData('/user/login', user, 'POST')
        .then(data => {
            if (!data.message) {
                setCurrentUser(data);
                window.location.href = "home.html";
            }
        })
        .catch(err => {
            alert(err.message);
        });
}
