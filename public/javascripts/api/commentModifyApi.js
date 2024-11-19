const updatePostComment = async () => {
    const commentInputTextarea = document.getElementById(
        'commentInputFormTextarea',
    );
    const commentId = commentInputTextarea.dataset.commentId;

    const content = commentInputTextarea.value;
    const response = await fetch('/api/v1/posts/comments', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commentId, content }),
    });

    if (response.ok) {
        const responseJson = await response.json();
        if (responseJson.code === 2000) {
            const commentList = document.querySelector('.comment-list');
            const commentEls =
                commentList.querySelectorAll('[data-comment-id]');
            const commentEl = Array.from(commentEls).find(
                el => el.dataset.commentId === commentId,
            );
            commentEl.querySelector('.comment-content p').textContent = content;

            commentInputTextarea.value = '';

            const commentInputFormButton = document.getElementById(
                'commentInputFormButton',
            );
            commentInputFormButton.textContent = '댓글 작성';
            commentInputFormButton.removeEventListener(
                'click',
                updatePostComment,
            );
            commentInputFormButton.addEventListener('click', uploadPostComment);
        }
    }
};
