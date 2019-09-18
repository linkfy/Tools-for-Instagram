
require('./src/tools-for-instagram.js');

(async () => {

    console.log("\n1 -- LOGIN --\n".bold.underline);
    let ig = await login();


    

    
    let likers = await getRecentPostLikersByUsername(ig, 'instagram');
    console.log(likers.length);
    console.log(likers[likers.length-1]);

    

    
    
    console.log("\nProcess done!\n".green);
    
})();
