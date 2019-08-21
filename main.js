let fs = require('fs');
let login =  require('./login.js');
let getFollowers = require('./getFollowers.js');
let getUserInfo = require('./getUserInfo.js');
let likeUrl = require('./likeUrl.js');
let recentHashtagList = require('./recentHashtagList.js');
let topHashtagList = require('./topHashtagList.js');
let likePost = require('./likePost.js');
let recentLocationList = require('./recentLocationList.js');
let topLocationList = require('./topLocationList.js');

(async () => {
    console.log("\n1 -- LOGIN --\n".bold.underline);
    let ig = await login();
    if(ig==undefined) {
        return console.log("Login failed");
    }
    
    console.log("\n2 -- Get User Info -- \n".bold.underline);
    let info = await getUserInfo(ig, "TheLinkfy");
    console.log("User information, username: " + info.username);

    console.log("\n3 -- Get Followers in .json file -- \n".bold.underline);
    await getFollowers(ig, 'linkfytester');

    console.log("\n4 -- Trying to like URL --\n".bold.underline);
    await likeUrl(ig, 'www.instagram.com/p/B1Jqqc3AS_0/');
    await likeUrl(ig, 'https://www.instagram.com/p/B1Ele5pAHmg/');
    await likeUrl(ig, 'https://www.instagram.com/p/B1CZhsqgS1Y');
   
    
    console.log("\n5 -- Trying to get recent hashtag list and like the first item -- \n".bold.underline);
    let posts = await recentHashtagList(ig, "dogs");
    await likePost(ig, posts[0]);
    
    
    console.log("\n6 -- Trying to get top hashtag list and like the first item -- \n".bold.underline);
    posts = await topHashtagList(ig, "dogs");
    await likePost(ig, posts[0]);

    console.log("\n7 -- Trying to get recent location list and like the first item -- \n".bold.underline);
    console.log("Getting the most accurated Location...\n[To get a randomized location of the search result specify 'true' at the end of function]\n- Example: recentLocationList(ig, 'Spain', true);".yellow);
    posts = await recentLocationList(ig, "Spain");
    await likePost(ig, posts[0]);

    console.log("\n8 -- Trying to get top location list and like the first item -- \n".bold.underline);
    console.log("Getting the most accurated Location...\n[To get a randomized location of the search result specify 'true' at the end of function]\n- Example: recentLocationList(ig, 'Spain', true);".yellow);
    posts = await topLocationList(ig, "Spain");
    await likePost(ig, posts[0]);

    //TODO -- DOING: Scraping recent hashtag list into a JSON
    console.log("\n-- DOING: Trying to get recent hashtag list and save into a file -- \n".bold.underline);
    posts = await recentHashtagList(ig, "dogs");
    fs.writeFileSync('output/scrapePosts.json',JSON.stringify(posts, undefined, '\t'));

    console.log("\nProcess done!\n".green);
})();
