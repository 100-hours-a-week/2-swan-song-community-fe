// board -> post 수정 (오해소지있음))
const boardList = document.querySelector('.board-list');

const getPosts = async () => {
    const res = await fetch('./data/posts.json');
    const boards = await res.json();
    return boards;
};

const renderBoards = async () => {
    const boards = await getPosts();
    boardList.innerHTML = '';

    boards.forEach(board => {
        const boardItem = document.createElement('div');
        boardItem.className = 'board-item';
        boardItem.onclick = () => {
            location.href = `./views/post-detail/${board.id}`;
        };

        const postSummary = document.createElement('div');
        postSummary.className = 'post-summary';

        const upperInfo = document.createElement('div');
        upperInfo.className = 'upper-info';

        const postTitle = document.createElement('div');
        postTitle.className = 'post-title';
        postTitle.textContent = board.title;

        upperInfo.appendChild(postTitle);
        postSummary.appendChild(upperInfo);

        const downInfo = document.createElement('div');
        downInfo.className = 'down-info';

        const postReactions = document.createElement('div');
        postReactions.className = 'post-reactions';

        const likes = document.createElement('span');
        likes.className = 'post-reaction';
        likes.innerHTML = `좋아요 <span>${board.likesCount}</span>`;
        postReactions.appendChild(likes);

        const comments = document.createElement('span');
        comments.className = 'post-reaction';
        comments.innerHTML = `댓글 <span>${board.commentsCount}</span>`;
        postReactions.appendChild(comments);

        const views = document.createElement('span');
        views.className = 'post-reaction';
        views.innerHTML = `조회수 <span>${board.viewsCount}</span>`;
        postReactions.appendChild(views);

        downInfo.appendChild(postReactions);

        const postDate = document.createElement('div');
        postDate.className = 'post-date';
        postDate.textContent = new Date(board.createdAt).toLocaleString();
        downInfo.appendChild(postDate);

        postSummary.appendChild(downInfo);
        boardItem.appendChild(postSummary);

        const authorInfo = document.createElement('div');
        authorInfo.className = 'author-info';

        const profileImage = document.createElement('img');
        profileImage.className = 'profile-image';
        profileImage.src = board.profileImage;
        profileImage.alt = '프로필 이미지';

        const authorName = document.createElement('div');
        authorName.className = 'author-name';
        authorName.textContent = board.authorName;

        authorInfo.appendChild(profileImage);
        authorInfo.appendChild(authorName);
        boardItem.appendChild(authorInfo);

        boardList.appendChild(boardItem);
    });
};

renderBoards();
