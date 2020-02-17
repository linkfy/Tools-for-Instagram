require('./src/tools-for-instagram');

(async () => {

    
    let ig = await login();
    console.log(await getUserInfo(ig, "instagram"));
    
})();
