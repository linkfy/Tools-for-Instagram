
async function viewStoriesFromFollowing(ig, username, iterations = null) {
    
    if(iterations != null) {
        await getFollowing(ig, username, iterations);
        
    } else {
        await getFollowing(ig, username);
        
    }
    let followers = await readFollowing(ig, username);
    let totalViews = await doSteps(ig, followers);
    
    console.log(("\nStories from " + username + " following completed").green);
    return totalViews;
}

module.exports = viewStoriesFromFollowing;

async function doSteps(ig, followers) {
    console.log("Starging views at " + Date(Date.now()));
    let totalViews = 0;
    let selections = 30;

    for(let i = 0; i < followers.length; i+=selections) {
        let selectedAccountsIds = [];
        let counter = i;
        do {
            if(typeof followers[counter] !== 'undefined') {
                //console.log("Selecting " + followers[counter].pk);
                selectedAccountsIds.push(followers[counter].pk);
            }
            counter ++;
        } while( counter%selections != 0 && counter < followers.length);
        totalViews += await viewStoriesFromId(ig, selectedAccountsIds);
        await sleep(5, false);
        process.stdout.write(".");
        await sleep(5, false);
        process.stdout.write(".");
        await sleep(5, false);
        process.stdout.write(".");
        await sleep(5, false);

        process.stdout.write("\r\x1b[K");
        
        process.stdout.write("Follower:"+counter+"/"+followers.length+" Total views: " + totalViews + " ");
        /* if(i % 50 == 0 && i != 0) {
            let minutes = 0.5;
            process.stdout.write("\r\x1b[K");
            process.stdout.write("Watched " + i + " users, "+  totalViews + " stories viewed, waiting "+ minutes +" Minutes.. ");
            await sleep(60 * minutes, false);
        } */
        
    }
    return totalViews;
}