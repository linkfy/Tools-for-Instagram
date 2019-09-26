parser = require('instagram-id-to-url-segment');

async function getMediaIdInfo(ig, media_id){
    return ig.media.info(media_id);
}

module.exports = getMediaIdInfo;

