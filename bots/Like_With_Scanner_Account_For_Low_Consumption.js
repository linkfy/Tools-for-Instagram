require("../src/tools-for-instagram.js");

//How to use Rotative Residential/Mobile proxies with low data consumption example:
(async () => {
    //See example file inside accounts folder, create two files before testing
    let config = loadConfig('exampleAccount');
    let config2 = loadConfig('exampleAccount2');
    
    let account = await login(config);
    let scanner = await login(config2);
    await setAntiBanMode(account); //← Prevent bans | Prevent default proxy ↑
    await scanAndLike(scanner, account, repeatSeconds = 120);
})();

async function scanAndLike(scanner, account, repeatSeconds) {

    console.log("Using scanner account to search");
    let posts = await recentHashtagList(scanner, "dogs");
    console.log("Using personal account to Like");
    await likePost(account, posts[0]);
    await getLikeActivityByHours(account, 24);
    
    setTimeout(async () => {await scanAndLike(scanner, account, repeatSeconds);}, 1000 * repeatSeconds);
}

