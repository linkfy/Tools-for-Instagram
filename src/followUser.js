async function followUser(ig, username) {
    const userId = (await ig.user.searchExact(username)).pk;
    try{
        ig.db.getData('/follows/' + userId);
        console.log('Already followed'.yellow);
        return "already_followed";
    } catch (error) {
        console.log('User not followed before..');
    }
    
    const response = await ig.friendship.create(userId);
    //Inject user Id in response [pk: personal key]
    response.pk = userId;

    if (response.following == true) {
        console.log(('Followed user ' + username).green);
    } else {
        console.log(('Can not Follow user at the moment' + username).red);
    }
    //The object container will be the Media ID itself
    
    response.time = Date.now();

    //The object container will be the media ID
    ig.db.push('/follows/' + userId, response);
    return response;
}

module.exports = followUser;