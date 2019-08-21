let likeMediaId = require('./likeMediaId.js');

async function likePost(ig, post) {
    return await likeMediaId(ig, post.pk);
}

module.exports = likePost;
