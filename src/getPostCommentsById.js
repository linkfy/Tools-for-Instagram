//more available is not working well from API, looks like a bug, so we need to check manually the same objects
async function getCommentsOnPostById(ig, id, maxComments = 20) {
    
    
    let comments = [];
    
    try{
        let commentsFeed = await ig.feed.mediaComments(id);
        let commentsResponse = await commentsFeed.items();
        

        do{
            let repeatedComment = false;
            let repeats = 0;
            commentsResponse = await commentsFeed.items();
            

            if(commentsResponse.length != 0) {
               
                commentsResponse.forEach(comment => {
                    
                    if (comments.length >= maxComments) {
                        //If already have the max comments, then return it
                        return comments;
                    }
                    
                    if(comment.content_type == 'comment') {
                        
                        for(var i = 0; i < comments.length; i++) {
                            if (comments[i].pk == comment.pk) {
                                repeatedComment = true;
                                repeats++;
                                break;
                            }
                        }
                        if(!repeatedComment) {
                            console.log(comment.text);
                            comments.push(comment);
                        }
                        
                    }
                    
                });

                if(commentsResponse.length == repeats) {
                    //All the revieved elements are already on our comments, finish
                    return comments;
                }
            }
        
        //more available is not working well from API, looks like a bug, so we need to check manually the same objects
        /* if(commentsFeed.moreAvailable == false) {
            //If there are no more, finish the process
            return;
        } */
        
        //If we only get one comment, skip the search too
        if(commentsResponse.length!=0 && commentsResponse.length!=1 && comments.length < maxComments) {
            await sleep(5);
        } else {
            break;
        }
         
        
        } while(commentsResponse.length!=0 && comments.length < maxComments);
        
        return comments;
    } catch(err) {
        console.log(err);
        console.log("Wait a few minutes after getting a lot of comments");
        return comments;
    }
    
}

module.exports = getCommentsOnPostById;