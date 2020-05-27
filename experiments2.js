require('./src/tools-for-instagram');

(async () => {


    let ig = await login();
    console.log(await getUserInfo(ig, "instagram"));
    setInterval(function() {
        console.log("Waiting random time".green);
    }, 10000);
    
})();
