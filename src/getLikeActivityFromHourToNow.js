async function getLikeActivityFromHourToNow(ig, time = "00:00") {
    let startHour = parseInt(time.split(":")[0]);
    let startMinute = parseInt(time.split(":")[1]);
    let startingTime = new Date();
    let today = new Date().getTime() - new Date().getTimezoneOffset()*60*1000;
    startingTime.setHours(startHour);
    startingTime.setMinutes(startMinute);
    startingTime.setSeconds(0);
    //Parse to actual time //TODO in some regions maybe it is necessary to change the '-' for '+'
    startingTime.setTime(startingTime.setTime( startingTime.getTime() - startingTime.getTimezoneOffset()*60*1000 ));
    startingTime = startingTime.getTime();
    //Now we can get the elements from DB that are bigger than the startingTime
    
    let results = await ig.db.get('likes').filter(like => like.created_at > startingTime).value();
    return results.length;
}

module.exports = getLikeActivityFromHourToNow;