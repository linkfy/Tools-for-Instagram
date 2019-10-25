const {threadId} = require('worker_threads')
var cmd=require('node-cmd');
var Promise = require('bluebird');
var spawnSync = require('child_process').spawnSync;



module.exports = function (accountName, callback) {
    (async () => {
        console.log("Trying to run example.py -u " + accountName);
        
        
        //USE stdio 'inherit' when you need to interact with the app
        script = spawnSync('python', [__dirname+ '/instabotScripts/example.py', '-u ' + accountName], { stdio: 'inherit' });
        
        return callback(null, 'Done worker');
        
        
        
    
    })();
}