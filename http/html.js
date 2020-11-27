const http = require('http');
const fs = require('fs').promises;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node</h1>');
    res.write('<p>Hello Server</p>');
    res.end('<p>Bye</p>');
}).listen(8080, () => {
    console.log('8080포트에서 서버 대기중')
});
server.on('error', (error) => {
    console.error(error);
});
// server.on('listening', () => {
//     console.log('8080포트에서 서버 대기중ㅋ')
// });


const server2 = http.createServer( async (req, res) => {
    try {
        const data = await fs.readFile('./server.html');
        res.end(data);
    } catch (error) {
        console.error(error);
        res.writeHead(200, { 'Content-Type' : 'text/plain; charset=utf-8' });
        res.end(err.message);
    }
}).listen(8081, () => {
    console.log('8081포트에서 서버 대기중')
});
server2.on('error', (error) => {
    console.error(error);
});