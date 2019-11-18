let likeMediaId = require('./likeMediaId.js');

async function likePost(ig, post, forceLike = false) {
    let extraInfo = new Object();
    try {
        extraInfo.comes_from = post.comes_from;
        extraInfo.user = post.user;
        return await likeMediaId(ig, post.pk, forceLike, extraInfo);
    } catch (error) {
        console.log("Error Liking, no posts received, Skipping".yellow)

    }
}

module.exports = likePost;
