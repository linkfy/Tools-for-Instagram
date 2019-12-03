
require('./src/tools-for-instagram.js');

(async () => {

    console.log("\n1 -- LOGIN --\n".bold.underline);
    
/*  
    //The same but using proxy:
    let proxy = process.env.IG_PROXY;
    proxy = proxy.split("@");
    let proxyAuth = proxy[0].split(":");
    proxyAuth[1] = proxyAuth[1].replace("//","")
    let proxyInfo = proxy[1].split(":");
    let proxyConfig = {
        host: proxyInfo[0],
        port: proxyInfo[1],
        protocol: 'https',
        auth: {
            username: proxyAuth[1],
            password: proxyAuth[2]
        }
    }
    await spider.getUserLikers('instagram', proxyConfig);
    */
    
    
    let ig = await login();
    //We need a clean session first.
    ig = await regenerateSession(ig);
    
    let counter = 0;
    let likes = 0;

    /*
    //CLASSIC WAY, not recommended for more than 10k users:

                                        //One iteration will get 10k~ aprox
    //let getResult = await getFollowers(ig, 'instagram', maxIterations = 4);
    //let followers = await readFollowers(ig, 'instagram');
    */
    
    
    let followers = await spider.getUserLikers('instagram', maxUsers = 1000);
    let currentUser = followers[0];

    do {
        await sleep(1);
        counter+=1;
        /*
            Each 40 iterations regenerate session and sleep,
            It is not perfect, sometimes too many requests per seconds
            will result in 429 error, so we will handle it later
        */
        if(counter%40 == 0) {
            ig = await regenerateSession(ig);
            sleep(60);
        }
        let follower = followers.pop();
        try {
            let data = await getUserInfo(ig, follower.username);
            currentUser = data;
            console.log(`${counter} - ${data.username}`);
            /*
                Each 10 users we will try to like one of them
                some users are private or does not have posts
                so consider that some of the iterations will fail liking
            */
            if(counter%10 == 0) {
                let posts = await getUserRecentPosts(ig, follower.username);
                await likePost(ig, posts[0]);
                likes +=1;
                console.log(`Total likes ${likes}`.cyan);

            }
        } catch(e) {
            /*
                If we get an error we will see the number
                if it is a 429 we must wait 60 seconds
                and put again the user to the list before trying again
                otherwise just ignore and continue
            */
            console.log("Error " + e);
            if(e.response !== undefined) {
                if(e.response.statusCode == 429) {
                    //Send back to the list
                    counter -=1;
                    followers.push(currentUser);
                    await sleep(60);
                }
            }
        }
    /*
        Sometimes the benchmark can be terminated after long sessions
        by internal server error [500] from instagram
        (Very strange, but possible)
     */
        
    } while(true);

    console.log("\nProcess done!\n".green);
    
})();

