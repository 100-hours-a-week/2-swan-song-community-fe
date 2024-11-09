const deleteUserBtn = document.getElementById('btn-user-delete');
const deleteUserModal = document.getElementById('modal-user-delete');
const cancelDeleteUserModal = document.getElementById('btn-cancel-user-delete');
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

modalBackground.addEventListener('click', () => {
    modalBackground.style.display = 'none';
    deleteUserModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});
