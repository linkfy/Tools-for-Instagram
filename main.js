let login =  require('./login.js');
let getFollowers = require('./getFollowers.js');
let getUserInfo = require('./getUserInfo.js');
let fs = require('fs');

(async () => {
    console.log("1 --LOGIN--");
    let ig = await login();
    if(ig==undefined) {
        return console.log("Login failed");
    }
    
    console.log("2 -- Get User Info");
    let info = await getUserInfo(ig, "TheLinkfy");
    console.log("User information, username: " + info.username);

    console.log("3 -- Get Followers -- (DOING)");
    await getFollowers(ig, 'pablomotos');
    console.log("Process done!");
})();
