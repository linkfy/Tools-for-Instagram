async function lastFollowMinutesAgo(ig) {
    let timestamp_now = new Date(new Date().getTime() - new Date().getTimezoneOffset()*60*1000); 
     let results = await ig.db.get('follows').sortBy("created_at").value();
     if(results.length <= 0) {
        return (1000* 60 * 99999);
    }
     let timestamp_follow = results[results.length-1]["created_at"];
     
     let timestamp_diff = timestamp_now - timestamp_follow;
    //Milliseconds to minutes
     return parseInt(timestamp_diff/1000/60);
}

module.exports = lastFollowMinutesAgo;