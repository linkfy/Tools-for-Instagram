async function getPhotoUrl(ig, mediaIdOrPostUrl, hd = true){
    
    let info;
    let type = await getMediaType(ig, mediaIdOrPostUrl);

    if(validURL(mediaIdOrPostUrl)) {
        let mediaId = await urlToMediaId(ig, mediaIdOrPostUrl);
        info = await getMediaIdInfo(ig, mediaId);
       
    //Is nor URL, them MediaId
    } else {
        info = await getMediaIdInfo(ig, mediaIdOrPostUrl);
        
    }
    //console.log(type);


    if(hd) {
        switch (type) {
            case 'photo':
                return info.items[0].image_versions2.candidates[0].url;
            case 'video':
                return info.items[0].video_versions[0].url;
            case 'album':
                return info.items[0].carousel_media[0].image_versions2.candidates[0].url;
            default: 
                return undefined;
    
        }

    } else {
        switch (type) {
            case 'photo':
                return info.items[0].image_versions2.candidates.pop().url;
            case 'video':
                return info.items[0].video_versions.pop().url;
            case 'album':
                return info.items[0].carousel_media[0].image_versions2.candidates.pop().url;
            default: 
                return undefined;
    
        }
    }

    //Return null when is not any kind
    return undefined;
    
}

module.exports = getPhotoUrl;

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }