async function followUserByPost(ig, post, forceFollow = false) {
    let extraInfo = new Object();
    extraInfo.comes_from = post.comes_from;
    return await followUser(ig, post.user.username, forceFollow, extraInfo);
}

module.exports = followUserByPost;