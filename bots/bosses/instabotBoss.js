require("../../src/tools-for-instagram.js");
const spawn = require('child_process').spawn;
var cmd=require('node-cmd');
var Promise = require('bluebird');
const getAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd })


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
    
    
    /* console.log("loading workers");

    Promise.all([worker1, worker2]).then((results) => {
        console.log("All workers done: Result1: " + results[0].username + " Result2: " + results[1].username)
    }); */

    console.log("Before execution, be sure to be on the root directory and execute this code like this:");
    console.log("node bots/bosses/instabotBoss.js");
    console.log("Also you will need 'pip' utility to install the required stuff for instabot");
    console.log("Press Any key to continue or Ctrl+C to exit");


    await keypress();

    console.log("Trying to find instabotWorker inside bots/workers directory".cyan);


    await getAsync(`
        cd bots/workers
        cat instabotWorker.js
        `,).then(data=> {console.log('Found')}).catch((err=>{
            console.log('error: ', err);
            process.exit();
        }));

    //instabotScripts
    console.log("Trying to find example inside bots/workers/instabotSctipts/ directory".cyan);


    await getAsync(`
        cd bots/workers/instabotScripts
        cat example.py
        `,).then(data=> {console.log('Found')}).catch((err=>{
            console.log('error: ', err);
            process.exit();
        }));

    console.log("Trying to Install instabot requirements...".cyan);
     await getAsync(`
        cd bots/workers
        pip install -U instabot
        `,).then(data=> {console.log('Done')}).catch((err=>{
            console.log('error: ', err);
            process.exit();
        }));
        console.log("Changing the PWD to match the python folder".cyan)
        process.chdir('./bots/workers/instabotScripts')
        //console.log(process.chdir);
        console.log("Trying to load the worker".cyan);
        let worker1 = await executeWorker({
            workerName: 'instabotWorker',
            accountLoginFile: 'linkfytester', //set here the account username you want to use on instabot
            timeout: Infinity  // Set to Infinity to avoid Timeout
        });
        let worker2 = await executeWorker({
            workerName: 'instabotWorker',
            accountLoginFile: 'linkfytester', //set here the account username you want to use on instabot
            timeout: Infinity  // Set to Infinity to avoid Timeout
        });

        Promise.all([worker1, worker2]).then((results) => {
            console.log("All workers done".green);
            process.exit();
        });
    
})();
