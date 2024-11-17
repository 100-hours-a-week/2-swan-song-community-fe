const formatDate = date => {
    const pad = num => String(num).padStart(2, '0'); // 한 자리 수는 앞에 0을 붙여 두 자리로 만듦
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} 
            ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

let size = 5;
let lastId = null;
let hasNext = true;

const fetchPosts = async () => {
    const params = new URLSearchParams(); // 쿼리스트링 생성 편의 위한 객체
    if (size) params.append('size', size);
    if (lastId) params.append('lastId', lastId);

    const url = `./api/v1/posts${params.toString() ? '?' + params.toString() : ''}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.code === 2000) {
        console.log(data.data);
        hasNext = data.data.hasNext;
        lastId = data.data.lastId;
        return data.data.content;
    }
    return [];
};

const renderPosts = posts => {
    const postList = document.querySelector('.post-list');

    posts.forEach(post => {
        const profileImageUrl =
            post.profileImageUrl || './images/User_Default_Profile.svg';
        const formattedDate = formatDate(new Date(post.createdDateTime));

        const postItemHTML = `
            <div class="post-item" onclick="location.href='./views/post-detail.html?postId=${post.postId}'">
                <div class="post-summary">
                    <div class="upper-info">
                        <div class="post-title">${post.title}</div>
                    </div>
                    <div class="down-info">
                        <div class="post-reactions">
                            <span class="post-reaction">좋아요 <span>${post.likeCount}</span></span>
                            <span class="post-reaction">댓글 <span>${post.commentCount}</span></span>
                            <span class="post-reaction">조회수 <span>${post.viewCount}</span></span>
                        </div>
                        <div class="post-date">${formattedDate}</div>
                    </div>
                </div>
                <div class="author-info">
                    <img class="profile-image" src="${profileImageUrl}" alt="프로필 이미지">
                    <div class="author-name">${post.authorName}</div>
                </div>
            </div>
        `;

        postList.insertAdjacentHTML('beforeend', postItemHTML);
    });
};

const renderPostList = async () => {
    if (!hasNext) return;

    const posts = await fetchPosts();
    renderPosts(posts);
};

renderPostList();

let renderPostListTimeout = true;
window.addEventListener('scroll', () => {
    if (!renderPostListTimeout) return;
    renderPostListTimeout = false;
    if (
        hasNext &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
    ) {
        renderPostList();
    }
    setTimeout(() => {
        renderPostListTimeout = true;
    }, 100);
});
