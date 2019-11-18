require('./src/tools-for-instagram.js');

(async () => {

    console.log("\n -- Script by: @virginsince1997 --\n".bold.underline);

    console.log("\n1 -- LOGIN --\n".bold.underline);
    let ig = await login();
	await setAntiBanMode(ig);

    
    
    let likers = await getRecentPostLikersByUsername(ig, 'instagram');
    // let likers = await getRecentPostLikers(ig, posts[0]);

    for (let i = 0; i < likers.length; i++) {
        try {
            let liker = likers[i];
            getFollowActivityByHours(ig, 24)
            await followUser(ig, liker.username);
			await sleep(60);
			let medias = await getUserRecentPosts(ig, liker.username);
			// store pictures of a liker in a variable 'medias'
			await likePost(ig, medias[0]);
			// like the most recent picture of a liker
            await sleep(60);
        } catch (error) {
            await sleep(30);
        }
    }
})();
