let autoIncrementPostLikeId = 1;

class PostLike {
    constructor(userId, postId) {
        this.id = autoIncrementPostLikeId++;
        this.userId = userId;
        this.postId = postId;
    }
}

module.exports = PostLike;
