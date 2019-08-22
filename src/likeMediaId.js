parser = require('instagram-id-to-url-segment');

async function likeMediaId(ig, media_id){
    try{
        ig.db.getData('/likes/' + media_id);
        console.log('Already liked'.yellow);
        return "already_liked";
    } catch (error) {
        console.log('Media not liked before..');
    }
    await ig.media.like({
        mediaId: media_id,
        moduleInfo: {
            module_name: 'profile',
            user_id: ig.loggedInUser.pk,
            username: ig.loggedInUser.username,

        },
        d: _.sample([0,1]),  // d - means double-tap. If you liked post by double tap then d=1. You cant unlike post by double tap 
    });

    //The object container will be the Media ID itself
    let likedMedia = new Object();
    likedMedia.media_id = media_id;
    likedMedia.link = "https://www.instagram.com/p/" + parser.instagramIdToUrlSegment(media_id);
    likedMedia.time = Date.now();
    //The object container will be the media ID
    ig.db.push('/likes/' + media_id, likedMedia);

    return console.log("Liked media https://www.instagram.com/p/".green + parser.instagramIdToUrlSegment(media_id).green);

}

module.exports = likeMediaId;
