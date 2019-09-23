
require('../src/tools-for-instagram.js');

(async () => {

    console.log("\n -- LIVE STREAM --\n".bold.underline);
    
    let ig = await login();
    console.log();
    console.log("Don't start the phone session while livestreaming or it will end".yellow);
    await requestLivestream(ig);

    
    console.log("\nProcess done!\n".green);
    
})();
