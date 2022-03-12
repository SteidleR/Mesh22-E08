let currentView = "register";

let registerView = document.getElementById("register-main");
let loginView = document.getElementById("login-main");

let registerBtn = document.getElementById("btn-register");
let loginBtn = document.getElementById("btn-login");

function changeToRegister() {
    if (currentView === "login") {
        currentView = "register";
        loginView.style.display = "none";
        registerView.style.display = "block";

        loginBtn.className = "btn btn-primary";
        registerBtn.className = "btn btn-outline-dark";
    }
}

function changeToLogin() {
    if (currentView === "register") {
        currentView = "login";
        registerView.style.display = "none";
        loginView.style.display = "block";

        registerBtn.className = "btn btn-primary";
        loginBtn.className = "btn btn-outline-dark";
    }
}