const postList = document.querySelector('.post-list');

const fetchPosts = async () => {
    const res = await fetch('./data/posts.json');
    const boards = await res.json();
    return boards;
};

const renderPostList = async () => {
    const posts = await fetchPosts();
    postList.innerHTML = '';

    posts.forEach(post => {
        const postItem = document.createElement('div');
        postItem.className = 'post-item';
        postItem.onclick = () => {
            location.href = `./views/post-detail.html?postId=${post.id}`;
        };

        const postSummary = document.createElement('div');
        postSummary.className = 'post-summary';

        const upperInfo = document.createElement('div');
        upperInfo.className = 'upper-info';

        const postTitle = document.createElement('div');
        postTitle.className = 'post-title';
        postTitle.textContent = post.title;

        upperInfo.appendChild(postTitle);
        postSummary.appendChild(upperInfo);

        const downInfo = document.createElement('div');
        downInfo.className = 'down-info';

        const postReactions = document.createElement('div');
        postReactions.className = 'post-reactions';

        const likeCount = document.createElement('span');
        likeCount.className = 'post-reaction';
        likeCount.innerHTML = `좋아요 <span>${post.likesCount}</span>`;
        postReactions.appendChild(likeCount);

        const commentCount = document.createElement('span');
        commentCount.className = 'post-reaction';
        commentCount.innerHTML = `댓글 <span>${post.commentsCount}</span>`;
        postReactions.appendChild(commentCount);

        const viewCount = document.createElement('span');
        viewCount.className = 'post-reaction';
        viewCount.innerHTML = `조회수 <span>${post.viewsCount}</span>`;
        postReactions.appendChild(viewCount);

        downInfo.appendChild(postReactions);

        const postCreatedDateTime = document.createElement('div');
        postCreatedDateTime.className = 'post-date';
        postCreatedDateTime.textContent = new Date(
            post.createdAt,
        ).toLocaleString();

        downInfo.appendChild(postCreatedDateTime);

        postSummary.appendChild(downInfo);
        postItem.appendChild(postSummary);

        const authorInfo = document.createElement('div');
        authorInfo.className = 'author-info';

        const profileImage = document.createElement('img');
        profileImage.className = 'profile-image';
        profileImage.src = post.profileImage;
        profileImage.alt = '프로필 이미지';

        const authorName = document.createElement('div');
        authorName.className = 'author-name';
        authorName.textContent = post.authorName;

        authorInfo.appendChild(profileImage);
        authorInfo.appendChild(authorName);
        postItem.appendChild(authorInfo);

        postList.appendChild(postItem);
    });
};

renderPostList();
