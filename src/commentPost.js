let commentMediaId = require('./commentMediaId.js');

async function commentPost(ig, post, commentContent, commentIfAlreadyCommented = false) {
    let extraInfo = new Object();
    extraInfo.comes_from = post.comes_from;
    extraInfo.user = post.user;
    return await commentMediaId(ig, post.pk, commentContent, commentIfAlreadyCommented, extraInfo);
}

module.exports = commentPost;
