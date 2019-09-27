
parser = require('instagram-id-to-url-segment');

/*
    The id we have to use is the one corresponding to threadId.
    example : getInboxPending(ig).threadId; (getInboxPendig.js:12)
    Version 2 of the ids are not yet being used
    TODO: 
    [ ]check if the message exists in getInboxPending()
    [ ]Improve return
*/
async function declineInboxPending(ig, threadId){ 
    let decline = await ig.directThread.decline(threadId)
    return decline
}

module.exports = declineInboxPending;
