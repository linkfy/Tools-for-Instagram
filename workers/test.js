global.noLogo=true;
require("../src/tools-for-instagram.js");
module.exports = async function (callback) {
    
    await login();
    callback(null, true)

}
