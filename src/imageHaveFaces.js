
async function imageHaveFaces(ig, url) {
    let result = await detectFaces(ig,url);
    if(result != false) {
        return true;
    } else {
        return false;
    }
}
module.exports = imageHaveFaces;