let autoIncrementCommentId = 1;

export class Comment {
    constructor(content, userId, postId) {
        this.commentId = autoIncrementCommentId++;
        this.content = content;
        this.authorId = userId;
        this.postId = postId;
        this.createdDateTime = new Date();
    }
}
