async function getUnfollowActivityByHours(ig, hours = 24) {
    let currentTime = new Date(new Date().getTime() - new Date().getTimezoneOffset()*60*1000);
    currentTime.setHours(currentTime.getHours() - hours);
    currentTimeMiliseconds = currentTime.getTime();
    let results = ig.db.get('follows').filter(follow => follow.unfollowed_at > currentTimeMiliseconds).value();
    console.log(("Unfollowed accounts in last " + hours + " hours: " + results.length).cyan);
    return results.length;
}

module.exports = getUnfollowActivityByHours;