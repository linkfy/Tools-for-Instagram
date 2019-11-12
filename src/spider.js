const axios = require('axios');
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
spider.getUserInfo = getUserInfo;
spider.userHasStories = userHasStories;

module.exports = spider;