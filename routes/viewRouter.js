import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Router } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewRouter = Router();

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