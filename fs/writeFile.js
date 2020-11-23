const fs = require('fs').promises;

const content = '안녕하세요\n반갑습니다';

fs.writeFile('./writeme.txt', content)
    .then(() => {
        return fs.readFile('./writeme.txt');
    })
    .then((data) => {
        console.log(data);
        console.log(data.toString());
    })
    .catch((err) => {
        throw err;
    });
