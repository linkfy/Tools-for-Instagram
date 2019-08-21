let fs = require('fs');
let login =  require('./login.js');
let getFollowers = require('./getFollowers.js');
let getUserInfo = require('./getUserInfo.js');
let likeUrl = require('./likeUrl.js');
let recentHashtagList = require('./recentHashtagList.js');
let topHashtagList = require('./topHashtagList.js');
let likePost = require('./likePost.js');

(async () => {
    console.log("1 --LOGIN--");
    let ig = await login();
    if(ig==undefined) {
        return console.log("Login failed");
    }
    
    //console.log("2 -- Get User Info");
    //let info = await getUserInfo(ig, "TheLinkfy");
    //console.log("User information, username: " + info.username);

    //console.log("3 -- Get Followers int txt-- ");
    //await getFollowers(ig, 'linkfytester');

    //console.log("4 -- Trying to like URL --");
    //await likeUrl(ig, 'www.instagram.com/p/B1Jqqc3AS_0/');
    //await likeUrl(ig, 'https://www.instagram.com/p/B1Ele5pAHmg/');
    //await likeUrl(ig, 'https://www.instagram.com/p/B1CZhsqgS1Y');
   
    
    //console.log("5 -- Trying to get recent hashtag list and like the first item--")
    //let posts = await recentHashtagList(ig, "dogs");
    //await likePost(ig, posts[0]);
    
    
    //TODO
    console.log("6 -- Trying to get top  hashtag list and like the first item--")
    posts = await topHashtagList(ig, "dogs");
    console.log("Process done!");
})();
