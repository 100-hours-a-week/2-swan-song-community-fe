const deleteUserBtn = document.getElementById('btn-user-delete');
const deleteUserModal = document.getElementById('modal-user-delete');
const cancelDeleteUserModal = document.getElementById('btn-cancel-user-delete');

deleteUserBtn.addEventListener('click', () => {
    deleteUserModal.style.display = 'flex';
}
);

cancelDeleteUserModal.addEventListener('click', () => {
    deleteUserModal.style.display = 'none';
}

);

