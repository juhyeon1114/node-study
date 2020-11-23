const fs = require('fs');
const zlib = require('zlib');

/**
 * readme3.txt파일을 16바이트씩 읽어서 writeme3.txt에 16바이트씩 씀
 */
const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 });
const writeStream = fs.createWriteStream('./writeme3.txt');
const writeStream2 = fs.createWriteStream('./writeme4.txt.gz');
readStream.pipe(writeStream);

/**
 * readme3.txt파일을 16바이트씩 읽어서 writeme4.txt에 압축해서 16바이트씩 씀
 */
const zlibStream = zlib.createGzip();
readStream.pipe(zlibStream).pipe(writeStream2);