#!/usr/bin/env node

/**
 * package.json을 만들고 npm i -g 명령어를 실행하면,
 * package.json에 작성된 명령어로 코드가 실행된다.
 */
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const answerCallback = (answer) => {
    if (answer === 'y') {
        console.log('땡큐');
        rl.close();
    } else if (answer === 'n') {
        console.log('글쿤');
        rl.close();
    } else {
        console.clear();
        console.log('y 나 n만 입력하세요');
        rl.question('예제가 재밌나? (y/n)', answerCallback)
    }
}

rl.question('예제가 재밌나? (y/n)', answerCallback);
