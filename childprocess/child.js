const exec = require('child_process').exec;
const process = exec('dir');

process.stdout.on('data', function(data){
    console.log(data.toString());
});