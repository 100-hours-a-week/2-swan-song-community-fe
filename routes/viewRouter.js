import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Router } from 'express';
import { isLoggedIn } from '../module/authUtils.js';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewRouter = Router();

viewRouter.use(cookieParser());

// 인가 미들웨어 정의
const checkAuthorization = (req, res, next) => {
    const sessionId = req.cookies.session_id;
    // 로그인 및 등록 페이지는 허용
    if (req.path === '/login' || req.path === '/register') {
        return next(); // 다음 미들웨어 또는 라우트로 진행
    }
    // HTML 요청에 대해서만 인증 확인
    if (
        (req.path === '/' || req.path.endsWith('.html')) &&
        !isLoggedIn(sessionId)
    ) {
        return res.redirect('/login'); // 인증되지 않은 경우 로그인 페이지로 리다이렉트
    }
    next(); // 인증된 경우 다음 미들웨어 또는 라우트로 진행
};

// 모든 라우트에 인가 미들웨어 적용
viewRouter.use(checkAuthorization);

viewRouter.use(express.static(path.join(__dirname, '../public')));

viewRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'index.html'));
});

viewRouter.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'login.html'));
});

viewRouter.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'register.html'));
});

export default viewRouter;
