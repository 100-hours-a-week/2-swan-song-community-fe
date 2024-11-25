const profileDropDownToggle = document.getElementById('profileDropDownToggle');
document.addEventListener('DOMContentLoaded', getProfile);

async function getProfile() {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
    });

    const data = await response.json();

    if (data.code === 2000) {
        profileDropDownToggle.src =
            data.data.profileImageUrl !== null
                ? `${IMAGE_BASE_URL}${data.data.profileImageUrl}`
                : '/images/assets/User_Default_Profile.svg';
    }
}

const logoutUser = async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    });

    if (response.status === 204) {
        window.location.href = '/login';
    }
};
