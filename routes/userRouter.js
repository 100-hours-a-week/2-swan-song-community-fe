// /api/v1/user

import express from 'express';
import 'express-async-errors';
import { userController } from '../controller/userController.js';
import cookieParser from 'cookie-parser';
import { getLoggedInUser, isLoggedIn } from '../module/authUtils.js';

const userRouter = express.Router();

// URL-encoded 데이터 파싱을 위한 미들웨어 추가
userRouter.use(express.urlencoded({ extended: true }));
// JSON 데이터 파싱을 위한 미들웨어 추가 (필요한 경우)
userRouter.use(express.json());
// 쿠키 파서 미들웨어 추가
userRouter.use(cookieParser());

// 인가 미들웨어 정의
const checkAuthorization = (req, res, next) => {
    const sessionId = req.cookies.session_id;

    if (!isLoggedIn(sessionId)) {
        return res.status(401).json({
            code: 4001,
            message: '인증 정보가 필요합니다.',
            data: null,
        });
    }
    next(); // 인증된 경우 다음 미들웨어 또는 라우트로 진행
};

// 모든 라우트에 인가 미들웨어 적용
userRouter.use(checkAuthorization);

// 회원가입
userRouter.get('/me', async (req, res) => {
    const sessionId = req.cookies.session_id;
    const user = getLoggedInUser(sessionId);

    try {
        const result = userController.findUserInfo(user.id);

        res.status(200).json(result);
    } catch (errorResponse) {
        res.status(200).json(errorResponse);
    }
});

export default userRouter;
