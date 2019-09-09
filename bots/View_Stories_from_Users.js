
require('../src/tools-for-instagram.js');

let usernames = ['potticats', 'annabelle_atl'];

(async () => {

    
    let totalViews = 0;
    let ig = await login();
    for(let i = 0; i < usernames.length; i++) {
        totalViews += await viewStoriesFromUser(ig, usernames[i]);
    }

    console.log('Total viewed stories ' + totalViews);
    console.log("\nProcess done!\n".green);
    
})();


