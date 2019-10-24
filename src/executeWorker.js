var workerFarm = require('worker-farm');    
function executeWorker(args={}) {
    
    let {workerName = null, accountLoginFile = null, timeout = Infinity} = args;
    
    
    timeout = timeout * 1000;
    let worker = workerFarm.threaded({maxCallTime: timeout},require.resolve(process.env.PWD+'/bots/workers/'+ workerName +'.js'));
    
    return new Promise(function(resolve, reject) {
        worker(accountLoginFile, function(err, result) {
            workerFarm.end(worker);
            resolve(result);    
        });
    });
    
    
} 

module.exports = executeWorker;