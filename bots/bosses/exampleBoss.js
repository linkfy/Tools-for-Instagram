require("../../src/tools-for-instagram.js");


let workerMaxSeconds = 25;
(async () => {
    console.log("Before execution, be sure to be on the root directory and execute this code like this:");
    console.log("node bots/bosses/exampleBoss.js");

    console.log("loading workers");

    //The worker accounts are located on the accounts folder
    //Workers are inside bots/workers
    let worker1 =  executeWorker({
        workerName: 'exampleWorker',
        accountLoginFile: 'exampleAccount',
        timeout: workerMaxSeconds  // Set to Infinity to avoid Timeout
    });
    
    let worker2 =  executeWorker({
        workerName: 'exampleWorker',
        accountLoginFile: 'exampleAccount',
        timeout: workerMaxSeconds  // Set to Infinity to avoid Timeout
    });
    
    Promise.all([worker1, worker2]).then((results) => {
        console.log("All workers done: Result1: " + results[0].username + " Result2: " + results[1].username)
    });
    
    
})();



