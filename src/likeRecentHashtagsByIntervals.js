function likeRecentHashtagsByIntervals(ig, hashtagArray, intervals, likesPerInterval = 5, waitMinutesBetweenLikesPerInterval = 2) {
    console.log("Like intervals started".underline.cyan + ": Waiting for the first interval".cyan);
    return setInterval(function() {
        intervals.forEach(async interval => {
            await executeLikeIntervalForRecentHashtags(ig, interval, hashtagArray, likesPerInterval, waitMinutesBetweenLikesPerInterval);
        });
    }, 10 * 1000);
    
}


module.exports = likeRecentHashtagsByIntervals;



async function executeLikeIntervalForRecentHashtags(ig, interval, hashtagArray, likesPerInterval, waitMinutesBetweenLikesPerInterval) {
    
    if(await isTimeInRange(interval[0], interval[1])) {
        //let timestamp = new Date(new Date().getTime() - new Date().getTimezoneOffset()*60*1000); 
        //console.log(("Checking interval " + interval[0] + " to " + interval[1]).green);
        let currentIntervalLikes = await getLikeActivityFromHourToNow(ig, interval[0]);
        console.log("Likes from " + interval[0] + " to " + interval[1] + ": " + (currentIntervalLikes+"/"+likesPerInterval).cyan);
        
        // If likes < 5
        if(currentIntervalLikes < likesPerInterval) {
            
            let lastLikeMins = await lastLikeMinutesAgo(ig);
            
            if(await lastLikeMinutesAgo(ig) >= waitMinutesBetweenLikesPerInterval) {
                
                console.log("\n".bgCyan);
                var hashtag = hashtagArray[Math.floor(Math.random()*hashtagArray.length)];
                console.log(("Executing like for current interval, selected hashtag: " + hashtag).cyan);
                let posts = await recentHashtagList(ig, hashtag);
                await likePost(ig, posts[0]);
                console.log("\n".bgCyan);
            } else {
                let minutesLeftString = (waitMinutesBetweenLikesPerInterval - await lastLikeMinutesAgo(ig))+"";
                
                console.log("Minutes left for the next like iteration: " + minutesLeftString.cyan);
            }
            
        }
    } 
}
