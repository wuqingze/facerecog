var exec = require('child_process').exec;
var arg1 = 'hello'
var arg2 = 'jzhou'
exec('python detect_faces.py',function(error,stdout,stderr){
    if(stdout.length >1){
        console.log(stdout);
    } else {
        console.log('you don\'t offer args');
    }
    if(error) {
        console.info('stderr : '+stderr);
    }
});