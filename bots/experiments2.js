
require('../src/tools-for-instagram.js');

(async () => {

    console.log("\n1 -- LOGIN --\n".bold.underline);
    let ig = await login();

    
    //console.log("\n2 -- Get User Info -- \n".bold.underline);
    let acc = await getUserInfo(ig, "linkfytester");
    console.log(acc);

    let info = fs.readFileSync("./output/linkfytester_followers.json");
    let enc = new TextDecoder("utf-8");
    let decodedInfo = enc.decode(info);
    let followers = JSON.parse(decodedInfo);
    //The last element is EOF, so we can delete it
    followers.pop();
    console.log(followers[followers.length-1]);
    
    let detailedFollowers = [];
    let counter = 10;
    do{
        
        let follower = followers.pop();
        try{
            
            let user_info = await getUserInfo(ig, follower.username);
            //Make a big array of all the info
            detailedFollowers.push(user_info);
            await saveDetailedFollower(ig, user_info, follower.username);
            console.log(followers.length);
            counter --;
            if(counter == 0) {
                await sleep(10);
                counter = 10;
            }
        } catch(err) {
            //back the follower again to the list if it failed
            
            console.log("Iteration Failed to save for "+follower.username);
            console.log("Rewind for: "+follower.username);
            console.log(err);
            followers.push(follower);
            console.log("Waiting 2 minutes before continue".yellow);
            await sleep(60 * 2);
            
        
        }
        
        
    } while(followers.length > 0);
    //Save the super array
    await saveDetailedFollower(ig, detailedFollowers, "detailed_followers");
    console.log("Finished!");

})();


//It is not needed to be async but lets do it for future operations
async function saveDetailedFollower(ig, follower, filename) {
    if(!fs.existsSync("output/detailed_users/")) {
        fs.mkdirSync("output/detailed_users/");
    }
    fs.writeFileSync('output/detailed_users/'+filename+'.json',JSON.stringify(follower, undefined, '\t'));
    console.log(("Posts saved with the name " + filename + ".json in the 'output' folder").green);
}

