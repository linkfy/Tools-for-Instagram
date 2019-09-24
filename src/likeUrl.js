
parser = require('instagram-id-to-url-segment');
_ = require('lodash');
likeMediaId = require('./likeMediaId.js');

async function likeUrl(ig, url, forceLike = false){
    let url_segment = url.match(/instagram\.com\/p\/([^\/]*)/)[1];
    media_id = parser.urlSegmentToInstagramId(url_segment);
    await likeMediaId(ig, media_id, forceLike);
    //return console.log("Liked by URL " + url);
}

module.exports = likeUrl;
