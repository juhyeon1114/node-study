const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');

const app = express();

/**
 * 미들웨어
 */
app.use((req, res, next) => {
    console.log('미들웨어다');
    next();
});
app.use(morgan('dev')); // client의 요청이 log로 찍힘 (dev)
app.use('/', (req, res, next) => { // 미들웨어 확장
    if (req.session.id) {
        express.static(path.join(__dirname, 'public'))(req, res, next); // css, html, img, video와 같은 정적 파일을 보내줌. app.use('요청 경로', express.static(path.join('실제경로')));
    } else {
        next();
    }
});

// app.use(morgan('combined')); // client의 요청이 log로 찍힘 (production)
app.use(cookieParser('cookiesecret')); // 쿠키가 있으면 알아서 파싱해줌. req.cookies = { hello: 'world' }
app.use(express.json()); // json 데이터를 받으면 파싱해서 req.body에 넣어줌
app.use(express.urlencoded({ extended: true })); // formdata를 받으면 파싱해서 req.body에 넣어줌 (extended ? qs모듈사용(recommended) : querystring모듈사용)
app.use(session({
    resave: false, // 요청이 왔을 때 세션에 수정사항이 생기지 않아도 다시 저장할지 여부
    saveUninitialized: false, // 세션에 저장할 내역이 없더라도 세션을 저장할지
    secret: 'cookiesecret',
    cookie: {
        httpOnly: true,
    },
    // name: 'connect.sid', //default
}));
app.use(multer().array());


/**
 * 라우터
 */
app.get('/', (req, res) => {
    /** 쿠키파서 관련 */
    req.cookies // 쿠키들
    req.signedCookies; // 암호화(서명)된 쿠키
    res.cookie('name', encodeURIComponent(name), { // client에 쿠키 전달
        expires: new Date(),
        httpOnly: true,
        path: '/'
    });

    res.clearCookie('name', encodeURIComponent(name), { // client에 설정되어 있는 쿠키 삭제
        httpOnly: true,
        path: '/'
    });

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