import express from 'express';
import viewRouter from './routes/viewRouter.js';
import bodyParser from 'body-parser';
import authRouter from './routes/authRouter.js';
import postRouter from './routes/postRouter.js';

const app = express();

const port = 3000;

app.use(express.json());
app.use(bodyParser.json());

app.use(viewRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postRouter);

app.listen(port, () => {
    console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
});
