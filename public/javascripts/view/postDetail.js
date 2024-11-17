// 공통 함수
const toggleModal = (modal, isOpen) => {
    modalBackground.style.display = isOpen ? 'block' : 'none';
    modal.style.display = isOpen ? 'flex' : 'none';
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
};

// 요소 참조
const deletePostBtn = document.getElementById('btnPostDelete');
const deleteCommentBtn = document.getElementById('btnCommentDelete');

const modals = {
    post: document.getElementById('modalPostDelete'),
    comment: document.getElementById('modalCommentDelete'),
};

const cancelBtns = {
    post: document.getElementById('btnCancelPostDelete'),
    comment: document.getElementById('btnCancelCommentDelete'),
};

const modalBackground = document.getElementById('modalBackground');

// 이벤트 리스너
deletePostBtn.addEventListener('click', () => toggleModal(modals.post, true));
deleteCommentBtn.addEventListener('click', () =>
    toggleModal(modals.comment, true),
);

cancelBtns.post.addEventListener('click', () =>
    toggleModal(modals.post, false),
);
cancelBtns.comment.addEventListener('click', () =>
    toggleModal(modals.comment, false),
);

modalBackground.addEventListener('click', () => {
    toggleModal(modals.post, false);
    toggleModal(modals.comment, false);
});
