let autoIncrementPostLikeId = 1;

export class PostLike {
    constructor(userId, postId) {
        this.likeId = autoIncrementPostLikeId++;
        this.userId = userId;
        this.postId = postId;
    }
}
