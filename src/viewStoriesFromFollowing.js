
async function viewStoriesFromFollowing(ig, username, iterations = null) {
    
    if(iterations != null) {
        await getFollowing(ig, username, iterations);
        
    } else {
        await getFollowing(ig, username);
        
    }
    let followers = await readFollowing(ig, username);
    let totalViews = 0;
    
    for(let i = 0; i < followers.length; i++) {
        totalViews += await viewStoriesFromId(ig, followers[i].pk);
        process.stdout.write("\r\x1b[K");
        process.stdout.write("Follower:"+i+"/"+followers.length+" Total views: " + totalViews + " ");
        
    }
    console.log(("\nStories from " + username + " following completed").green);
    return totalViews;
}

module.exports = viewStoriesFromFollowing;