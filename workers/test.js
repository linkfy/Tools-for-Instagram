global.noLogo=true;
//Recreate the ig object
require("../src/tools-for-instagram.js");
const {threadId} = require('worker_threads')

//Api = require('instagram-private-api');
//ig = new Api.IgApiClient();


module.exports = async function (data, useVariableList, callback) {
    
    console.log(data);
    let ig = await login(loadConfig(data));

    let info = await getUserInfo(data, 'Instagram');
    console.log(info);
    
    callback(null, true);

}
