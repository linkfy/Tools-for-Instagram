async function getCommentsOnPostById(ig, id, maxComments = 20) {
    
    
    let comments = [];
    let lastComment = null;
    try{
        let commentsFeed = await ig.feed.mediaComments(id);    
        let commentsResponse = await commentsFeed.items();

        do{
            commentsResponse = await commentsFeed.items();
            if(commentsResponse.length != 0) {
                commentsResponse.forEach(comment => {
                    
                    if (comments.length >= maxComments) {
                        //If already have the max comments, then return it
                        return;
                    }

                    if(lastComment == comment) {
                        //Last saved comment == current coment then return
                        console.log("Same");
                        return;
                    }
                    
                    if(comment.content_type == 'comment') {
                        console.log(comment.text);
                        console.log(comment.pk);
                        comments.push(comment);
                    }
                    lastComment = comment;
                });
            }
     
         await sleep(5);
         console.log(comments.length);
        
        } while(commentsResponse.length!=0 && comments.length < maxComments);
        
        return comments;
    } catch(err) {
        console.log(err);
        console.log("Wait a few minutes after getting a lot of comments");
        return comments;
    }
    
}

module.exports = getCommentsOnPostById;