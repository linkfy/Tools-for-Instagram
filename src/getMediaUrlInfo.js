parser = require('instagram-id-to-url-segment');

async function getMediaUrlInfo(ig, url){
    if(!validURL(url)) {
        return 'Url not valid';
    }
    let mediaId = await urlToMediaId(ig, url);
    return await getMediaIdInfo(ig, mediaId);
}

module.exports = getMediaUrlInfo;



function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }