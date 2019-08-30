
require('../src/tools-for-instagram.js');


(async () => {

    let likesPerInterval = 15;
    let waitMinutesBetweenLikesPerInterval = 3;

    let intervals = [
        ["7:00",    "8:00"],
        ["10:00",   "11:00"],
        ["14:00",   "15:00"],
        ["17:00",   "18:00"],
        ["20:00",   "21:00"],
        ["22:00",   "23:00"],
    ];

    let hashtagArray = [
        "cats",
        "dogs",
        "chameleon",
        "fish",
        "gaming",
        "music"
    ];
    
    let ig = await login();
    
    

    
})();

    
    //await followUser(ig, "Instagram", force = true);
    //await likeUrl(ig, "https://www.instagram.com/p/B1earbyAT0Z/", force = true);
    //await unfollowUser(ig, "Instagram", force = true);
    //let posts = await recentHashtagList(ig, "animals");spp
    //await followUserByPost(ig, posts[0]);
    //await sleep(30);
    //posts = await recentHashtagList(ig, "iguana");
    //await followUserByPost(ig, posts[0]);


    //Experimental Stuff going on for scapping

// ----------------------
/*  let info = fs.readFileSync("./output/instagram_followers.json");
    let enc = new TextDecoder("utf-8");
    let decodedInfo = enc.decode(info);
    let followers = JSON.parse(decodedInfo);
    //The last element is EOF, so we can delete it
    followers.pop();
    console.log(followers[followers.length-1]); */
// ----------------------
    
