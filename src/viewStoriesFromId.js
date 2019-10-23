async function viewStoriesFromId(ig, id) {
    
    try {
        //If it is onlty one element transform it to an array
        if(!Array.isArray(id)) {
            let aux = [];
            aux.push(id);
            id = aux;
        }
        const reelsFeed = await ig.feed.reelsMedia({
            userIds: id,
        });
        await sleep(2, false);
        const storyItems = await reelsFeed.items();
        
        if (storyItems.length != 0) {
            process.stdout.write("Viewing => ");
            /* for(var index = 0; index <  storyItems.length; index++) {
                console.log(storyItems[index]);
                await ig.story.seen([storyItems[index]]);
                process.stdout.write(' '.bgCyan);
                await sleep(1, false);
            } */
            
            process.stdout.write('👀 ');
            await ig.story.seen(storyItems);
            process.stdout.write('👍 ');
            return storyItems.length;
        } else {
            return 0;
        }

    } catch(e) {
        console.log(e);
        console.log("Wait 30 minutes");
        await sleep(30*60);
        return await viewStoriesFromId(ig, id);
    }
    
}

module.exports = viewStoriesFromId;