import { userDao } from '../dao/userDaos.js';

class UserController {
    checkNicknameAvailability(nickname) {
        if (userDao.findUserByNickname(nickname) !== undefined) {
            throw {
                code: 4009,
                message: '닉네임이 중복되었습니다.',
                data: { isAvailable: false },
            };
        }
        return {
            code: 2000,
            message: '사용 가능한 닉네임입니다',
            data: { isAvailable: true },
        };
    }
}

export const userController = new UserController();
