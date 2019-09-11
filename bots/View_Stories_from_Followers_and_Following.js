require("../src/tools-for-instagram.js");

(async () => {
    ig = await login();

    //To get all the Following/Followers and see the stories:
    
    await viewStoriesFromFollowing(ig, 'minioffer');
    await viewStoriesFromFollowers(ig, 'minioffer');    
    
    // For big accounts:
    // Get only 1 iteration of Followers
    //Each iteration is around 10.000 accounts
    
    await viewStoriesFromFollowing(ig, 'instagram', it = 1);
    await viewStoriesFromFollowers(ig, 'instagram', it = 1);

})();

