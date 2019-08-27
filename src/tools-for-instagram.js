function toolsForInstagram() {
    global.fs = require('fs');
    global.sleep = require('./sleep.js');
    global.login =  require('./login.js');
    global.getFollowers = require('./getFollowers.js');
    global.getUserInfo = require('./getUserInfo.js');
    global.likeUrl = require('./likeUrl.js');
    global.recentHashtagList = require('./recentHashtagList.js');
    global.topHashtagList = require('./topHashtagList.js');
    global.likePost = require('./likePost.js');
    global.recentLocationList = require('./recentLocationList.js');
    global.topLocationList = require('./topLocationList.js');
    global.savePosts = require('./savePosts.js');
    global.followUser = require('./followUser.js');
    global.followUserByPost = require('./followUserByPost');
    global.unfollowUser = require('./unfollowUser.js');
    global.getLikeActivityByHours = require('./getLikeActivityByHours');
    global.getFollowActivityByHours = require('./getFollowActivityByHours');
    global.getUnfollowActivityByHours = require('./getUnfollowActivityByHours');
    global.isTimeInRange = require('./isTimeInRange.js');
}

module.exports = toolsForInstagram();