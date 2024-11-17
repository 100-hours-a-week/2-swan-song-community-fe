const formatDate = date => {
    const pad = num => String(num).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} 
            ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

document.addEventListener('DOMContentLoaded', () => {
    const fetchPostDetails = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('postId');
        const response = await fetch(`/api/v1/posts/${postId}`);
        const result = await response.json();

        if (result.code === 2000) {
            renderPostDetails(result.data);
        }
    };

    const renderPostDetails = data => {
        document.querySelector('.post-title').textContent = data.title;

        if (data.imageUrl) {
            document.querySelector('.content img').src = data.imageUrl;
        } else {
            document.querySelector('.content img').remove();
        }
        document.querySelector('.content p').textContent = data.content;

        document.querySelector('.author').textContent = data.authorName;

        const date = new Date(data.createdDateTime);
        document.querySelector('.date').textContent = formatDate(date);

        document.querySelector('.profile-image').src = data.profileImageUrl;

        document.getElementById('likeCountText').textContent = data.likeCount;
        document.getElementById('viewCountText').textContent = data.viewCount;
        document.getElementById('commentCountText').textContent =
            data.commentCount;

        const commentList = document.querySelector('.comment-list');
        commentList.innerHTML = '';

        data.comments.forEach(comment => {
            const commentEl = document.createElement('div');
            commentEl.classList.add('comment');

            const profileImageUrl =
                comment.profileImageUrl || '/images/User_Default_Profile.svg';
            const date = new Date(comment.createdDateTime);

            commentEl.innerHTML = `
                <div class="comment-left-info">
                    <div class="metadata">
                        <img class="profile-image" src="${profileImageUrl}" alt="프로필 이미지" />
                        <a class="author">${comment.authorName}</a>
                        <a class="date">${formatDate(date)}</a>
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
        });
    };

    fetchPostDetails();
});
