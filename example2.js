
require('./src/tools-for-instagram.js');

(async () => {

    console.log("\n1 -- LOGIN --\n".bold.underline);
    let ig = await login();


    
    
    //posts = await topHashtagList(ig, "dogs");
    //await likePost(ig, posts[0]);

    let posts = await getUserRecentPosts(ig, 'instagram');
    console.log(posts[0]);
    let likers = await ig.media.likers(posts[0].pk).then((r) => {return r.users});
    console.log(likers.length);
    

    
    
 
    /*     let info = await getUserInfo(ig, 'thelinkfy');
    let feed = await ig.feed.user(info.pk);
    let list = [];
    do {
        moreList = await feed.items();
        Array.prototype.push.apply(list,moreList);
        console.log(list[list.length-1]);
        console.log(list.length);
       
    } while(feed.moreAvailable == true);
    
    console.log(list.length);
    
    return;
    let likers = await ig.media.likers(list[0].pk).then((r)=> {return r.users});
    
 */
    //console.log(await ig.user.accountDetails(info.pk));
    //let likers = await ig.media.likers(posts[0].pk);
   /*  console.log(likers.length);
    //console.log(likers[0]);
    
    setInterval(async function() {
        let moreLikers = await ig.media.likers(list[0].pk).then((r)=> {return r.users});
        let moreLikers2 = await ig.media.likers(list[1].pk).then((r)=> {return r.users});
        let moreLikers3 = await ig.media.likers(list[2].pk).then((r)=> {return r.users});
        likers = likers.concat(moreLikers).uniqueIdUser();
        likers = likers.concat(moreLikers2).uniqueIdUser();
        likers = likers.concat(moreLikers3).uniqueIdUser();
        console.log(likers.length);
    },1000); */
    console.log("\nProcess done!\n".green);
    
})();

//When concat dont add the same user Id on different iterations
Array.prototype.uniqueIdUser = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i].pk === a[j].pk)
                a.splice(j--, 1);
        }
    }

    return a;
};