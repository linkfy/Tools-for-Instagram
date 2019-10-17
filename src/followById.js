async function followById(ig, userId,  forceFollow = false, extraInfo = new Object()) {
    
    let alreadyExists = ig.db.get('follows').find({user_id: userId}).value();
    
    if(alreadyExists && !forceFollow) {
        console.log('Already followed'.yellow);
        return "already_followed";
    }
    await executeAntiBanChecks(ig);
    const response = await ig.friendship.create(userId);
    //Inject user Id in response [pk: personal key]
    response.pk = userId;

    if (response.following == true) {
        console.log(('Followed user with Id' + userId).green);
    } else {
        console.log(('Can not Follow user at the moment with Id' + userId).red);
    }
    

    let timestamp = new Date().getTime() - new Date().getTimezoneOffset()*60*1000;
    if(alreadyExists) {

        ig.db.get('follows').find({user_id: userId}).assign( {info: response, created_at: timestamp}).write();    
    } else {
        ig.db.get('follows').push({id: ig.shortid.generate(), user_id: userId, info: response, created_at: timestamp, extra_info: extraInfo}).write();
    }

    return response;
}

module.exports = followById;