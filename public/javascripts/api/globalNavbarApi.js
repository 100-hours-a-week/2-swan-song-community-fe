const profileDropDownToggle = document.getElementById('profileDropDownToggle');
document.addEventListener('DOMContentLoaded', getProfile);

async function getProfile() {
    const response = await fetch('/api/v1/users/me', {
        method: 'GET',
    });

    const data = await response.json();

    if (data.code === 2000) {
        profileDropDownToggle.src =
            data.data.profileImageUrl ||
            '/images/assets/User_Default_Profile.svg';
    }
}

const logoutUser = async () => {
    try {
        const response = await fetch('/api/v1/auth/logout', {
            method: 'POST',
        });

        const data = await response.json();
        if (data.code === 2004) {
            window.location.href = '/login';
        } else {
            throw new Error('로그아웃 실패');
        }
    } catch (error) {
        throw new Error('API 호출 중 오류 발생: ' + error.message);
    }
};
