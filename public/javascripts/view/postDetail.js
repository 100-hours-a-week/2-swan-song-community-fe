const deletePostBtn = document.getElementById('btn-post-delete');
const deleteCommentBtn = document.getElementById('btn-comment-delete');

const deletePostModal = document.getElementById('modal-post-delete');
const deleteCommentModal = document.getElementById('modal-comment-delete');

const cancelDeletePostModal = document.getElementById('btn-cancel-post-delete');
const cancelDeleteCommentModal = document.getElementById(
    'btn-cancel-comment-delete',
);

deleteCommentBtn.addEventListener('click', () => {
    deleteCommentModal.style.display = 'flex';
});

deletePostBtn.addEventListener('click', () => {
    deletePostModal.style.display = 'flex';
});

cancelDeletePostModal.addEventListener('click', () => {
    deletePostModal.style.display = 'none';
});

cancelDeleteCommentModal.addEventListener('click', () => {
    deleteCommentModal.style.display = 'none';
});
