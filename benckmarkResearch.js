
require('./src/tools-for-instagram.js');

(async () => {

    console.log("\n1 -- LOGIN --\n".bold.underline);
    await spider.getUserFans('instagram');


    return;
    let ig = await login();
    //We need a clean session first.
    ig = await regenerateSession(ig);
    let counter = 0;
    let likes = 0;
                                        //One iteration will get 10k~ aprox
    let getResult = await getFollowers(ig, 'instagram', maxIterations = 4);
    let followers = await readFollowers(ig, 'instagram');
    let currentUser = followers[0];
    if(currentUser == undefined) {
        pokeBug();
        console.log("Some wild error appeared!".yellow);
        await sleep(1, false);
        console.log("It's a Pokemon Bug type");
        await sleep(1, false);
        console.log("Tfi used, teleport!");
        await sleep(1, false);
        console.log("Tfi ran from battle!");
        process.exit();
    }

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


function pokeBug() {
    console.log("           _,--'\"\"\"\"\"\"---.._");
    console.log("         ,'                 `._");
    console.log("       ,'                      `.");
    console.log("     ,'                          \\");
    console.log("    .                             \\");
    console.log("  ,'.                  ,-`.        \\");
    console.log(" /   \\               ,'    ,        \\");
    console.log("|`.  |\\            ,`      |         |");
    console.log("L  `.| |         .''     _,'        _'");
    console.log(" \\    \"'        ,`'_..-''        _,'");
    console.log("  `.            '\"\"          _,.' `.");
    console.log("    /._                 _..-\"       \\");
    console.log("   /   `.          _,.-'             \\");
    console.log("  /      \\-.___.--'/                  \\");
    console.log(" |      ,/.     .-^+.._               F");
    console.log("  L..-''.' \\  .'   |   `'--.....___   .");
    console.log("  /     /   `/     |               `\"-;");
    console.log(" /     j    j      '                ,'");
    console.log(" `.    |    |       L          _.-'Y");
    console.log("  ,`._/     |        .    _,.-'     .");
    console.log("  `.  '|    |         \\\"\"\"|         |");
    console.log("   |   |    |         |   |         |");
    console.log("   |   |    |        ,'   |         |");
    console.log("   |   L    +      ,'     |         |");
    console.log("   |    \\    L    ,\\      j         |");
    console.log("   L     \\   |   /  `.   /          j");
    console.log("    \\    j\\  |  /    `. /          .");
    console.log("     L  .  ` | /       \\          /");
    console.log("     +  |   `|/                  /");
    console.log("      \\ | _,..._         \\      /");
    console.log("       ./'      `-._      \\   ,'");
    console.log("        l           `.     ^_/");
    console.log("        +             `   /");
    console.log("         L-\"\"--.       .,'");
    console.log("         |      `.     ,");
    console.log("         .        \\  ,'");
    console.log("          `       _.'");
    console.log("           `....-' mh");
}
