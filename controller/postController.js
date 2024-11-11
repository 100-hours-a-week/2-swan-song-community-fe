const inMemoryDB = require('../controller/inMemoryDB');

const findDetailPostInfo = postId => {
    const post = inMemoryDB.find(p => p.id === postId);
    if (
        inMemoryDB.viewHistories.find(
            v => v.postId === postId && v.ipAddress === req.ip,
        ) === undefined
    ) {
        inMemoryDB.viewHistories.push(new viewHistories(req.ip, postId)); // dao 분리하자
    }

    const author = inMemoryDB.find(u => u.id === post.authorId);

    const likeCount = inMemoryDB.likes.filter(l => l.postId === postId).length;
    const viewCount = inMemoryDB.viewHistories.filter(
        v => v.postId === postId,
    ).length;

    const comments = inMemoryDB.comments.filter(c => c.postId === postId);

    return {
        postId: post.id,
        title: post.title,
        content: post.content,
        imageUrl: post.imageUrl,
        author: author,
        likeCount: likeCount,
        viewCount: viewCount,
        commentCount: comments.length,
        createdDateTime: post.createdDateTime,
        comments: comments.map(c => ({
            commentId: c.commentId,
            postId: c.postId,
            content: c.content,
            createdDateTime: c.createdDateTime,
            authorName: inMemoryDB.users.find(u => u.id === c.userId).nickname,
            profileImageUrl: inMemoryDB.users.find(u => u.id === c.userId)
                .profileImageUrl,
        })),
    };
};

const findAllSummaryPostInfo = () => {
    return inMemoryDB.map(p => ({
        id: p.id,
        title: p.title,
        content: p.content,
        likes: p.likes,
        comments: inMemoryDB.comments.filter(c => c.postId === p.id).length,
    }));
};

const createPost = newPost => {
    inMemoryDB.posts.push(newPost);
};

const updatePost = (postId, newPostInfo) => {
    const postIndex = inMemoryDB.findIndex(p => p.id === postId);
    inMemoryDB[postIndex] = { ...inMemoryDB[postIndex], ...newPostInfo };
};

const deletePostCascade = postId => {
    const postIndex = inMemoryDB.findIndex(p => p.id === postId);
    inMemoryDB.splice(postIndex, 1);
    inMemoryDB.viewHistories = inMemoryDB.viewHistories.filter(
        v => v.postId !== postId,
    );
};

const createPostLike = postId => {
    const postIndex = inMemoryDB.findIndex(p => p.id === postId);
    inMemoryDB[postIndex].likes++;
};

module.exports = { findPost, createPost, updatePost, deletePostCascade };
