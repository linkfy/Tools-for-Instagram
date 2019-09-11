async function viewStoriesFromId(ig, id) {
    try {
        const reelsFeed = await ig.feed.reelsMedia({
            userIds:[id],
        });
        
        const storyItems = await reelsFeed.items();
        if (storyItems.length != 0) {
            process.stdout.write("Viewing => ");
            /* for(var index = 0; index <  storyItems.length; index++) {
                console.log(storyItems[index]);
                await ig.story.seen([storyItems[index]]);
                process.stdout.write(' '.bgCyan);
                await sleep(1, false);
            } */
            
            process.stdout.write(' '.bgCyan);
            await ig.story.seen(storyItems);
            await sleep(1, false);
            return storyItems.length;
        } else {
            return 0;
        }

    } catch(e) {
        console.log(e);
        await sleep(10*60);
        return await viewStoriesFromId(ig, id);
    }
    
}

module.exports = viewStoriesFromId;