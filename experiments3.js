require("./src/tools-for-instagram.js");





(async () => {
    
    
    await login();
    await login();
    await login();
    await login();
    await login();
    await login();
    await login();
    //await executeWorker(ig, 'test', timeout= 1000);

    

    
})();


async function executeWorker(ig, workerName, timeout = Infinity) {

    var workerFarm = require('worker-farm');

    let worker = workerFarm({maxCallTime: timeout},require.resolve('./workers/'+ workerName +'.js'));

    worker(function (err, result) {
        if(err) {

            console.log(err);

        } else {

            console.log(result);
            workerFarm.end(worker);
        }
    });
}

