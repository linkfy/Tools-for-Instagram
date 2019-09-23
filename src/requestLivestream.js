Bluebird = require("bluebird");
let Api = require('instagram-private-api');
async function requestLivestream(ig) {
    
    const { broadcast_id, upload_url } = await ig.live.create({
    // create a stream in 720x1280 (9:16)
    previewWidth: 720,
    previewHeight: 1280,
    // this message is not necessary, because it doesn't show up in the notification
    message: 'My message',
    });
    // (optional) get the key and url for programs such as OBS
    const { stream_key, stream_url } = Api.LiveEntity.getUrlAndKey({ broadcast_id, upload_url });
    console.log(`Start your stream on ${stream_url}\n
Your key is: ${stream_key}`.cyan);
    //console.log('Your broadcast id: '+ broadcast_id);
    /**
     * make sure you are streaming to the url
     * the next step will send a notification / start your stream for everyone to see
     */
    const startInfo = await ig.live.start(broadcast_id);
    // status should be 'ok'
    console.log("Status:" + startInfo.status);

    /**
     * now, your stream is running
     * the next step is to get comments
     * note: comments can only be requested roughly every 2s
     */

    // initial comment-timestamp = 0, get all comments
    let lastCommentTs = await printComments(ig, broadcast_id, 0);

    // enable the comments
    await ig.live.unmuteComment(broadcast_id);
    /**
     * wait 2 seconds until the next request.
     * in the real world you'd use something like setInterval() instead of Bluebird.delay() / just to simulate a delay
     */
    // wait 2s
    await Bluebird.delay(2000);
    let finishStream = false;  
    let info = await ig.live.info(broadcast_id);
    //console.log(info.dash_playback_url);
    console.log("Watch the preview here: https://iglivepreview.glitch.me/?liveUrl="+info.dash_playback_url);
    console.log();
    //console.log(info.dash_live_predictive_playback_url);
    

    process.on('SIGINT', function() {
        finishStream = true;
    });

    // now, we print the next comments
    console.log("On Live...".green)
    console.log("Use Ctrl+C to End".cyan);
    do {
        await sleep(3, false);
        lastCommentTs = await printComments(ig, broadcast_id, lastCommentTs);
        // now we're commenting on our stream
        //await ig.live.comment(broadcast_id, 'Probando retransmisiones desde el PC');

    } while (!finishStream);


    // now you're basically done

    
    await ig.live.endBroadcast(broadcast_id);
    console.log("Stream finished".green)
}

module.exports = requestLivestream;


async function printComments(ig, broadcastId, lastCommentTs) {
    const { comments } = await ig.live.getComment({ broadcastId, lastCommentTs });
    if (comments.length > 0) {
      comments.forEach(comment => console.log(`${comment.user.username}: ${comment.text}`));
      return comments[comments.length - 1].created_at;
    } else {
      return lastCommentTs;
    }
  }