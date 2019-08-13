let login =  require('./login.js');

(async () => {
    console.log('1 --LOGIN--');
    let ig = await login();
    if(ig==undefined) {
        return console.log("Login failed"); 
    }
    console.log("Process done!");
})();
