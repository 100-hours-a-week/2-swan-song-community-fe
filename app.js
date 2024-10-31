import express from 'express';
import viewRouter from './routes/viewRouter.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use(viewRouter);

app.listen(port, () => {
    console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
});
