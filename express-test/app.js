const express = require('express');
const path = require('path');

const app = express();

/**
 * 미들웨어
 */
app.use((req, res, next) => {
    console.log('미들웨어다');
    next();
});

/**
 * 라우터
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/error', (req, res) => {
    next();
}, (req, res, next) => {
    try {
        throw new Error('에러당');
    } catch (err) {
        next(err); // next에 매개변수가 있으면 error 미들웨어로 이동
    }
});

/**
 * 에러 미들웨어
 */
app.use((err, req, res, next) => {
    console.error('에러미들웨어 ㅋ : ', err);
    res.status(200).send('에러났다');
});

/**
 * 서버 실행
 */
app.listen(3000, () => {
    console.log('express running');
});