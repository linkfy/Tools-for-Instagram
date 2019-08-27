let likeMediaId = require('./likeMediaId.js');

async function likePost(ig, post, forceLike = false) {
    let extraInfo = new Object();
    extraInfo.comes_from = post.comes_from;
    extraInfo.user = post.user;
    return await likeMediaId(ig, post.pk, forceLike, extraInfo);
}

module.exports = likePost;
