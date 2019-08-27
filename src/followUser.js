async function followUser(ig, username, forceFollow = false, extraInfo = new Object()) {
    const userId = (await ig.user.searchExact(username)).pk;
    
    let alreadyExists = ig.db.get('follows').find({user_id: userId}).value();
    
    if(alreadyExists && !forceFollow) {
        console.log('Already followed'.yellow);
        return "already_followed";
    }
    
    const response = await ig.friendship.create(userId);
    //Inject user Id in response [pk: personal key]
    response.pk = userId;

    if (response.following == true) {
        console.log(('Followed user ' + username).green);
    } else {
        console.log(('Can not Follow user at the moment' + username).red);
    }
    

    let timestamp = Date.now();
    if(alreadyExists) {

        ig.db.get('follows').find({user_id: userId}).assign( {info: response, created_at: timestamp}).write();    
    } else {
        ig.db.get('follows').push({id: ig.shortid.generate(), user_id: userId, info: response, created_at: timestamp, extra_info: extraInfo}).write();
    }

    return response;
}

module.exports = followUser;