parser = require('instagram-id-to-url-segment');
let Promise = require("bluebird");
let fs = Promise.promisifyAll(require("fs"));

async function uploadPicture(ig, caption, picturePath, namesToTag = [], extraInfo = new Object()) {
    //ig.publish.photo It can only support files in buffer
    let pictureBuffer = await fs.readFileAsync(picturePath);
    let pictureSizeInBytes = await fs.statSync(picturePath);
    let publishedPicture

    /*  
        As of today 26/09/2019 
        The maximum length of the caption is 2200
        The maximum size in MB is 60
        The aspect ratios valids are 1:1 max=1080x1080 min=600x600, 4:5 max=1080x1350 min=480x600, 1.91:1 max=1080x566 min=600x400
        References : https://metricool.com/instagram-image-size/ , https://www.quora.com/What-is-the-maximum-file-size-on-Instagram , https://www.socialreport.com/insights/article/360020940251-The-Ultimate-Guide-to-Social-Media-Post-Lengths-in-2019
        TODO: check the sizes and aspect ratios... ¿Use a excternal package?
    */

    if (caption.length <= 2200 || pictureSizeInBytes <= 60000000) {
        if (namesToTag.length > 0 && namesToTag != null) {
            //For can't be a foreach to respect the awaits
            let users = [];
            for (i = 0; i < namesToTag.length; i++) {
                let id_tag = await ig.user.searchExact(namesToTag[i]);
                let user = {
                    user_id: id_tag.pk,
                    position: [Math.ceil((Math.random() * 0.9998 + 0.0001) * 100) / 100,
                    Math.ceil((Math.random() * 0.9998 + 0.0001) * 100) / 100]
                }
                users.push(user);
                

            }
                publishedPicture = await ig.publish.photo({
                    caption: caption,
                    file: pictureBuffer,
                    usertags: {
                        in: users
                    },
                })
    
            
            
        }
        else {
            publishedPicture = await ig.publish.photo({
                caption: caption,
                file: pictureBuffer,
            })

        }
        const timestamp = new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000;
        const link = "https://www.instagram.com/p/" + publishedPicture.media.code

        ig.db.get('mediaUploaded').push({ id: ig.shortid.generate(), type: "picture", media_id: parser.urlSegmentToInstagramId(publishedPicture.media.code), caption: caption, link: link, created_at: timestamp, extra_info: extraInfo }).write();

        return console.log("Posted new media: ".green + link.green);

    } else {
        return "cant_post";
    }

}

module.exports = uploadPicture;
