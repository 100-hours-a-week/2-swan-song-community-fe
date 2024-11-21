const deleteUserBtn = document.getElementById('btnUserDelete');
const deleteUserModal = document.getElementById('modalUserDelete');
const cancelDeleteUserModal = document.getElementById('btnCancelUserDelete');

const profileImageOverlay = document.querySelector('.profile-image-overlay');
const profileImagePlaceholder = document.querySelector('.image-placeholder');
const profileImageInput = document.getElementById('profileImage');
const profileImageModal = document.getElementById('modalUserProfileUpdate');

let hasProfileImage =
    profileImagePlaceholder.querySelector('.placeholder-cur-profile').src !==
    '/images/assets/User_Default_Profile.svg';
let isProfileImageRemoved = false;

const modalBackground = document.getElementById('modalBackground');

deleteUserBtn.addEventListener('click', () => {
    modalBackground.style.display = 'block';
    deleteUserModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

cancelDeleteUserModal.addEventListener('click', () => {
    modalBackground.style.display = 'none';
    deleteUserModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

const cancelProfileUpdateBtn = document.getElementById(
    'btnCancelUserProfileUpdate',
);
const confirmProfileUpdateBtn = profileImageModal.querySelector('.confirm');

profileImageOverlay.addEventListener('click', () => {
    isProfileImageRemoved = true;
    if (hasProfileImage) {
        modalBackground.style.display = 'block';
        profileImageModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    } else {
        profileImageInput.click();
    }
});

cancelProfileUpdateBtn.addEventListener('click', () => {
    modalBackground.style.display = 'none';
    profileImageModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

confirmProfileUpdateBtn.addEventListener('click', () => {
    const defaultProfileImage = '/images/assets/User_Default_Profile.svg';
    profileImagePlaceholder.querySelector('.placeholder-cur-profile').src =
        defaultProfileImage;
    hasProfileImage = false;

    modalBackground.style.display = 'none';
    profileImageModal.style.display = 'none';
    profileImageOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';

    profileImageInput.click();
    hasProfileImage = profileImageInput.files.length > 0;

    profileImageInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImagePlaceholder.querySelector(
                    '.placeholder-cur-profile',
                ).src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    if (profileImageInput.files.length === 0) {
        profileImagePlaceholder.querySelector('.placeholder-cur-profile').src =
            defaultProfileImage;
    }

    profileImageOverlay.style.display = 'flex';
});

modalBackground.addEventListener('click', () => {
    modalBackground.style.display = 'none';
    deleteUserModal.style.display = 'none';
    profileImageModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});
