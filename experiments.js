
require('./src/tools-for-instagram.js');

var ref, urlSegmentToInstagramId, instagramIdToUrlSegment;
ref = require('instagram-id-to-url-segment')
instagramIdToUrlSegment = ref.instagramIdToUrlSegment
urlSegmentToInstagramId = ref.urlSegmentToInstagramId;
(async () => {

    console.log("\n -- TESTING --\n".bold.underline);

    console.log("\n1 -- LOGIN --\n".bold.underline);
    let ig = await login();

    let posts = await recentHashtagList(ig, "ronaldo");
    console.log(posts[0]);
    //console.log(posts[0].carousel_media[0].image_versions2.candidates);
    //2140377752218735008_1511157103
    //console.log(instagramIdToUrlSegment('2140377752218735008'));

    //detectFaces
    //requestLivestream

   
    console.log("\nProcess done!\n".green);
    
})();
