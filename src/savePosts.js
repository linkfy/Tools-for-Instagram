let fs = require('fs');

//It is not needed to be async but lets do it for future operations
async function savePosts(ig, posts, filename) {
    fs.writeFileSync('output/'+filename+'.json',JSON.stringify(posts, undefined, '\t'));
    console.log(("Posts saved with the name " + filename + ".json in the 'output' folder").green);
}

module.exports = savePosts;