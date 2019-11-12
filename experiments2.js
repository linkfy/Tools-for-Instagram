require('./src/tools-for-instagram');

(async () => {

    let info = await spider.userHasStories("TheLinkfy");
    console.log(info);
})();