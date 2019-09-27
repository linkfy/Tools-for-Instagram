parser = require('instagram-id-to-url-segment');

/*
    The id we have to use is the one corresponding to threadId.
    example : getInboxPending(ig).threadId; (getInboxPendig.js:12)
    Version 2 of the ids are not yet being used
    TODO: 
    [ ]check if the message exists in getInboxPending()
    [ ]Improve return
*/

async function approveInboxPending(ig, threadId){ 
    let approve = await ig.directThread.approve(threadId)
    return approve
}

module.exports = approveInboxPending;
