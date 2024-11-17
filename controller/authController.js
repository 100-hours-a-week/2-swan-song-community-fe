import bcrypt from 'bcryptjs';
import { User } from '../model/user.js';
import { userDao } from '../dao/userDaos.js';
import {
    addSession,
    isLoggedIn,
    removeSession,
    removeSessionByUserId,
} from '../module/authUtils.js';
import { saveImage } from '../module/imageUtils.js';

class AuthController {
    async register(email, password, nickname, profileImage) {
        if (userDao.findByEmail(email)) {
            throw {
                code: 4009,
                message: '이미 가입된 이메일입니다',
                data: null,
            };
        }

        if (userDao.findByNickname(nickname)) {
            throw {
                code: 4009,
                message: '닉네임이 중복되었습니다',
                data: null,
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const profileImageUrl = profileImage
            ? await saveImage(profileImage)
            : null;
        const newUser = new User(
            email,
            nickname,
            hashedPassword,
            profileImageUrl,
        );
        userDao.createUser(newUser);

        return {
            code: 2001,
            message: '회원가입 성공',
            data: { userId: newUser.userId },
        };
    }

    async login(res, cookieSessionId, email, password) {
        // 해당 사용자가 존재하는지, 비밀번호가 일치하는지 확인
        const user = await userDao.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw { code: 4001, message: '인증이 필요합니다.' };
        }

        // 기존 세션에 저장된 로그인 기록 제거
        const existingSession = isLoggedIn(cookieSessionId);
        if (existingSession && existingSession.userId === user.userId) {
            removeSession(cookieSessionId);
        }
        removeSessionByUserId(user.userId);

        const sessionId = addSession(user);
        res.cookie('session_id', sessionId);

        // 로그인 성공 시 세션에 사용자 정보 저장 (비밀번호 제외)
        return {
            code: 2000,
            message: '로그인 성공',
            data: { userId: user.userId },
        };
    }

    async logout(res, sessionId) {
        removeSession(sessionId);
        res.clearCookie('session_id');
        res.status(204).json({ code: 2000, message: '로그아웃 성공' });
    }
}

export const authController = new AuthController();