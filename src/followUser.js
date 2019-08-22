async function followUser(ig, username) {
    const userId = (await ig.user.searchExact(username)).pk;
    const response = await ig.friendship.create(userId);
    //Inject user Id in response [pk: personal key]
    response.pk = userId;

    if (response.following == true) {
        console.log(('Followed user ' + username).green);
    } else {
        console.log(('Can not Follow user at the moment' + username).red);
    }
    
    return response;
}

module.exports = followUser;