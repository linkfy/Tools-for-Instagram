require('../src/tools-for-instagram.js');

let welcomeMessage = 'Thanks for the follow 😃 see more at: http://www.linkfy.xyz';
let secondsBetweenChecks = 60;

(async () => {

    
    console.log("\n -- Check for new followers --\n".bold.underline);
    let ig = await login();
    
    //Every 1 minute
    await sendMessageToNewFollowers(ig);
    setInterval(await sendMessageToNewFollowers.bind(null, ig), 1000 * secondsBetweenChecks);
    
    //console.log(commentsResponse.length);
    
})();

async function sendMessageToNewFollowers(ig) {
    
    console.log("Sending Welcome Messages...");
    let followers = await getMyLastFollowers(ig);
    //console.log(followers[0]);
    if(followers!=undefined || followers != null) {
        
        for(let i = 0; i < followers.length; i++) {
            let follower = followers[i];
            
            if(follower.is_new_follower) {
                await replyDirectMessage(ig, {userId: follower.pk}, welcomeMessage);
                console.log("Message sent to " + (follower.username).cyan);
                await sleep(1);
            }
        }
            
      
    }
    console.log("Finished sending new Welcome Messages, waiting "+secondsBetweenChecks+" seconds");

    
}