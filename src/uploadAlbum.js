parser = require('instagram-id-to-url-segment');
let Promise = require("bluebird");
let fs = Promise.promisifyAll(require("fs"));

async function uploadAlbum(ig, caption, album, namesToTag = [], extraInfo = new Object()) {

    let albumPublish = [];

    if (caption.length >= 2200) {
        throw new Error("Caption length cannot be biggest 2200");
        return;
    }

    if (album.length > 0) {

        let albumlength = album.length;
        for (item = 0; item < albumlength; item++) {
            
            let pictureSizeInBytes = await fs.statSync(album[item]);
            let pictureBuffer = await fs.readFileAsync(album[item]);
            let taggedUsers = [];

            if (pictureSizeInBytes >= 60000000) {
                throw new Error("bytes of picture cannot be biggest 60000000");
                return;
            }
            if (namesToTag.length > 0 && namesToTag != null) {
                for (u = 0; u < namesToTag.length; u++) {
                    let id_tag = await ig.user.searchExact(namesToTag[u]);
                    let user = {
                        user_id: id_tag.pk,
                        position: [Math.ceil((Math.random() * 0.9998 + 0.0001) * 100) / 100,
                        Math.ceil((Math.random() * 0.9998 + 0.0001) * 100) / 100]
                    }
                    taggedUsers.push(user);
                }
            }
            console.log(taggedUsers);
            let imageToAlbum = {
                file: pictureBuffer,
                usertags: {in: taggedUsers},      
            }
            
            albumPublish.push(imageToAlbum)
        }

        const uploadAlbum = {
            caption: caption,
            items: albumPublish
        };

        console.log("Publication: ", uploadAlbum);

        let publishedPicture = await ig.publish.album(uploadAlbum);

        const timestamp = new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000;
        const link = "https://www.instagram.com/p/" + publishedPicture.media.code

        ig.db.get('mediaUploaded').push({ id: ig.shortid.generate(), type: "picture", media_id: parser.urlSegmentToInstagramId(publishedPicture.media.code), caption: caption, link: link, created_at: timestamp, extra_info: extraInfo }).write();

        return link

    } else {
        throw new Error("list of album cannot be null.");
    }
}

module.exports = uploadAlbum;
