
async function imageHaveFaces(ig, url) {
    let result = await detectFaces(ig,url);
    if(result.length > 0) {
        return true;
    } else {
        return false;
    }
}
module.exports = imageHaveFaces;