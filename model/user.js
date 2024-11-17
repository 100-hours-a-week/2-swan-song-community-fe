let autoIncrementUserId = 1;

export class User {
    constructor(email, nickname, password, profileImageUrl) {
        this.userId = autoIncrementUserId++;
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.profileImageUrl = profileImageUrl;
        this.createdDateTime = new Date();
    }
}