async function getPollsFromStories(ig, stories) {
    let storiesWithPolls = [];
    try {
        
        stories.forEach(post => {
            if(post.story_polls) {
                storiesWithPolls.push(post);
                
            }
        });
    } catch(e) {
        console.log(e);
        console.log("Could not get polls from stories".red);
    }
    console.log("Polls process finished".cyan);
    return storiesWithPolls;
}
module.exports = getPollsFromStories;

//Vote poll
/*
let media_id = post.id;
            let poll_id = post.story_polls[0].poll_sticker.poll_id;
            if(post.story_polls[0].poll_sticker.viewer_vote == undefined) {
                try {
                    
                    ig.media.storyPollVote(media_id, poll_id, 1);
                    console.log(("Vote sended to media_id: "+ media_id).green);
                } catch(e) {
                    console.log("Error sending vote");
                }
            } else {
                console.log(("Media_id: "+ media_id + " was already voted").yellow);
            }
 */