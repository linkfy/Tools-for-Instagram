async function viewStoriesFromId(ig, id) {
    
    const reelsFeed = await ig.feed.reelsMedia({
        userIds:[id],
    });
    
    const storyItems = await reelsFeed.items();
    if (storyItems.length != 0) {
        process.stdout.write("Viewing => ");
        for(var index = 0; index <  storyItems.length; index++) {
            await ig.story.seen([storyItems[index]]);
            process.stdout.write(' '.bgCyan);
            await sleep(1, false);
        }
        
        return storyItems.length;
    } else {
        return 0;
    }
}

module.exports = viewStoriesFromId;