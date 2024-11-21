document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/v1/users/me');
        const responseJson = await response.json();

        const userModifyInput = document.getElementById('userInfoModifyForm');
        const emailLabel = document.getElementById('info-modify-email');
        const nicknameInput = userModifyInput.querySelector(
            'input[name="nickname"]',
        );
        const profileImageElement = document.getElementById(
            'profileImagePreview',
        );

        emailLabel.innerText = responseJson.data.email || '';
        nicknameInput.value = responseJson.data.nickname || '';

        profileImageElement.src =
            responseJson.data.profileImageUrl ||
            '/images/assets/User_Default_Profile.svg';

        profileImagePlaceholder.querySelector('.placeholder-cur-profile').src =
            profileImageElement.src;
    } catch (error) {
        console.error(error);
    }
});

const modifyUserBtn = document.getElementById('btnUserInfoModify');
modifyUserBtn.addEventListener('click', async () => {
    const formElement = document.getElementById('userInfoModifyForm');
    const formData = new FormData(formElement);
    formData.set('isProfileImageRemoved', isProfileImageRemoved);

    try {
        const response = await fetch('/api/v1/users/me', {
            method: 'PUT',
            body: formData,
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
