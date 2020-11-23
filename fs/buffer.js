const buffer = Buffer.from('저를 버퍼로 바꿔보세요');
console.log(buffer);
console.log(`버퍼 크기 : ${buffer.length}바이트`);

const arr = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')];
console.log(Buffer.concat(arr).toString());

console.log(Buffer.alloc(5));