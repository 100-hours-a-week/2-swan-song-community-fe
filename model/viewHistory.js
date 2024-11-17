let autoIncrementViewHistoryId = 1;

export class ViewHistory {
    constructor(ipAddress, postId) {
        this.id = autoIncrementViewHistoryId++;
        this.ipAddress = ipAddress;
        this.postId = postId;
    }
}
