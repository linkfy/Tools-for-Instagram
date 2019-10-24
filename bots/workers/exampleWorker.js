const {threadId} = require('worker_threads')
global.noLogo=true;
require("../../src/tools-for-instagram.js");

module.exports = function (accountName, callback) {
    (async () => {
        let ig = await login(loadConfig(accountName));

        let info = await getUserInfo(ig, 'Instagram');
        return callback(null, info);
    })();
}