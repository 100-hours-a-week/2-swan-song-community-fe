const profileMenuToggle = () => {
    const profileMenu = document.getElementsByClassName('profile-menu')[0];
    if (
        profileMenu.style.display === 'none' ||
        profileMenu.style.display === ''
    ) {
        profileMenu.style.display = 'block';
    } else {
        profileMenu.style.display = 'none';
    }
};

const actionListToggle = document.getElementById('profileDropDownToggle');
actionListToggle.addEventListener('click', profileMenuToggle);
