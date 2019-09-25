parser = require('instagram-id-to-url-segment');

async function commentMediaId(ig, media_id, commentContent,commentIfAlreadyCommented = false ,extraInfo = new Object()){
    
    let alreadyExists = ig.db.get('comments').find({media_id: media_id}).value();
    alreadyExists == undefined ? false : true;
    if(alreadyExists && !commentIfAlreadyCommented) {
        console.log('Already commented'.yellow);
        return "already_commented";
    }

    if(commentIfAlreadyCommented || !alreadyExists){
        await ig.media.comment({
            module_name: 'profile',
            mediaId: media_id,
            text: commentContent,
        });
    
        let timestamp = new Date().getTime() - new Date().getTimezoneOffset()*60*1000;
        let link = "https://www.instagram.com/p/" + parser.instagramIdToUrlSegment(media_id);

        if(commentIfAlreadyCommented || !alreadyExists) {
            ig.db.get('comments').push({id: ig.shortid.generate(), media_id: media_id, comment: commentContent ,link: link, created_at: timestamp, extra_info: extraInfo}).write();
        }else{
            ig.db.get('comments').find({media_id: media_id}).assign({created_at: timestamp}).write();
        }

        return console.log("Commented media https://www.instagram.com/p/".green + parser.instagramIdToUrlSegment(media_id).green);
    }
}

module.exports = commentMediaId;

