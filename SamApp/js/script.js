import api from "./api.service.js";

export function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = document.querySelector(`#${inputId} + .toggle-password`);
    if (input.type === "password") {
        input.type = "text";
        icon.classList.add("visible");
    } else {
        input.type = "password";
        icon.classList.remove("visible");
    }
}

export function showRegister() {
    console.log("showRegister function triggered");
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("forgotPasswordBox").style.display = "none";
    document.getElementById("registerBox").style.display = "block";
}

export  function showForgotPassword() {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("registerBox").style.display = "none";
    document.getElementById("forgotPasswordBox").style.display = "block";
}

export function showLogin() {
    document.getElementById("registerBox").style.display = "none";
    document.getElementById("forgotPasswordBox").style.display = "none";
    document.getElementById("loginBox").style.display = "block";
}


document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;


    if (password !== confirmPassword) {
        alert("Wachtwoorden komen niet overeen");
        return;
    }

    console.log("Registratiegegevens:", JSON.stringify({ firstName, lastName, email }));



    try {
        const data = await api.register(email, password, firstName, lastName);

        console.log("Server Response:", data);

        if (data.message === "User created successfully!") {
            alert("Registreren geslaagd! Controleer je e-mail voor verificatie.");
            showLogin();
        } else {
            alert(`Registratie mislukt: ${data.message || "Probeer opnieuw."}`);
        }
    } catch (error) {
        console.error("Registreer fout:", error);
        alert("Er is een fout opgetreden bij het registreren.");
    }
});


document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await api.login(email, password);
        console.log(response);
        if (response.token){
            alert("Inloggen geslaagd!");
            localStorage.setItem("token", response.token);
            localStorage.setItem("email",email);
            window.location.href = "homepage.html";
        } else {
            alert("Ongeldige inloggegevens. Probeer opnieuw.");
        }
    } catch (error) {
        console.error("Login fout:", error);
        alert("Er is een fout opgetreden bij het inloggen.");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("showRegister").addEventListener("click", showRegister);

    document.getElementById("forgotPasswordLink").addEventListener("click", function (e) {
        e.preventDefault();
        showForgotPassword();
    });

    const backToLoginLinks = document.getElementsByClassName("backToLoginLink");
    for (let link of backToLoginLinks) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            showLogin();
        });
    }

    const toggleLinks = document.querySelectorAll('.toggle-password');
    for (let link of toggleLinks) {
        link.addEventListener("click", function () {
            const inputId = link.previousElementSibling.id;
            togglePassword(inputId);
        });
    }
});





document.getElementById("forgotPasswordForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("forgotEmail").value;



    try {
        const data =  await api.changePass(email);
        console.log("Server Response:", data);

        if (data.message === "Email Sent") {
            alert("Email verstuurd");
            showLogin();
        } else {
            alert(`wachtwoord veranderen mislukt: ${data.message || "Probeer opnieuw."}`);
        }
    } catch (error) {
        console.error("wachtwoord veranderen fout:", error);
        alert("Er is een fout opgetreden bij het veranderen.");
    }
});