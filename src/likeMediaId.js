parser = require('instagram-id-to-url-segment');

async function likeMediaId(ig, media_id, forceLike = false, extraInfo = new Object()){
    /*
    If we assume that the person has used the account in the past without using TFI
    or that he also uses it while TFI runs in the background. 
    It may be a photo that does not exist in the database has like. 
    To add a second check layer we could use getMediaIdInfo() and expedite this process
    without making a call to the database

    I also thought about using getMediaIdInfo() to verify if the media have like
    and add it to the database, the problem is the timeStamp

    My plan would be to change the lines 22,23,24,25,26,27 for:

    if(getMediaIfInfo("2223233213123123123").items[0].hasLiked){
        console.log('Already liked'.yellow);
        return "already_liked";
    }
    */

    let alreadyExists = ig.db.get('likes').find({media_id: media_id}).value();
    alreadyExists == undefined ? false : true;
    if(alreadyExists && forceLike == false) {
        console.log('Already liked'.yellow);
        return "already_liked";
    }
    await executeAntiBanChecks(ig);
    await ig.media.like({
        mediaId: media_id,
        moduleInfo: {
            module_name: 'profile',
            user_id: ig.loggedInUser.pk,
            username: ig.loggedInUser.username,

        },
        d: _.sample([0,1]),  // d - means double-tap. If you liked post by double tap then d=1. You cant unlike post by double tap 
    });

    let timestamp = new Date().getTime() - new Date().getTimezoneOffset()*60*1000;
    
    let link = "https://www.instagram.com/p/" + parser.instagramIdToUrlSegment(media_id);
    if(alreadyExists) {

        ig.db.get('likes').find({media_id: media_id}).assign({created_at: timestamp}).write();
    } else {
        
        ig.db.get('likes').push({id: ig.shortid.generate(), media_id: media_id, link: link, created_at: timestamp, extra_info: extraInfo}).write();
    }

    return console.log("Liked media https://www.instagram.com/p/".green + parser.instagramIdToUrlSegment(media_id).green);

}

module.exports = likeMediaId;
