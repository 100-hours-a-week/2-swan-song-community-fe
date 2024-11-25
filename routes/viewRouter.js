import express from 'express';
import 'express-async-errors';

import path from 'path';
import { fileURLToPath } from 'url';

import { Router } from 'express';
import cookieParser from 'cookie-parser';

import { checkAuthorization } from '../middlewares/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewRouter = Router();

viewRouter.use(cookieParser());

viewRouter.use((req, res, next) => {
    if (req.path.endsWith('.html')) {
        checkAuthorization(req, res, next);
    } else {
        next();
    }
});

viewRouter.use(express.static(path.join(__dirname, '../public')));

viewRouter.get('/', checkAuthorization, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'index.html'));
});

viewRouter.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'login.html'));
});

viewRouter.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'register.html'));
});

export default viewRouter;
