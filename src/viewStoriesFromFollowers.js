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
        if(i % 50 == 0 && i != 0) {
            let minutes = 0.5;
            process.stdout.write("\r\x1b[K");
            process.stdout.write("Watched " + i + " users, "+  totalViews + " stories viewed, waiting "+ minutes +" Minutes.. ");
            await sleep(60 * minutes, false);
        }
    }
    console.log(("\nStories from " + username + " followers completed").green);
    return totalViews;
}

module.exports = viewStoriesFromFollowers;