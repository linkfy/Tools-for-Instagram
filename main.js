let login =  require('./login.js');
let fs = require('fs');
(async () => {
    console.log("1 --LOGIN--");
    let ig = await login();
    if(ig==undefined) {
        return console.log("Login failed");
    }
    console.log("2 -- Get Followers -- (DOING)");
    let pk = await ig.user.getIdByUsername(process.env.IG_USERNAME);
    const followersFeed = ig.feed.accountFollowers(pk);
    const wholeResponse = await followersFeed.request();

    let items = await followersFeed.items();
    fs.writeFileSync('file.txt', JSON.stringify(wholeResponse), 'utf8', (err) => { if(err) {
            console.log("Error saving file");
        }
        
    }); 
    //console.log(items);
    console.log("Process done!");
})();
