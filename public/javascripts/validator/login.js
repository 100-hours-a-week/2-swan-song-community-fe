function validateForm() {
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const loginButton = document.querySelector('.login-btn');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValid = emailPattern.test(emailInput.value);
    const passwordValid = passwordInput.value.length >= 8;

    const generalHelpText = document.querySelector('.help-text');

    if (!emailValid || !passwordValid) {
        generalHelpText.style.display = 'block';
    } else {
        generalHelpText.style.display = 'none';
    }

    if (emailValid && passwordValid) {
        loginButton.style.backgroundColor = '#7F6AEE';
        loginButton.style.cursor = 'pointer';
        loginButton.disabled = false;
        loginButton.classList.remove('disabled');
        return true;
    } else {
        loginButton.style.backgroundColor = '#ACA0EB';
        loginButton.disabled = true;
        loginButton.classList.add('disabled');
        return false;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.querySelector('.login-btn');
    loginButton.disabled = true;

    const inputs = document.querySelectorAll('.login-form input');
    inputs.forEach(input => {
        input.addEventListener('input', validateForm);
    });

    document
        .querySelector('.login-form')
        .addEventListener('submit', function (event) {
            if (!validateForm()) {
                event.preventDefault();
            }
        });
});
