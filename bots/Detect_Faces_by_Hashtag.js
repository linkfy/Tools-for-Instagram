
require('../src/tools-for-instagram.js');



(async () => {

    let hashtag = "model";
    console.log("\n -- Face Detector --\n".bold.underline);
    let ig = await login();
    
    let posts = await recentHashtagList(ig, hashtag);
    console.log("Posts received: ".cyan + posts.length);
    let promises = [];
    for(let i = 0; i < posts.length; i++) {
        let post = posts[i];
        promises.push(detectPost(ig, post));
    
    }
    Promise.all(promises).then(function(){
        console.log("end");
    });
    
})();


async function detectPost(ig, post) {
    try {
            
        let type = await getMediaType(ig, post.pk);
        //Easy to download when is not hd, and also easy to scan on AI
        let url = await getPhotoUrl(ig, post.pk, hd = false);
        if(type == 'photo') {
            //detect faces
            //console.log("is a photo".green);
            let faceInfo = await detectFaces(ig, url);
            if(faceInfo!=false) {
                let gender = faceInfo[0].gender;
                let probability = faceInfo[0].genderProbability;
                probability *= 100;
                probability = parseInt(probability);
                let age = parseInt(faceInfo[0].age);

                console.log("Gender: ".cyan + gender + ", "+"Prob: ".yellow+ probability + "%,  " + "url: ".magenta +url);
                console.log("-------------");
                return;
            }
        } else {
            //console.log("------ Not a photo, skipping ------".yellow);
            return;
            
        }
    } catch (err) {
            console.log(err.yellow);
            //console.log("------ Error getting media, skipping ------".yellow);
            return;
    }
}