document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const passwordCheckerInput = document.querySelector(
        'input[name="passwordChecker"]',
    );
    const nicknameInput = document.querySelector('input[name="nickname"]');
    const submitButton = document.querySelector('.register-btn');

    const emailHelper = document.querySelector('.email-helper');
    const passwordHelper = document.querySelector('.password-helper');
    const passwordCheckerHelper = document.querySelector(
        '.password-checker-helper',
    );
    const nicknameHelper = document.querySelector('.nickname-helper');

    function validateEmail() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailPattern.test(emailInput.value);
        emailHelper.style.display = isValid ? 'none' : 'block';
        return isValid;
    }

    function validatePassword() {
        const password = passwordInput.value;
        const isValidLength = password.length >= 8 && password.length <= 20;
        const hasNumber = /[0-9]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        const isValid =
            isValidLength &&
            hasNumber &&
            hasUpperCase &&
            hasLowerCase &&
            hasSpecialChar;
        passwordHelper.style.display = isValid ? 'none' : 'block';
        return isValid;
    }

    function validatePasswordChecker() {
        const isValid = passwordInput.value === passwordCheckerInput.value;
        passwordCheckerHelper.style.display = isValid ? 'none' : 'block';
        return isValid;
    }

    async function validateNickname() {
        const nickname = nicknameInput.value.trim();

        let isValid = true;
        if (nickname === '') {
            nicknameHelper.style.color = '#FF0000';
            nicknameHelper.textContent = '* 닉네임을 입력하세요.';
            isValid = false;
        } else if (nickname.length > 10) {
            nicknameHelper.style.color = '#FF0000';
            nicknameHelper.textContent = '* 닉네임은 10자리 이하여야 합니다.';
            isValid = false;
        } else {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/auth/check-nickname?nickname=${nickname}`,
                );

                const data = await response.json();
                if (!data.data.isAvailable) {
                    nicknameHelper.style.color = '#FF0000';
                    nicknameHelper.textContent = '* 닉네임이 중복되었습니다.';
                    isValid = false;
                } else {
                    nicknameHelper.style.color = '#007ACC';
                    nicknameHelper.textContent = `* ${data.message}`;
                }
            } catch (error) {
                isValid = false;
            }
        }

        return isValid;
    }

    function updateButtonState() {
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isPasswordMatch = validatePasswordChecker();
        const isNicknameValid = validateNickname();

        if (
            isEmailValid &&
            isPasswordValid &&
            isPasswordMatch &&
            isNicknameValid
        ) {
            submitButton.style.backgroundColor = '#7F6AEE';
            submitButton.disabled = false;
        } else {
            submitButton.style.backgroundColor = ''; // 버튼 색상 초기화
            submitButton.disabled = true; // 버튼 비활성화
        }
    }

    emailInput.addEventListener('input', updateButtonState);
    passwordInput.addEventListener('input', updateButtonState);
    passwordCheckerInput.addEventListener('input', updateButtonState);
    nicknameInput.addEventListener('input', updateButtonState);

    updateButtonState(); // 초기 상태 업데이트
});
