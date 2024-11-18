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
        const userId = sessionStorage.getItem('user_id');

        if (data.author.id === parseInt(userId)) {
            document
                .getElementById('btnPostModify')
                .addEventListener('click', () => {
                    window.location.href = `post-modify.html?postId=${data.postId}`;
                });
        } else {
            document.getElementById('btnPostModify').remove();
        }

        document.querySelector('.post-title').textContent = data.title;

        if (data.imageUrl) {
            document.querySelector('.content img').src = data.imageUrl;
        } else {
            document.querySelector('.content img').remove();
        }
        document.querySelector('.content p').textContent = data.content;

        document.querySelector('.author').textContent = data.author.name;

        const date = new Date(data.createdDateTime);
        document.querySelector('.date').textContent = formatDate(date);

        document.querySelector('.profile-image').src =
            data.author.profileImageUrl;

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
                comment.author.profileImageUrl ||
                '/images/assets/User_Default_Profile.svg';
            const date = new Date(comment.createdDateTime);

            commentEl.innerHTML = `
                <div class="comment-left-info">
                    <div class="metadata">
                        <img class="profile-image" src="${profileImageUrl}" alt="프로필 이미지" />
                        <a class="author">${comment.author.name}</a>
                        <a class="date">${formatDate(date)}</a>
                    </div>
                    <div class="comment-content">
                        <p>${comment.content}</p>
                    </div>
                    `;
            if (comment.author.id === userId) {
                commentEl.innerHTML += `    
                    <div class="comment-right-info">
                        <button onclick="setCommentButtonUpdate(${comment.commentId}, '${comment.content}')">수정</button>
                        <button onclick="deleteComment(${comment.commentId})">삭제</button>
                    </div>
                </div>
                `;
            } else {
                commentEl.innerHTML += `    
                    <div class="comment-right-info"></div>
                </div>
                `;
            }

            commentList.appendChild(commentEl);
        });
    };

    fetchPostDetails();
});
