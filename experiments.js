
require('./src/tools-for-instagram.js');



(async () => {

    let hashtag = "model";
    console.log("\n -- Testing --\n".bold.underline);
    let ig = await login();
    
    //let posts = await topHashtagList(ig, hashtag);

    let posts = await topHashtagList(ig, "dogs");
    let postId = posts[0].pk;
    let comments = await getCommentsOnPostById(ig, postId, 100);
    //console.log(comments);
    //console.log(comments.length);
    //console.log(posts[0]);
    
    
    //console.log(commentsResponse.length);
    
})();

