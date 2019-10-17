async function unfollowById(ig, userId, forceUnfollow = false) {
    let user =  await ig.user.info(userId);
    let username = user.username;
    
    

    let alreadyExists = ig.db.get('follows').find({user_id: userId}).value();
    
    if(alreadyExists) {
        let alreadyUnfollowed = ig.db.get('follows').find({user_id: userId}).get('unfollowed_at').value();
        
        //If the user was already unfollowed in the databse, skip it if the unfollow is not forced
        if(alreadyUnfollowed && forceUnfollow == false) {
            console.log("Already unfollowed, skipping".yellow);
            return "aleady_unfollowed";
        }


        
        let timestamp = new Date().getTime() - new Date().getTimezoneOffset()*60*1000;
        ig.db.get('follows').find({user_id: userId}).assign({unfollowed_at: timestamp}).write();
        
        
    } else {
        console.log('Follower not found in databse, [Skipping DB insertion]'.yellow);
    }
    await executeAntiBanChecks(ig);
    let response = await ig.friendship.destroy(userId);
    
    //Inject user Id in response [pk: personal key]
    response.pk = userId;

    if (response.following == false) {
        console.log(('Unfollowed user ' + username).green);
    } else {
        console.log(('Can not unfollow user at the moment' + username).red);
    }
    
    return response;
}

module.exports = unfollowById;