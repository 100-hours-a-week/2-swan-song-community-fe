import { users } from '../model/inMemoryDB.js';
import { binarySearch } from '../dao/algorithm.js';

class IUserDao {
    constructor() {
        if (this.constructor === IUserDao) {
            throw new Error("'IUserDAO'는 객체를 생성할 수 없습니다.");
        }
    }

    findById(userId) {
        throw new Error('구현되지 않은 메소드입니다.');
    }

    findByEmail(email) {
        throw new Error('구현되지 않은 메소드입니다.');
    }

    findByNickname(nickname) {
        throw new Error('구현되지 않은 메소드입니다.');
    }

    createUser(user) {
        throw new Error('구현되지 않은 메소드입니다.');
    }
}

class InMemoryUserDao extends IUserDao {
    constructor(users) {
        super();
        this.users = users;
    }

    findById(userId) {
        // TODO: User 의 pk 는 id 가 아닌 userId 라 predicate 를 직접 정의했습니다. 이후에 userId 를 id 로 변경해야 합니다.
        const userIdx = binarySearch(
            this.users,
            userId,
            (user, id) => user.userId === id,
            (user, id) => user.userId < id,
        );

        if (userIdx === -1) {
            throw {
                code: 4004,
                message: '사용자를 찾을 수 없습니다.',
                data: null,
            };
        }

        return this.users[userIdx];
    }

    // NOTE: ID 는 정렬되어있어 binary search 가 유효하지만 email, nickname 은 정렬되어있지 않아 binary search 가 불가능합니다.
    findByEmail(email) {
        const user = this.users.find(user => user.email === email);
        return user;
    }

    findByNickname(nickname) {
        return this.users.some(user => user.nickname === nickname);
    }

    createUser(user) {
        this.users.push(user);
    }
}

export const userDao = new InMemoryUserDao(users);
