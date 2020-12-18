const SSE = require('sse');

module.exports = (server) => {
    const sse = new SSE(server);
    sse.on('connection', (client) => {
        setInterval(() => { // 매 초마다 클라이언트에 서버시간 전송
            client.send(Date.now().toString());
        }, 1000);
    });
};