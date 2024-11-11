import express from 'express';
import bcrypt from 'bcryptjs';
import userController from '../controller/userController.js';
import multer from 'multer';
import cookieParser from 'cookie-parser'; // 쿠키 파서 모듈 추가
import {
    addSession,
    removeSession,
    getLoggedInUser,
} from '../module/authUtils.js'; // authUtils에서 함수 가져오기

const authRouter = express.Router();
const upload = multer({ dest: 'public/images/' }); // 이미지 업로드를 위한 multer 설정

// URL-encoded 데이터 파싱을 위한 미들웨어 추가
authRouter.use(express.urlencoded({ extended: true }));
// JSON 데이터 파싱을 위한 미들웨어 추가 (필요한 경우)
authRouter.use(express.json());

// 쿠키 파서 미들웨어 추가
authRouter.use(cookieParser());

// 회원가입
authRouter.post('/signup', upload.single('profileImage'), async (req, res) => {
    const { email, password, passwordChecker, nickname } = req.body;
    console.log(email, password, passwordChecker, nickname);
    const profileImage = req.file; // 업로드된 파일

    // 유효성 검사
    if (!email || !password || !passwordChecker || !nickname) {
        return res
            .status(400)
            .json({ code: 4000, message: '유효하지 않은 요청입니다' });
    }

    // 비밀번호가 Base64 인코딩인지 확인
    if (!/^[A-Za-z0-9+/=]+$/.test(password)) {
        return res.status(400).json({
            code: 4000,
            message: '비밀번호는 Base64 인코딩 형식이어야 합니다',
        });
    }

    if (password !== passwordChecker) {
        return res
            .status(400)
            .json({ code: 4000, message: '비밀번호가 일치하지 않습니다' });
    }

    if (nickname.length < 1 || nickname.length > 10) {
        return res.status(400).json({
            code: 4000,
            message: '닉네임은 1자 이상 10자 이하이어야 합니다',
        });
    }

    // 이메일 중복 검사
    const existingUserByEmail = userController.findUserByEmail(email);
    if (existingUserByEmail) {
        return res
            .status(400)
            .json({ code: 4009, message: 'email이 중복되었습니다' });
    }

    // 닉네임 복 검사
    const existingUserByNickname = userController.findUserByNickname(nickname);
    if (existingUserByNickname) {
        return res
            .status(400)
            .json({ code: 4009, message: '닉네임이 중복되었습니다' });
    }

    const newUser = await userController.createUser(
        email,
        password,
        nickname,
        profileImage,
    );
    res.status(201).json({
        code: 2001,
        message: '회원가입 성공',
        data: { userId: newUser.userId },
    });
});

// 닉네임 중복 여부 조회
authRouter.get('/check-nickname', (req, res) => {
    const { nickname } = req.query;

    if (!nickname) {
        return res
            .status(400)
            .json({ code: 4000, message: '유효하지 않은 요청입니다' });
    }

    const isAvailable = userController.checkNicknameAvailability(nickname);
    if (!isAvailable) {
        return res.status(200).json({
            code: 4009,
            message: '닉네임이 중복되었습니다',
            data: { isAvailable: false },
        });
    }

    res.status(200).json({
        code: 2000,
        message: '닉네임이 사용가능합니다',
        data: { isAvailable: true },
    });
});
// 로그인
authRouter.post('/signin', upload.none(), async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ code: 4000, message: '유효하지 않은 요청입니다' });
    }

    // 비밀번호가 Base64 인코딩인지 확인
    if (!/^[A-Za-z0-9+/=]+$/.test(password)) {
        return res.status(400).json({
            code: 4000,
            message: '비밀번호는 Base64 인코딩 형식이어야 합니다',
        });
    }

    const user = userController.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res
            .status(400)
            .json({ code: 4001, message: '인증이 필요합니다' });
    }

    // 기존 세션에 저장된 로그인 기록 제거
    const existingSession = authUtils.isLoggedIn(sessionId);
    if (existingSession && existingSession.userId === user.userId) {
        authUtils.removeSession(sessionId);
    }
    // 로그인 성공 시 세션에 사용자 정보 저장 (비밀번호 제외)
    const sessionId = addSession(user); // authUtils의 addSession 사용
    res.cookie('session_id', sessionId);
    console.log('로그인했닷 ', getLoggedInUser(sessionId));
    res.status(200).json({
        code: 2000,
        message: '로그인 성공',
        data: { userId: user.userId },
    });
});

// 로그아웃
authRouter.post('/logout', (req, res) => {
    const sessionId = req.cookies.session_id;
    if (sessionId) {
        removeSession(sessionId); // authUtils의 removeSession 사용
    } else {
        return res
            .status(401)
            .json({ code: 4001, message: '인증되지 않은 사용자입니다' });
    }
    res.clearCookie('session_id');
    console.log('로그인했낫? ', getLoggedInUser(sessionId));
    res.status(200).json({ code: 2004, message: '로그아웃 성공', data: null });
});

export default authRouter;
