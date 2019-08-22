async function unfollowUser(ig, username) {
    const userId = (await ig.user.searchExact(username)).pk;
    const response = await ig.friendship.destroy(userId);
    
    //Inject user Id in response [pk: personal key]
    response.pk = userId;

    if (response.following == false) {
        console.log(('Unfollowed user ' + username).green);
    } else {
        console.log(('Can not unfollow user at the moment' + username).red);
    }
    
    return response;
}

module.exports = unfollowUser;