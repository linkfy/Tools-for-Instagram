async function viewStoriesFromFollowers(ig, username, iterations = null) {
    
    if(iterations != null) {
        await getFollowers(ig, username, iterations);
        
    } else {
        await getFollowers(ig, username);
        
    }
    let followers = await readFollowers(ig, username);
    let totalViews = 0;
    
    for(let i = 0; i < followers.length; i++) {
        totalViews += await viewStoriesFromId(ig, followers[i].pk);
        process.stdout.write("\r\x1b[K");
        process.stdout.write("Follower:"+i+"/"+followers.length+" Total views: " + totalViews + " ");
        
    }
    console.log(("\nStories from " + username + " followers completed").green);
    return totalViews;
}

module.exports = viewStoriesFromFollowers;