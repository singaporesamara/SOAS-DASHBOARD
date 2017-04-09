const exec = require('child_process').exec;
exec('npm run start:production:soft', function puts(error, stdout, stderr) { console.log(stdout); });
