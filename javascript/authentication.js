const flipper = document.getElementsByTagName("main")[0];
const goToRegisterButton = document.getElementById("go-to-register");
const goToLoginButton = document.getElementById("go-to-login");
const showPasswordChecks = document.querySelectorAll(".show-password-check");
const loginForm = document.getElementById('login-form');
const loginSection = document.getElementById('login');
const registerForm = document.getElementById('register-form');
const registerSection = document.getElementById('register');
const passwordInput = document.getElementById('register-password');
const passwordConfirmInput = document.getElementById('register-password-confirm');
const passwordStrengthBar = document.getElementById('password-strength');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    fetch(`${API_BASE_URL}/authentication/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.success) {
                const accessToken = data.data.access_token;
                const refreshToken = data.data.refresh_token;
                console.log('Access Token:', accessToken);
                console.log('Refresh Token:', refreshToken);

                // Optionally store tokens in localStorage
                // localStorage.setItem('access_token', accessToken);
                // localStorage.setItem('refresh_token', refreshToken);

                alert('Login successful!');
            } else {
                const errorMessage = data.data.message || 'Login failed for an unknown reason.';
                console.error('Login failed:', errorMessage);
                alert(errorMessage);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = registerForm['register-username'].value;
    const email = registerForm['register-email'].value;
    const password = registerForm['register-password'].value;

    fetch(`${API_BASE_URL}/authentication/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email: email, password: password })
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Registration successful! Please log in.');
            } else {
                const errorMessage = data.data.message || 'Registration failed for an unknown reason.';
                console.error('Registration failed:', errorMessage);
                alert(errorMessage);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });

    toggleFlipper("login");
});

function toggleFlipper(side) {
    if (flipper.style.transform === "rotateY(180deg)" || side === "register") {
        flipper.style.transform = "rotateY(0deg)";
        setTimeout(() => {
            loginSection.style.display = "flex";
            registerSection.style.display = "none";
        }, 100);
    } else {
        flipper.style.transform = "rotateY(180deg)";
        setTimeout(() => {
            loginSection.style.display = "none";
            registerSection.style.display = "flex";
        }, 100);
    }
}

goToRegisterButton.addEventListener("click", () => toggleFlipper("register"));
goToLoginButton.addEventListener("click", () => toggleFlipper("login"));

showPasswordChecks.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        const newType = checkbox.checked ? "text" : "password";

        document.querySelectorAll("input[type='password'], input[type='text']").forEach(passwordField => {
            if (passwordField.id.includes("password")) {
                passwordField.type = newType;
            }
        });

        showPasswordChecks.forEach(otherCheckbox => {
            otherCheckbox.checked = checkbox.checked;
        });
    });
});

passwordInput.addEventListener("keyup", () => {
    /*
    Rates a password based on the following criteria:
    - At least 12 characters long.
    - Contains at least one uppercase letter(A - Z).
    - Contains at least one lowercase letter(a - z).
    - Contains at least one digit(0 - 9).
    - Contains at least one special character(any non - alphanumeric character).
    */
    const maxPoints = 5;
    let password = passwordInput.value;
    const criteria = {
        length: password.length >= 12,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        digit: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    }
    const metCriteriaCount = Object.values(criteria).filter(Boolean).length;

    // Update the strength bar
    passwordStrengthBar.max = maxPoints;
    passwordStrengthBar.value = metCriteriaCount;

    if (metCriteriaCount > 0) {
        passwordStrengthBar.classList.remove("hidden");
    } else {
        passwordStrengthBar.classList.add("hidden");
    }

    if (metCriteriaCount === maxPoints) {
        passwordInput.classList.add("valid");
        passwordInput.classList.remove("invalid");
    } else {
        passwordInput.classList.add("invalid");
        passwordInput.classList.remove("valid");
    }
});

passwordConfirmInput.addEventListener("keyup", () => {
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;

    if (password === passwordConfirm) {
        passwordConfirmInput.classList.add("valid");
        passwordConfirmInput.classList.remove("invalid");
    } else {
        passwordConfirmInput.classList.add("invalid");
        passwordConfirmInput.classList.remove("valid");
    }
});
