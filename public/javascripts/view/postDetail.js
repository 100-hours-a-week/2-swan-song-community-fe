const deletePostBtn = document.getElementById('btnPostDelete');
const deleteCommentBtn = document.getElementById('btnCommentDelete');

const deletePostModal = document.getElementById('modalPostDelete');
const deleteCommentModal = document.getElementById('modalCommentDelete');

const cancelDeletePostModal = document.getElementById('btnCancelPostDelete');
const cancelDeleteCommentModal = document.getElementById(
    'btnCancelCommentDelete',
);

const modalBackground = document.getElementById('modalBackground');

deleteCommentBtn.addEventListener('click', () => {
    modalBackground.style.display = 'block';
    deleteCommentModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

deletePostBtn.addEventListener('click', () => {
    modalBackground.style.display = 'block';
    deletePostModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

cancelDeletePostModal.addEventListener('click', () => {
    modalBackground.style.display = 'none';
    deletePostModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

cancelDeleteCommentModal.addEventListener('click', () => {
    modalBackground.style.display = 'none';
    deleteCommentModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// 모달 외부 클릭 시 모달 닫기
modalBackground.addEventListener('click', () => {
    modalBackground.style.display = 'none';
    deletePostModal.style.display = 'none';
    deleteCommentModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

document.addEventListener('DOMContentLoaded', function () {
    setCommentButtonUpload();
});

const setCommentButtonUpload = () => {
    const commentInputFormButton = document.getElementById(
        'commentInputFormButton',
    );
    const commentInputFormTextarea = document.getElementById(
        'commentInputFormTextarea',
    );

    commentInputFormTextarea.value = '';
    commentInputFormButton.innerText = '댓글 등록';

    const handleUploadComment = () => {
        commentInputFormButton.removeEventListener(
            'click',
            handleUploadComment,
        );
        if (commentInputFormTextarea.value.trim() === '') {
            alert('댓글을 입력해주세요.');
            return;
        }

        uploadComment();
    };

    commentInputFormButton.addEventListener('click', handleUploadComment);
};

const uploadComment = () => {
    fetch(window.location.pathname + '/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            commentContent: commentInputFormTextarea.value,
        }),
    })
        .then(res => {
            if (res.status === 201) {
                window.location.reload();
            } else {
                alert('댓글 작성에 실패했습니다.');
            }
        })
        .catch(err => {
            console.error('댓글 작성 중 에러 발생:', err);
        });
};

const setCommentButtonUpdate = (commentId, currentText) => {
    const commentInputFormTextarea = document.getElementById(
        'commentInputFormTextarea',
    );
    commentInputFormTextarea.value = currentText;

    const commentInputFormButton = document.getElementById(
        'commentInputFormButton',
    );
    commentInputFormButton.innerText = '댓글 수정';

    const handleUpdateComment = () => {
        commentInputFormButton.removeEventListener(
            'click',
            handleUpdateComment,
        );
        if (commentInputFormTextarea.value.trim() === '') {
            alert('댓글을 입력해주세요.');
            return;
        }

        updateComment(commentId);
        setCommentButtonUpload();
    };

    commentInputFormButton.addEventListener('click', handleUpdateComment);
};

const updateComment = commentId => {
    fetch(window.location.pathname + '/comment/' + commentId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            commentContent: commentInputFormTextarea.value,
        }),
    })
        .then(res => {
            if (res.status === 200) {
                window.location.reload();
            } else {
                alert('댓글 수정에 실패했습니다.');
            }
        })
        .catch(err => {
            console.error('댓글 수정 중 에러 발생:', err);
        });
};
