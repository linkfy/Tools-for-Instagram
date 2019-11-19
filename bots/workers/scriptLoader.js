const {threadId} = require('worker_threads')
global.noLogo=true;
require("../../src/tools-for-instagram.js");
let fs = require("fs");
//process.env.PWD+'/bots/workers/'+ workerName +'.js'
module.exports = function (variables, callback) {
    (async () => {
        
        let file = fs.readFileSync(process.env.PWD+'/bots/'+ variables.scriptName +'.js').toString();
        //Remove duplicate line from imported file before execution
        file = file.replace(/.*tools-for-instagram.js.*\n/, '');
        console.log("Loading script, use Ctl+C to exit the subroutine".cyan);
        await eval(file);
        let info = 'done';
        return callback(null, info);
    })();
}