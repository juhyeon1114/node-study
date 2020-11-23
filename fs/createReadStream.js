const fs = require('fs');
const readStream = fs.createReadStream('./readme3.txt', {highWaterMark: 16}); //createReadStream이 한번에 읽는 데이터 크기는 64kb(default) === highWarterMark가 64000

const data = [];
readStream.on('data', (chunk) => {
    data.push(chunk);
    console.log('data: ', chunk, chunk.length);
});
readStream.on('end', () => {
    console.log('end: ', Buffer.concat(data).toString());
});
readStream.on('error', (err) => {
    console.error('error: ', err)
});