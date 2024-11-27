document.addEventListener('DOMContentLoaded', () => {
    const fetchPostDetails = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('postId');
        const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const result = await response.json();

        if (result.code === 2000) {
            renderPostDetails(result.data);
        }
    };

    const renderPostDetails = data => {
        const userId = parseInt(sessionStorage.getItem('user_id'));

        if (data.author.id === userId) {
            document
                .getElementById('btnPostModify')
                .addEventListener('click', () => {
                    window.location.href = `post-modify.html?postId=${data.postId}`;
                });
        } else {
            document.getElementById('btnPostModify').remove();
            document.getElementById('btnPostDelete').remove();
        }

        document.querySelector('.post-title').textContent = data.title;

        if (data.imageUrl) {
            document.querySelector('.content img').src =
                `${IMAGE_BASE_URL}${data.imageUrl}`;
        } else {
            document.querySelector('.content img').remove();
        }
        document.querySelector('.content p').textContent = data.content;

        document.querySelector('.author').textContent = data.author.name;

        document.querySelector('.date').textContent = data.createdDateTime;

        document.getElementById('profileImage').src =
            data.author.profileImageUrl !== null
                ? `${IMAGE_BASE_URL}/${data.author.profileImageUrl}`
                : '/images/assets/User_Default_Profile.svg';

        if (data.isLiked) {
            document
                .getElementById('likeBtn')
                .classList.add('post-liked-active');
        } else {
            document
                .getElementById('likeBtn')
                .classList.remove('post-liked-active');
        }

        document.getElementById('likeCountText').textContent = data.likeCount;
        document.getElementById('viewCountText').textContent = data.viewCount;
        document.getElementById('commentCountText').textContent =
            data.commentCount;

        const commentList = document.querySelector('.comment-list');
        commentList.innerHTML = '';

        data.comments.forEach(comment => {
            const commentEl = document.createElement('div');
            commentEl.classList.add('comment');
            commentEl.dataset.commentId = comment.commentId;

            const profileImageUrl =
                comment.author.profileImageUrl !== null
                    ? `${IMAGE_BASE_URL}${comment.author.profileImageUrl}`
                    : '/images/assets/User_Default_Profile.svg';

            commentEl.innerHTML = `
                <div class="comment-left-info">
                    <div class="metadata">
                        <img class="profile-image" src="${profileImageUrl}" alt="프로필 이미지" />
                        <a class="author">${comment.author.name}</a>
                        <a class="date">${comment.createdDateTime}</a>
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

const deleteComment = commentId => {
    const modal = document.getElementById('modalCommentDelete');
    toggleModal(modal, true);
    modal.dataset.commentId = commentId;
};
