let likeMediaId = require('./likeMediaId.js');

async function likePost(ig, post, forceLike = false) {
    return await likeMediaId(ig, post.pk, forceLike);
}

module.exports = likePost;
