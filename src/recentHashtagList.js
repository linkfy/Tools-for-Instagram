async function recentHashtagList(ig, hashtag) {
    let feed = await ig.feed.tag(hashtag);
    items = await feed.items();
    return items; 
}

module.exports = recentHashtagList;
