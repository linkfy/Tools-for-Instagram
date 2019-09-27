
require('./src/tools-for-instagram.js');

(async () => {


    console.log("\n -- TESTING --\n".bold.underline);
    let ig = await login();
        
    let posts = await recentHashtagList(ig, "dogs");
    await commentPost(ig, posts[0], "Lovely!");
    console.log("\nProcess done!\n".green);
    
})();

