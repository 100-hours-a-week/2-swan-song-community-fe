// /api/v1/users

import express from 'express';
import 'express-async-errors';
import { userController } from '../controller/userController.js';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import { getLoggedInUser, isLoggedIn } from '../module/authUtils.js';

const userRouter = express.Router();
const upload = multer({ dest: 'public/images/' }); // 이미지 업로드를 위한 multer 설정

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

// 회원정보 수정
userRouter.put('/me', upload.single('profileImage'), async (req, res) => {
    const nickname = req.body.nickname;
    const isProfileImageRemoved = req.body.isProfileImageRemoved === 'true';
    const profileImage = req.file;
    const sessionId = req.cookies.session_id;
    const user = getLoggedInUser(sessionId);

    if (
        (!nickname || nickname === user.nickname) &&
        isProfileImageRemoved === false &&
        !profileImage
    ) {
        return res.status(400).json({
            code: 4000,
            message: '유효하지 않은 요청입니다.',
            data: null,
        });
    }

    try {
        const result = await userController.updateUser(user.id, {
            nickname,
            isProfileImageRemoved,
            profileImage,
        });
        res.status(200).json(result);
    } catch (errorResponse) {
        res.status(200).json(errorResponse);
    }
});

export default userRouter;
