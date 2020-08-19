/* require('./src/tools-for-instagram');

(async () => {


    let ig = await login();
    console.log(await getUserInfo(ig, "instagram"));
    setInterval(function() {
        console.log("Waiting random time".green);
    }, 10000);
    
})();
 */


require('./src/tools-for-instagram.js');

let welcomeMessage = [
    'hello',
    'hey',];
var randomText = Math.floor(Math.random()*welcomeMessage.length);
let secondsBetweenChecks = 5;

(async () => {   
    console.log("\n -- Check for new followers --\n".bold.underline);
    let ig = await login();
    //Every 1 minute
    //await sendMessageToNewFollowers(ig);
    do {
        console.log("Iterating.............");
        await sendMessageToNewFollowers(ig);
    } while(true);
    //setInterval(await sendMessageToNewFollowers.bind(null, ig), 1000 * secondsBetweenChecks);
    
    //console.log(commentsResponse.length);
    
})();

async function sendMessageToNewFollowers(ig) { 
    console.log("Regenerating...");
    await ig.realtime.disconnect();
    ig = await regenerateSession(ig);
    
    await sleep(secondsBetweenChecks);
        
    
}
