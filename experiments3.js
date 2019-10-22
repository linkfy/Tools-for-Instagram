require("./src/tools-for-instagram.js");

var workerFarm = require('worker-farm');

let workerMaxSeconds = 25;
(async () => {
    
    
    let ig = await login(loadConfig('linkfytester'));
    console.log(ig);
    //TODO send parameters to worker about file to execute, and login account
    await executeWorker('test', 'linkfytester', workerMaxSeconds); // Set to Infinity to avoid Timeout
    await executeWorker({
        workerName: 'test',
        accountLoginFile: 'linkfytester',
        timeout: workerMaxSeconds
    });

})();



async function executeWorker(args={}) {
    
    let {workerName = null, accountLoginFile = null, timeout = Infinity} = args;
    
    timeout = timeout * 1000;
    let worker = workerFarm.threaded({maxCallTime: timeout},require.resolve('./workers/'+ workerName +'.js'));
    
    await worker(accountConfigName, true, function(err, result) {
        workerFarm.end(worker);
    });
    
    
    workerFarm.end(worker);
    
    /*  {
        if(err) {

            console.log(err);

        } else {

            console.log(result);
            workerFarm.end(worker);
        }
    }); */
} 

