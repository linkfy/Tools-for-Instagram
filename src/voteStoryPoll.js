async function voteStoryPoll(ig, post, value = 1) {
    let media_id = post.id;
    //If it is undefined we are not parsing a post
    if(post.story_polls == undefined) {
        return false;
    }
    let poll_id = post.story_polls[0].poll_sticker.poll_id;
    if(post.story_polls[0].poll_sticker.viewer_vote == undefined) {
        try {
            
            ig.media.storyPollVote(media_id, poll_id, value);
            console.log(("Vote sended to media_id: "+ media_id).green);
            return true;
        } catch(e) {
            console.log("Error sending vote");
            return false;
        }
    } else {
        console.log(("Media_id: "+ media_id + " was already voted").yellow);
        return false;
    }
}
module.exports = voteStoryPoll;
