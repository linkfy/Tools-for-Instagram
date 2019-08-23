async function getLikeActivityByHours(ig, hours = 24) {
    let currentTime = new Date();
    currentTime.setHours(currentTime.getHours() - hours);
    currentTimeMiliseconds = currentTime.getTime();
    let results = ig.db.get('likes').filter(like => like.created_at > currentTimeMiliseconds).value();
    console.log(("Activity in last " + hours + " hours: " + results.length).cyan);
    return results.length;
}

module.exports = getLikeActivityByHours;