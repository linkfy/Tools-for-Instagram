
require('./src/tools-for-instagram.js');

(async () => {

    console.log("\n -- TESTING --\n".bold.underline);

    let ig = await login();

    
    console.log("\nProcess done!\n".green);
    
})();
