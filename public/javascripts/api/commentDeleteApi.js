const deletePostComment = async () => {
    const modalCommentDelete = document.getElementById('modalCommentDelete');
    const commentId = modalCommentDelete.dataset.commentId;

    const response = await fetch('/api/v1/posts/comments', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commentId }),
    });

    if (response.status === 204) {
        const commentList = document.querySelector('.comment-list');
        const commentEls = commentList.querySelectorAll('[data-comment-id]');
        const commentEl = Array.from(commentEls).find(
            el => el.dataset.commentId === commentId,
        );
        commentEl.remove();

        const commentCountText = document.getElementById('commentCountText');
        commentCountText.textContent =
            parseInt(commentCountText.textContent) - 1;

        modalCommentDelete.dataset.commentId = '';

        toggleModal(modalCommentDelete, false);
    }
};

document
    .getElementById('btnCommentDeleteConfirm')
    .addEventListener('click', () => {
        deletePostComment();
    });
