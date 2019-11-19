function toolsForInstagram() {
    global.Blob = require('blob');
    global.fs = require('fs');
    global.sleep = require('./sleep.js');
    global.sleepSync = require('./sleepSync.js');
    global.Api = require('instagram-private-api');
    if(!global.noLogo)
        require('./logo.js')();
    global.login =  require('./login.js');
    global.spider = require('./spider.js');
    global.removeCookie = require('./removeCookie.js');
    global.regenerateSession = require('./regenerateSession.js');
    global.getFollowers = require('./getFollowers.js');
    global.getFollowing = require('./getFollowing.js');
    global.readFollowers = require('./readFollowers.js');
    global.readFollowing = require('./readFollowing.js');
    global.getUserInfo = require('./getUserInfo.js');
    global.getUserRecentPosts = require('./getUserRecentPosts.js');
    global.likeUrl = require('./likeUrl.js');
    global.recentHashtagList = require('./recentHashtagList.js');
    global.topHashtagList = require('./topHashtagList.js');
    global.likePost = require('./likePost.js');
    global.recentLocationList = require('./recentLocationList.js');
    global.topLocationList = require('./topLocationList.js');
    global.savePosts = require('./savePosts.js');
    global.followUser = require('./followUser.js');
    global.followById = require('./followById.js');
    global.followUserByPost = require('./followUserByPost');
    global.unfollowUser = require('./unfollowUser.js');
    global.unfollowById = require('./unfollowById.js');
    global.getLikeActivityByHours = require('./getLikeActivityByHours.js');
    global.getFollowActivityByHours = require('./getFollowActivityByHours.js');
    global.getUnfollowActivityByHours = require('./getUnfollowActivityByHours.js');
    global.isTimeInRange = require('./isTimeInRange.js');
    global.getLikeActivityFromHourToNow = require("./getLikeActivityFromHourToNow.js");
    global.getFollowActivityFromHourToNow = require("./getFollowActivityFromHourToNow.js");
    global.lastLikeMinutesAgo = require("./lastLikeMinutesAgo.js");
    global.lastFollowMinutesAgo = require("./lastFollowMinutesAgo.js");
    global.likeRecentHashtagsByIntervals = require("./likeRecentHashtagsByIntervals.js");
    global.followRecentHashtagsByIntervals = require('./followRecentHashtagsByIntervals.js');
    global.loadConfig = require('./loadConfig.js');
    global.viewStoriesFromUser = require('./viewStoriesFromUser.js');
    global.getStoriesFromId = require('./getStoriesFromId.js');
    global.viewStoriesFromId = require('./viewStoriesFromId.js');
    global.viewStoriesFromIds = require('./viewStoriesFromId.js');
    global.viewStoriesFromFollowing = require('./viewStoriesFromFollowing.js');
    global.viewStoriesFromFollowers = require('./viewStoriesFromFollowers.js');
    global.getRecentPostLikers = require('./getRecentPostLikers.js');
    global.getRecentPostLikersByUsername = require('./getRecentPostLikersByUsername.js');
    global.requestLivestream = require('./requestLivestream.js');
    global.commentMediaId = require('./commentMediaId.js');
    global.urlToMediaId = require('./urlToMediaId.js');
    global.getMediaIdInfo = require('./getMediaIdInfo.js');
    global.getMediaUrlInfo = require('./getMediaUrlInfo.js');
    global.uploadPicture = require('./uploadPicture.js');
    global.getMediaType = require('./getMediaType.js');
    global.getPhotoUrl = require('./getPhotoUrl.js');
    //The same as alias
    global.getVideoUrl = require('./getPhotoUrl.js');
    global.getInbox = require('./getInbox.js');
    global.getInboxPending = require('./getInboxPending.js');
    global.approveInboxPending = require('./approveInboxPending.js');
    global.declineInboxPending = require('./declineInboxPending.js');
    global.replyDirectMessage = require('./replyDirectMessage.js');
    global.getSimilarAccountsByUserId = require('./getSimilarAccountsByUserId.js');
    global.commentPost = require('./commentPost.js');
    global.getPostCommentsById = require('./getPostCommentsById.js');
    global.getMyLastFollowers = require('./getMyLastFollowers.js');
    global.setAntiBanMode = require('./setAntiBanMode.js');
    global.executeAntiBanChecks = require('./executeAntiBanChecks.js');
    global.executeWorker = require('./executeWorker.js');
    global.executeAdvancedWorker = require('./executeAdvancedWorker.js');
    try {
        global.detectFaces = require('./detectFaces.js');
        global.imageHaveFaces = require('./imageHaveFaces.js');
    } catch (err) {
        console.log("AI Modules can not be imported");
    }
    process.on('error', (e) => {
        console.log("emmm.")
    });
}

module.exports = toolsForInstagram();