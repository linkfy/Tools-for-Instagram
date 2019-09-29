
require('./src/tools-for-instagram.js');



(async () => {

    
    console.log("\n -- Testing --\n".bold.underline);
    let ig = await login();


    let comments = await getCommentsOnPostById(ig, '1819847729498884138');
    console.log("---");

    comments.forEach(comment => {
        console.log(comment.text);
    });
    console.log(comments.length);

    
    
    //console.log(commentsResponse.length);
    
})();

