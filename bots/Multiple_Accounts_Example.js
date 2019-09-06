
require('../src/tools-for-instagram.js');


(async () => {

    let likesPerInterval = 9;
    let followsPerInterval = 5;
    let waitMinutesBetweenLikes = 1;
    let waitMinutesBetweenFollows = 2;
    
    //9 Intervals
    let intervals = [
        ["7:05",    "7:16"],    // Wake up [10m]
        ["7:40",    "7:51"],    // Breakfast [10m]
        ["8:30",    "8:41"],    // In the train [10m] || Job starts at 9am
        ["13:30",    "13:41"],  // Back home from work [10m]
        ["14:40",    "14:51"],  // Launch [10m]
        ["15:45",    "15:56"],  // Go to work again [10m] || Job starts at 4pm
        ["20:20",    "20:31"],  // In train to go home [10m]
        ["21:45",    "21:56"],  // After Dinner [10m]
        ["23:10",    "23:21"],  // Go to Sleep [10m]
    ];

    let hashtagArray = [
        "cats",
        "dogs",
        "chameleon",
        "fish",
        "gaming",
        "music"
    ];
    

    //Load login from .env file
    let myAccount = await login();
    //Load login from config file
    acc = loadConfig('exampleAccount');
    let myAccount2 = await login(acc.account, acc.password);
    //Load login from text input
    let myAccount3 = await login("username3", "password");


    if(myAccount == "removeCookie" || myAccount == "incorrectPassword" )
        await removeCookie(myAccount, 'username');
    if(myAccount2 == "removeCookie" || myAccount2 == "incorrectPassword" )
        await removeCookie(myAccount2, 'username2');
    if(myAccount3 == "removeCookie" || myAccount3 == "incorrectPassword" )
        await removeCookie(myAccount3, 'username3');
    
    
    let likeInterval = likeRecentHashtagsByIntervals(
        myAccount,
        hashtagArray,
        intervals, 
        likesPerInterval, 
        waitMinutesBetweenLikes);

    let followInterval = followRecentHashtagsByIntervals(
        myAccount2,
        hashtagArray,
        intervals, 
        followsPerInterval, 
        waitMinutesBetweenFollows);

    let followInterval2 = followRecentHashtagsByIntervals(
        myAccount3,
        hashtagArray,
        intervals, 
        followsPerInterval, 
        waitMinutesBetweenFollows);
    

    process.on('unhandledRejection', async function(err) {
        console.log(err.response.body);
        if(err.name == "IgActionSpamError") {
            console.log("Spam Error, trying to regenerate the cookie".red);
            await removeCookie(myAccount);
            myAccount = await login();
        }
    });
    

    
})();