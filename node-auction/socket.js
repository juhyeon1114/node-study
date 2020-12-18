const SocketIO = require('socket.io');

module.exports = (server, app) => {
    const io = SocketIO(server, { path: '/socket.io' });
    app.set('io', io);
    io.on('connection', (socket) => { // 웹소켓연결시
        const req = socket.request;
        const { headers: { referer } } = req;
        const roomId = referer.split('/')[referer.split('/').length - 1]; // roomId 는 Good테이블의 row id
        socket.join(roomId);
        socket.on('disconnect', () => { // 웹소켓연결이 끊기면 방에서 나가기
            socket.leave(roomId);
        });
    });
}