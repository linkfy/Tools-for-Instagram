let Promise = require("bluebird");
var rp = require('request-promise');

async function uploadPictureByUrl(ig, caption, pictureUrl) {
    try {
        let imageBuffer = await rp.get({
            url: pictureUrl,
            encoding: null
        });
    
        let publishResult = await ig.publish.photo({
            file: imageBuffer,
            caption: caption
        });
    
        return console.log("Posted new media with url: ".green + pictureUrl.green);
    } catch(e) {
        console.log("Can not post image URL".red);
        return console.log(e);

    }
    
}

module.exports = uploadPictureByUrl;