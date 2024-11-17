const uploadPostComment = async () => {
    const postId = new URLSearchParams(location.search).get('postId');
    const content = document.getElementById('commentInputFormTextarea').value;
    const response = await fetch('/api/v1/posts/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, content }),
    });
    const responseJson = await response.json();

    if (responseJson.code === 2001) {
        createComment(responseJson.data.comment);
    }
};

const createComment = async comment => {
    const commentList = document.querySelector('.comment-list');

    const commentEl = document.createElement('div');
    commentEl.classList.add('comment');

    const profileImageUrl = comment.profileImageUrl
        ? comment.profileImageUrl
        : '/images/User_Default_Profile.svg';

    const date = new Date(comment.createdDateTime);
    const formattedDate = formatDate(date);

    commentEl.innerHTML = `
        <div class="comment-left-info">
            <div class="metadata">
                <img class="profile-image" src="${profileImageUrl}" alt="프로필 이미지" />
                <a class="author">${comment.authorName}</a>
                <a class="date">${formattedDate}</a>
            </div>
            <div class="comment-content">
                <p>${comment.content}</p>
            </div>
        </div>
        <div class="comment-right-info">
            <button onclick="setCommentButtonUpdate(${comment.commentId}, '${comment.content}')">수정</button>
            <button onclick="deleteComment(${comment.commentId})">삭제</button>
        </div>
    `;

    commentList.appendChild(commentEl);
};