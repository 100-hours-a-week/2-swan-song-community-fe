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
    const response = await fetch('/api/v1/auth/logout', {
        method: 'POST',
    });

    if (response.status === 204) {
        window.location.href = '/login';
    }
};
