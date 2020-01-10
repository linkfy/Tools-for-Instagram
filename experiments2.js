require('./src/tools-for-instagram');

(async () => {

    //let info = await spider.userHasStories("TheLinkfy");
    let ig = await login();
    //let info = await getUserInfo(ig, "its.crystinx");
    //polls.boredd: 18839378120
    //its.crystinx: 35125190
    let stories = await getStoriesFromId(ig, 18839378120);
    let polls = await getPollsFromStories(ig, stories);
    
    for(p in polls) {
        await voteStoryPoll(ig, polls[p]);
    }

    //console.log(polls);
})();