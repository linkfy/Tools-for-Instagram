//Save the last 10 followers on DB
// If last followers not Exists create it
// also check if is new
async function getMyLastFollowers(ig) {
    let accountFollowersFeed = await ig.feed.accountFollowers(ig.loggedInUser.pk);
    let accountFollowers = await accountFollowersFeed.items();

    accountFollowers = accountFollowers.map(f => {
        let {pk,username,is_private} = f;
        return {pk,username,is_private};
            
    });

    if(accountFollowers.length > 100) {
        accountFollowers =  accountFollowers.slice(0,100);
    }
    else {
        accountFollowers = accountFollowers;
    }
    let setAllAsNotNew = false;
    accountFollowers.forEach(follower => {
        let isNewFollower = false;
        let alreadyExists = ig.db.get('lastFollowers').find({pk: follower.pk}).value();
        if(alreadyExists != undefined || setAllAsNotNew == true) {
            //Important: When an old follower is detected, all the next followers will be set to false
            //to avoid set as new followers the end of the list when someone unfollows you
            setAllAsNotNew = true;
            isNewFollower = false;
            follower.is_new_follower = isNewFollower;
        } else {
            follower.is_new_follower = true;
        }
        //If the DB is void, it means its the first time we did this, set all the followers as OLD, not news
        if(ig.db.get('lastFollowers').value().length <= 0) {
            follower.is_new_follower = false;
        }
        
        

    });
    ig.db.set('lastFollowers', accountFollowers).write();

    return accountFollowers;
}

module.exports = getMyLastFollowers;