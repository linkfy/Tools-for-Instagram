function followRecentHashtagsByIntervals(ig, hashtagArray, intervals, followsPerInterval = 5, waitMinutesBetweenFollowsPerInterval = 2) {
    console.log("Follows intervals started".underline.cyan + ": Waiting for the first interval".cyan);
    return setInterval(function() {
        intervals.forEach(async interval => {
            await executeFollowIntervalForRecentHashtags(ig, interval, hashtagArray, followsPerInterval, waitMinutesBetweenFollowsPerInterval);
        });
    }, 10 * 1000);
    
}


module.exports = followRecentHashtagsByIntervals;



async function executeFollowIntervalForRecentHashtags(ig, interval, hashtagArray, followsPerInterval, waitMinutesBetweenFollowsPerInterval) {
    
    if(await isTimeInRange(interval[0], interval[1])) {
        //let timestamp = new Date(new Date().getTime() - new Date().getTimezoneOffset()*60*1000); 
        //console.log(("Checking interval " + interval[0] + " to " + interval[1]).green);
        let currentIntervalFollows = await getFollowActivityFromHourToNow(ig, interval[0]);
        console.log("Follows from " + interval[0] + " to " + interval[1] + ": " + (currentIntervalFollows+"/"+followsPerInterval).cyan);

        // If likes < 5
        if(currentIntervalFollows < followsPerInterval) {
            

            if(await lastFollowMinutesAgo(ig) >= waitMinutesBetweenFollowsPerInterval) {
                console.log("\n".bgCyan);
                var hashtag = hashtagArray[Math.floor(Math.random()*hashtagArray.length)];
                console.log(("Executing follow for current interval, selected hashtag: " + hashtag).cyan);
                let posts = await recentHashtagList(ig, hashtag);
                await followUserByPost(ig, posts[0]);
                console.log("\n".bgCyan);
            } else {
                let minutesLeftString = (waitMinutesBetweenFollowsPerInterval - await lastFollowMinutesAgo(ig))+"";
                
                console.log("Minutes left for the next follow iteration: " + minutesLeftString.cyan);
            }
            
        }
    } 
}
