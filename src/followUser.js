async function followUser(ig, username) {
    const userId = (await ig.user.searchExact(username)).pk;

    let alreadyExists = ig.db.get('follows').find({user_id: userId}).value();
    alreadyExists == undefined ? false : true;
    if(alreadyExists) {
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
    ig.db.get('follows').push({id: ig.shortid.generate(), user_id: userId, info: response, created_at: timestamp}).write();

    return response;
}

module.exports = followUser;