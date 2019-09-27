
require('./src/tools-for-instagram.js');

(async () => {


    console.log("\n -- TESTING --\n".bold.underline);
    let ig = await login();
        
    console.log(await getMediaUrlInfo(ig, "https://www.instagram.com/p/B21mBXjIjeX/"));
    
})();
