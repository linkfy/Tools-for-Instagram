async function viewStoriesFromUser(ig, username) {
    userInfo = await getUserInfo(ig, username);
    
    let id = userInfo.pk;
    let result = await viewStoriesFromId(ig, id);
    if(result == 0) {
        console.log("No stories found on user " + username);
    }
    return result;
}

module.exports = viewStoriesFromUser;