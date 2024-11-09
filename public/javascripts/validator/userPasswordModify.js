const validatePassword = () => {
    const passwordInput = document.querySelector('input[name="password"]');
    const passwordCheckInput = document.querySelector(
        'input[name="password-check"]',
    );
    const passwordHelperText = document.getElementById('password-helper-text');
    const passwordCheckHelperText = document.getElementById(
        'password-check-helper-text',
    );
    const password = passwordInput.value.trim();
    const passwordCheck = passwordCheckInput.value.trim();

    // 비밀번호 유효성 검사
    const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

    // 초기화
    passwordHelperText.textContent = '';
    passwordCheckHelperText.textContent = '';

    if (!password) {
        passwordHelperText.textContent = '비밀번호를 입력해 주세요.';
        return false;
    }

    if (!passwordRegex.test(password)) {
        passwordHelperText.textContent =
            '비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
        return false;
    }

    if (password !== passwordCheck) {
        passwordCheckHelperText.textContent =
            '비밀번호 확인이 비밀번호와 다릅니다.';
        return false;
    }

    return true; // 모든 검사를 통과한 경우
};

// 폼 제출 시 validatePassword 호출
const userPasswordModifyForm = document.querySelector(
    '.user-password-modify-form',
);
userPasswordModifyForm.addEventListener('submit', event => {
    if (!validatePassword()) {
        event.preventDefault(); // 유효성 검사 실패 시 폼 제출 방지
    }
});
