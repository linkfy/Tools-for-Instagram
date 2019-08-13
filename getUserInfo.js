async function getUserInfo(ig, username) {
    let pk = await ig.user.getIdByUsername(username);
    let info = await ig.user.info(pk);
    return info;
}
module.exports = getUserInfo;
