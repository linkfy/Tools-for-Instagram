
require('./src/tools-for-instagram.js');



(async () => {

    
    console.log("\n -- Check for new followers --\n".bold.underline);
    let ig = await login();
    let followers = await getMyLastFollowers(ig);

    console.log(followers[0]);
    console.log(followers[0].is_new_follower);
    
    //console.log(commentsResponse.length);
    
})();

