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

const actionListToggle =
    document.getElementsByClassName('action-list-toggle')[0];
actionListToggle.addEventListener('click', profileMenuToggle);
