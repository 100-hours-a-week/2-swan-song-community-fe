const signupUser = async formData => {
    try {
        const password = formData.get('password');
        const encodedPassword = btoa(password);
        formData.set('password', encodedPassword);

        const passwordChecker = formData.get('passwordChecker');
        const encodedPasswordChecker = btoa(passwordChecker);
        formData.set('passwordChecker', encodedPasswordChecker);

        const response = await fetch('/api/v1/auth/signup', {
            method: 'POST',
            body: formData,
        });

        return await response.json();
    } catch (error) {
        throw new Error('API 호출 중 오류 발생: ' + error.message);
    }
};

const loginUser = async formData => {
    try {
        const password = formData.get('password');
        const encodedPassword = btoa(password);
        formData.set('password', encodedPassword);

        const passwordChecker = formData.get('passwordChecker');
        const encodedPasswordChecker = btoa(passwordChecker);
        formData.set('passwordChecker', encodedPasswordChecker);

        const response = await fetch('/api/v1/auth/signin', {
            method: 'POST',
            body: formData,
        });

        return await response.json();
    } catch (error) {
        throw new Error('API 호출 중 오류 발생: ' + error.message);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
        registerForm.addEventListener('submit', async event => {
            event.preventDefault();

            const formData = new FormData(registerForm);

            const password = formData.get('password');
            const passwordChecker = formData.get('passwordChecker');

            if (password !== passwordChecker) {
                document.querySelector('.password-checker-helper').textContent =
                    '* 비밀번호가 일치하지 않습니다.';
                return;
            }

            try {
                const result = await signupUser(formData);

                if (result.code === 2001) {
                    window.location.href = '/login';
                } else {
                }
            } catch (error) {
                console.log(error);
            }
        });
    }
    if (loginForm) {
        loginForm.addEventListener('submit', async event => {
            event.preventDefault();

            const formData = new FormData(loginForm);

            try {
                const result = await loginUser(formData);
                console.log(result);
                if (result.code === 2000) {
                    window.location.href = '/';
                } else {
                    document.querySelector('.login-error-helper').textContent =
                        '* 로그인 실패: ' + result.message;
                }
            } catch (error) {
                console.log(error);
            }
        });
    }
});
