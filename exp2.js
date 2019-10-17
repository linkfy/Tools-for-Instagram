require("./src/tools-for-instagram.js");

(async () => {
    ig = await login();

    //To get all the Following/Followers and see the stories:

    
    //await viewStoriesFromFollowing(ig, 'minioffer');
    //await viewStoriesFromFollowers(ig, 'Instagram');
    
    // For big accounts:
    // Get only 1 iteration of Followers
    //Each iteration is around 10.000 accounts
    
    
    console.log("Starging bot at " + Date(Date.now()));
    await viewStoriesFromFollowing(ig, 'instagram', it = 1);
    console.log("Starging bot at " + Date(Date.now()));
    await viewStoriesFromFollowers(ig, 'instagram', it = 10);
    console.log("Finish bot at " + Date(Date.now()));

})();

