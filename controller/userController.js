import { userDao } from '../dao/userDaos.js';

class UserController {
    constructor(userDao) {
        this.userDao = userDao;
    }

    findUserInfo(userId) {
        try {
            const user = this.userDao.findById(userId);

            const data = {
                userId: user.id,
                email: user.email,
                nickname: user.nickname,
                profileImageUrl: user.profileImageUrl,
                createdDateTime: user.createdDateTime,
            };

            return {
                code: 2000,
                message: '사용자 정보 조회 성공',
                data: data,
            };
        } catch (errorResponse) {
            throw errorResponse;
        }
    }
}

export const userController = new UserController(userDao);
