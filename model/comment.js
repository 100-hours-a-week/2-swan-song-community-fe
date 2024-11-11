let autoIncrementCommentId = 1;

class Comment {
    constructor(content, userId, postId) {
        this.id = autoIncrementCommentId++;
        this.content = content;
        this.authorId = userId;
        this.postId = postId;
        this.createdDateTime = new Date();
    }
}

module.exports = Comment;
