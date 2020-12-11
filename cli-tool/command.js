#!/usr/bin/env node

const { program } = require('commander');
const { version } = require('./package.json');
const chalk = require('chalk');
const inquirer = require('inquirer');

program
    .version(version, '-v, --version')
    .name('cli');

program
    .command('template <type>') // cli template html
    .usage('<type> --filename [filename] --path [path]') // 꺽쇠는 필수, 대괄호는 선택
    .description('템플릿을 생성합니다.')
    .alias('tmpl') // cli tmpl html 로 줄여서 쓸 수 있다.
    .option('-f, --filename [filename]', '파일명을 입력하세요', 'index')  // index는 기본값
    .option('-d, --directory [path]', '생성 경로를 입력하세요', '.')
    .action((type, options) => {
        console.log(chalk.green(type, options.filename, options.directory));
        // 뭔가 하면 됨
    });

// program // 등록하지 않은 명령어를 입력한 경우
//     .command('*', { noHelp: true })
//     .action(() => {
//         console.error(chalk.bold.blue.bgRed('그런 명령어 없음'));
//     })

program.action((cmd, args) => { // cli || cli 틀린 명령어
    if (args) {
        console.error(chalk.bold.red('그런 명령어 없음'));
        program.help();
    } else {
        inquirer.prompt([
            { 
                name: 'type',
                message: '템플릿 종류를 입력하세요.',
                type: 'list',
                choices: ['html', 'express-router']
            },
            { 
                name: 'name',
                message: '파일 이름을 입력하세요',
                type: 'input',
                default: 'index'
            },
            { 
                name: 'directory',
                message: '파일의 경로를 입력하세요',
                type: 'input',
                default: '.'
            },
            { 
                name: 'confirm',
                type: 'confirm',
                message: '생성하시겠습니까?'
            }
        ]).then((answers) => {
            if (answers.confirm) {
                console.log(chalk.green('템플릿 생성'));
            } else {
                console.log(chalk.red('취소'));
            }
        })
    }
});

program.parse(process.argv);