require('./src/tools-for-instagram');

(async () => {

    //let info = await spider.userHasStories("TheLinkfy");
    //let info = await getUserInfo(ig, "its.crystinx");
    //polls.boredd: 18839378120
    //its.crystinx: 35125190
    //let stories = await getStoriesFromId(ig, 18839378120);
    //let polls = await getPollsFromStories(ig, stories);
    
    /* for(p in polls) {
        await voteStoryPoll(ig, polls[p]);
    } */
    let ig = await login();
    
    
    
    console.log(await getLikeActivityByHours(ig, 24));
    
    //console.log(await getMediaIdInfo(ig, '2111579218110733346'));
    
    //console.log(a);
    //console.log(polls);
})();