
require('./src/tools-for-instagram.js');

(async () => {

    console.log("\n1 -- LOGIN --\n".bold.underline);
    let config = await loadConfig('linkfytester');
    let ig = await login(config);
    let followers = await readFollowers(ig, 'instagram');
    let counter = 0;
    do {
        await sleep(1);
        counter+=1;
        if(counter%50 == 0) {
            ig = await regenerateSession(ig);
        }
        let follower = followers.pop();
        try {
            let data = await getUserInfo(ig, follower.username);
            console.log(`${counter} - ${data.username}`);
        } catch(e) {
            console.log("Error " + e);
            if(e.response !== undefined) {
                if(e.response.statusCode == 429) {
                    //Send back to the list
                    followers.push(data);
                    await sleep(60);
                }
            }
        }
        
        

        
    } while(true);

    console.log("\nProcess done!\n".green);
    
})();
