async function getUserRecentPosts(ig, username) {
    let info = await getUserInfo(ig, username);
    let feed = await ig.feed.user(info.pk);
    let list = await feed.items();
    //To keep getting content, maybe on a future function:
    /* do {
        moreList = await feed.items();
        Array.prototype.push.apply(list,moreList);
        console.log(list[list.length-1]);
        console.log(list.length);
       
    } while(feed.moreAvailable == true); */
    
    return list;
}

module.exports = getUserRecentPosts;