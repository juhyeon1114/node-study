const WebSocket = require('ws');

module.exports = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => { // 웹소켓 연결
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속', ip);

        ws.on('message', (message) => { // 클라이언트로부터 메세지 받음
            console.log(message);
        });
        ws.on('error', (error) => { // 에러
            console.error(error);
        });
        ws.on('close', () => { // 연결 종료
            console.log('클라이언트 접속 해제', ip);
            clearInterval(ws.interval);
        });

        ws.interval = setInterval(() => {
            if (ws.readyState === ws.OPEN) {
                ws.send('서버에서 온 편지');
            }
        }, 3000);
    });
}