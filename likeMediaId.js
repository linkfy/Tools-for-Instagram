parser = require('instagram-id-to-url-segment');

async function likeMediaId(ig, media_id){
    await ig.media.like({
        mediaId: media_id,
        moduleInfo: {
            module_name: 'profile',
            user_id: ig.loggedInUser.pk,
            username: ig.loggedInUser.username,

        },
        d: _.sample([0,1]),  // d - means double-tap. If you liked post by double tap then d=1. You cant unlike post by double tap 
    });
    return console.log("Liked media www.instagram.com/p/" + parser.instagramIdToUrlSegment(media_id));
}

module.exports = likeMediaId;
