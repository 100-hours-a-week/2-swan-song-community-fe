const { users } = require('../model/inMemoryDB');
const User = require('../model/user');

class UserDAO {
    static findByEmail(email) {
        return users.find(user => user.email === email);
    }

    static findByNickname(nickname) {
        return users.find(user => user.nickname === nickname);
    }

    static createUser(email, nickname, password, profileImageUrl) {
        const newUser = new User(email, nickname, password, profileImageUrl);
        users.push(newUser);
        return newUser;
    }

    static getAllUsers() {
        return users;
    }
}

module.exports = UserDAO;
