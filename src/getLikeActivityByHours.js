async function getLikeActivityByHours(ig, hours = 24) {
    let currentTime = new Date(new Date().getTime() - new Date().getTimezoneOffset()*60*1000);
    currentTime.setHours(currentTime.getHours() - hours);
    currentTimeMiliseconds = currentTime.getTime();
    let results = ig.db.get('likes').filter(like => like.created_at > currentTimeMiliseconds).value();
    console.log(("Like activity in last " + hours + " hours: " + results.length).cyan);
    return results.length;
}

module.exports = getLikeActivityByHours;