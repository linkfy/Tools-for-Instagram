require('./src/tools-for-instagram.js');


(async () => {
    console.log("\n-- : Unfollow Everyone --\n".bold.underline);
    console.log("\n -- Script by: @virginsince1997 --\n".bold.underline);
    let ig = await login();
    await setAntiBanMode(ig);
    await getFollowing(ig, ig.loggedInUser.username);
    await sleep(60);
    followings = await readFollowing(ig, ig.loggedInUser.username);
    await sleep(4);
    
    for (let i = 0; i < followings.length; i++) {
        try {
            let following = followings[i];
            await sleep(60);
            await unfollowUser(ig, following.username);
        } catch (e) {
            console.log("Error", e.stack);
            console.log("Error", e.name);
            console.log("Error", e.message);
            await sleep(30);
        }
    }
})();
