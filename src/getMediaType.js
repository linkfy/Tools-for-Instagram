async function getMediaType(ig, mediaIdOrUrl, debug = false) {
    let type;
    //Is URL
    if(validURL(mediaIdOrUrl)) {
        let mediaId = await urlToMediaId(ig, mediaIdOrUrl);
        let info = await getMediaIdInfo(ig, mediaId);
        type = info.items[0].media_type;
        if(debug) {

            console.log(info.items[0]);
        }
    //Is nor URL, them MediaId
    } else {
        let info = await getMediaIdInfo(ig, mediaIdOrUrl);
        type = info.items[0].media_type;
        if(debug) {

            console.log(info.items[0]);
        }
    }
    

    //Photo: 1
    //Video: 2
    //IG TV : 2
    switch (type) {
        case 1:
            return 'photo';
        case 2:
            return 'video';
        case 8:
            //carousel_media_count
            //carousel_media
            return 'album';
        default:
            //If we don't know the type, give the number type
            return type;
    }
    //We must not arrive to this point
    return 'error';
}

module.exports = getMediaType;



async function analysis(ig, url) {
    let mediaId = await urlToMediaId(ig, url);
    let info = await getMediaIdInfo(ig, mediaId);
    //console.log(info.items);
    info.items.forEach(item => {
        console.log(item.media_type);
    });
    sleep(5, false);
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }