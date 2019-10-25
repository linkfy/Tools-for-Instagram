require("../../src/tools-for-instagram.js");

const keypress = async () => {
    process.stdin.setRawMode(true)
    return new Promise(resolve => process.stdin.once('data', data => {
      const byteArray = [...data]
      if (byteArray.length > 0 && byteArray[0] === 3) {
        console.log('^C')
        process.exit(1)
      }
      process.stdin.setRawMode(false)
      resolve()
    }))
}


let workerMaxSeconds = 25;
(async () => {
    console.log("Before execution, be sure to be on the root directory and execute this code like this:");
    console.log("node bots/bosses/exampleBoss.js");
    
    console.log("Press Any key to continue or Ctrl+C to exit");
    await keypress();

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



