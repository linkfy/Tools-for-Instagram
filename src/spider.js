const axios = require('axios');
parser = require('instagram-id-to-url-segment');
let spider = new Object();

async function getUserInfo(username){
    return new Promise(async(resolve,reject) => {         
    let info = undefined;
    try {
        
        const config = {
            method: 'get',
            url: `https://instagram.com/${username}/?__a=1`,
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36' }
        }
        let instagramResponse = await axios(config);
        
        info = instagramResponse.data.graphql.user;
        //Just a copy of the value to match the native style:
        info.pk = info.id;
        let lastFeedPosts = instagramResponse.data.graphql.user.edge_owner_to_timeline_media.edges
        lastFeedPosts = lastFeedPosts.map((posts) => {
            return{
                id : posts.node.id,
                url : posts.node.display_url
            }
        })
        info.lastFeedPosts = lastFeedPosts;
        
    } catch (error) {
        console.log(error)
    }
    
    console.log(`Received info from ${username}`.green);
    resolve(info);
    //console.log(allAccs)
    });
}



async function userHasStories(username) {
    let userinfo = await getUserInfo(username);
    return new Promise(async(resolve, reject) => {
        let info = undefined;
        try {
            const config = {
                method: 'get',
                url: 'https://www.instagram.com/graphql/query/?query_hash=aec5501414615eca36a9acf075655b1e&variables={"user_id":"'+userinfo.id+'","include_logged_out_extras":true}',
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36' }
            }
            info = await axios(config);
            info = info.data.data.user.has_public_story;
        } catch (error) {
            console.log(error)
        }
        resolve(info);
    });

}

/* async function getFreeProxy() {
    let result = undefined;
    
    const config = {
        method: 'get',
        url: 'https://api.getproxylist.com/proxy'
    }
    try {
        result = await axios(config);
        result = result.data;
        return result;
    } catch (e) {
        console.log(e);
        return result;
    }
}
 */

async function getUserLikers(username, maxUsers = undefined, proxyConfig = undefined) {
    let userInfo = await getUserInfo(username);
    
    let lastPost = userInfo.lastFeedPosts[0];
    let urlSegment = parser.instagramIdToUrlSegment(lastPost.id);
    let results = [];
    try {
        
        let url = null;
        let nextCursor = null;
        let hasMoreUsers = false;
        do {
            let proxy = null;
            if(proxyConfig != undefined) {
                proxy = proxyConfig;
            }

            //console.log("Continue");
            if(nextCursor) {
                url = 'https://www.instagram.com/graphql/query/?query_hash=d5d763b1e2acf209d62d22d184488e57&variables={"shortcode":"'+urlSegment+'","include_reel":true,"first":50, "after": "'+nextCursor+'"}';
            } else {
                url = 'https://www.instagram.com/graphql/query/?query_hash=d5d763b1e2acf209d62d22d184488e57&variables={"shortcode":"'+urlSegment+'","include_reel":true,"first":50}';
            }
            const config = {
                method: 'get',
                url: url,
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36' },
                proxy: proxy
            }
            let info = await axios(config);
            info = info.data;
    
            /*
            edge_liked_by:
                    count
                    page_info
                        has_next_page
                        end_cursor
                    edges
                        [0]
                            node
                                id
                                username
            */
    
            let parsedData = info.data.shortcode_media.edge_liked_by;
            hasMoreUsers = parsedData.page_info.has_next_page;
            nextCursor = parsedData.page_info.end_cursor;
    
            let receivedUsers = parsedData.edges;
            let users = receivedUsers.map(({node}) => node);
            results.push(...users);
            if(!hasMoreUsers) {
                console.log("Received users: " + results.length);
            } else {
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                process.stdout.write("Received users: " + results.length);
            }
            if(maxUsers!= undefined && results.length >= maxUsers) {
                console.log("\nMax users signal received!".cyan);
                break;
            }
            if(results.length%8000 == 0) {
                await sleep(60*15);
            }
            //await sleep(1);

        } while(hasMoreUsers);


    } catch (error) {
        console.log(error)
    }
    
    console.log("Received users: " + results.length);
    return results;
}
spider.getUserInfo = getUserInfo;
spider.userHasStories = userHasStories;
//spider.getFreeProxy = getFreeProxy;
spider.getUserLikers = getUserLikers;


module.exports = spider;