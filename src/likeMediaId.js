parser = require('instagram-id-to-url-segment');

async function likeMediaId(ig, media_id, forceLike = false, extraInfo = new Object()){
    
    let alreadyExists = ig.db.get('likes').find({media_id: media_id}).value();
    alreadyExists == undefined ? false : true;
    if(alreadyExists && forceLike == false) {
        console.log('Already liked'.yellow);
        return "already_liked";
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

    let timestamp = Date.now();
    let link = "https://www.instagram.com/p/" + parser.instagramIdToUrlSegment(media_id);
    if(alreadyExists) {

        ig.db.get('likes').find({media_id: media_id}).assign({created_at: timestamp}).write();
    } else {
        
        ig.db.get('likes').push({id: ig.shortid.generate(), media_id: media_id, link: link, created_at: timestamp, extra_info: extraInfo}).write();
    }

    return console.log("Liked media https://www.instagram.com/p/".green + parser.instagramIdToUrlSegment(media_id).green);

}

module.exports = likeMediaId;
