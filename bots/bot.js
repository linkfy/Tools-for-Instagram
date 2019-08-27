
require('../src/tools-for-instagram.js');

(async () => {
    //WARNING --- THIS BOT IS CURRENTLY an idea in progress
    

    

    //Experimental Stuff going on for scapping

// ----------------------
/*  let info = fs.readFileSync("./output/instagram_followers.json");
    let enc = new TextDecoder("utf-8");
    let decodedInfo = enc.decode(info);
    let followers = JSON.parse(decodedInfo);
    //The last element is EOF, so we can delete it
    followers.pop();
    console.log(followers[followers.length-1]); */
// ----------------------
    

    
    //Let's try to make a simple bot
    //The bot will: 
    // - follow 80 users per day
    // - give 100 likes per day
    // we need to carry the follows / likes / unfollows / timers of the action
    // for this purpose we need first to define a database with node-json-db

    let ig = await login();
    console.log(await isTimeInRange("13:00","1:29"));
    
    //1. What time is it? Is it too late? Is it to early? Then Skip
    //2. Check like Activity in last 24 hours, if activity < 80 continue
    //3. Check like Activity in the last 2 hours, like Activity > 20? then skip
    //4. Start the Liker Bot
    //5. Liker Bot will try to like 20 pictures,

    
    //await followUser(ig, "Instagram", force = true);
    //await likeUrl(ig, "https://www.instagram.com/p/B1earbyAT0Z/", force = true);
    //await unfollowUser(ig, "Instagram", force = true);
    //let posts = await recentHashtagList(ig, "animals");spp
    //await followUserByPost(ig, posts[0]);
    //await sleep(30);
    //posts = await recentHashtagList(ig, "iguana");
    //await followUserByPost(ig, posts[0]);

    //await likePost(ig, posts[0]);s
    

    //await getLikeActivityByHours(ig, 24 * 5);
    //await getFollowActivityByHours(ig, 24 * 5);
    //sawait getUnfollowActivityByHours(ig, 24 * 5);


 
})();
