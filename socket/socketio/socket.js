const SocketIO = require('socket.io');

module.exports = (server) => {
    const io = SocketIO(server, { path: '/socket.io' });

    io.on('connection', (socket) => { // 웹소켓 연결
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속', ip, socket.id);

        socket.on('reply', (message) => { // 클라이언트로부터 메세지 받음
            console.log(message);
        });
        socket.on('error', (error) => { // 에러
            console.error(error);
        });
        socket.on('disconnect', () => { // 연결 종료
            console.log('클라이언트 접속 해제', ip, socket.id);
            clearInterval(socket.interval);
        });

        socket.interval = setInterval(() => {
            socket.emit('news', 'hello socket.io')
        }, 3000);
    });
}