require("../src/tools-for-instagram.js");

(async () => {
    let ig = await login();
    await setAntiBanMode(ig);

    setInterval(async () => {
        let posts = await recentHashtagList(ig, "dogs");
        await likePost(ig, posts[0]);
        await getLikeActivityByHours(ig, 24);
        console.log("Next It. in 75 seconds");
    }, 1000 * 75);

})();

