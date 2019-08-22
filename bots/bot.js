
let loadScripts = require('../src/loadScripts.js')();

(async () => {
    //WARNING --- THIS BOT IS CURRENTLY an idea in progress
    
    
    //Let's try to make a simple bot
    //The bot will: 
    // - follow 80 users per day
    // - give 100 likes per day
    // we need to carry the follows / likes / unfollows / timers of the action
    // for this purpose we need first to define a database with node-json-db
    let ig = await login();
    if(ig ==  undefined) {
        return console.log("Login failed".red);
    } else {
        console.log("Logged in".green);
    }
    likeUrl(ig, "https://www.instagram.com/p/B1earbyAT0Z/");
    followUser(ig, "Instagram");
})();