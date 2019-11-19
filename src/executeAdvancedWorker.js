var workerFarm = require('worker-farm');    
function executeAdvancedWorker(args={}) {
    
    let {workerName = null, variables = {}, timeout = Infinity} = args;
    
    
    timeout = timeout * 1000;
    let worker = workerFarm.threaded({maxCallTime: timeout},require.resolve(process.env.PWD+'/bots/workers/'+ workerName +'.js'));
    
    return new Promise(function(resolve, reject) {
        worker(variables, function(err, result) {
            workerFarm.end(worker);
            resolve(result);    
        });
    });
    
    
} 

module.exports = executeAdvancedWorker;