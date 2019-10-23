async function getStoriesFromId(ig, id) {
    
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
        const storyItems = await reelsFeed.items();
        return storyItems;
        

    } catch(e) {
        console.log(e);
        console.log("Wait 30 minutes");
        await sleep(30*60);
        return await getStoriesFromId(ig, id);
    }
    
}

module.exports = getStoriesFromId;