async function lastLikeMinutesAgo(ig) {
    
    let timestamp_now = new Date(new Date().getTime() - new Date().getTimezoneOffset()*60*1000); 
    
    let results = await ig.db.get('likes').sortBy("created_at").value();//.filter(like => like.created_at > currentTimeMiliseconds).value();
    if(results.length <= 0) {
        return (1000* 60 * 99999);
    }
    
     let timestamp_like = results[results.length-1]["created_at"];
     
     let timestamp_diff = timestamp_now - timestamp_like;
    //Milliseconds to minutes
    
     return parseInt(timestamp_diff/1000/60);
}

module.exports = lastLikeMinutesAgo;

