parser = require('instagram-id-to-url-segment');

async function urlToMediaId(ig, url) {
    let url_segment = url.match(/instagram\.com\/p\/([^\/]*)/)[1];
    media_id = parser.urlSegmentToInstagramId(url_segment);
    return media_id;
}

module.exports = urlToMediaId;