async function getRecentPostLikersByUsername(ig, username) {

    let posts = await getUserRecentPosts(ig, username);
    let likers = await getRecentPostLikers(ig, posts[0]);
    return likers;
}

module.exports = getRecentPostLikersByUsername;