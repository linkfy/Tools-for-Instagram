async function topHashtagList(ig, hashtag) {
    let feed = await ig.feed.tags(hashtag, 'top');
    items = await feed.items();
    items.shift(); //delete first element to solve bug
    return items; 
}

module.exports = topHashtagList;
