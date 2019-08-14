let login =  require('./login.js');
let getFollowers = require('./getFollowers.js');
let getUserInfo = require('./getUserInfo.js');
let likeUrl = require('./likeUrl.js');
let fs = require('fs');

(async () => {
    console.log("1 --LOGIN--");
    let ig = await login();
    if(ig==undefined) {
        return console.log("Login failed");
    }
    
    //console.log("2 -- Get User Info");
    //let info = await getUserInfo(ig, "TheLinkfy");
    //console.log("User information, username: " + info.username);

    //console.log("3 -- Get Followers -- (DOING)");
    //await getFollowers(ig, 'linkfytester');

    console.log("4 -- Trying to like URL --");
    await likeUrl(ig, 'www.instagram.com/p/B1Jqqc3AS_0/');
    await likeUrl(ig, 'https://www.instagram.com/p/B1Ele5pAHmg/');
    await likeUrl(ig, 'https://www.instagram.com/p/B1CZhsqgS1Y');
    console.log("Process done!");
})();
