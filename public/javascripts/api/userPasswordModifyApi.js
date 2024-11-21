document.addEventListener('DOMContentLoaded', function () {
    const userPasswordModifyBtn = document.getElementById(
        'btnUserPasswordModify',
    );

    userPasswordModifyBtn.addEventListener('click', async function () {
        const formElement = document.getElementById('userPasswordModifyForm');
        const formData = new FormData(formElement);

        const body = {
            newPassword: btoa(formData.get('newPassword')),
            passwordCheck: btoa(formData.get('passwordCheck')),
        };

        try {
            const response = await fetch('/api/v1/users/me/password', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const responseJson = await response.json();

            if (responseJson.code === 2000) {
                window.location.href = '/';
            } else {
                alert(responseJson.message);
            }
        } catch (error) {
            console.error(error);
        }
    });
});
