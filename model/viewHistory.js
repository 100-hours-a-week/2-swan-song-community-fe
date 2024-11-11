let autoIncrementViewHistoryId = 1;

class viewHistory {
    constructor(ipAddress, postId) {
        this.id = autoIncrementViewCounterId++;
        this.ipAddress = ipAddress;
        this.postId = postId;
    }
}

module.exports = viewHistory;
