async function recentHashtagList(ig, hashtag) {
    let feed = await ig.feed.tag(hashtag);
    items = await feed.items();
    items.forEach(element => {
        element.comes_from = "recent_hashtag";
    });
    return items; 
}

module.exports = recentHashtagList;
