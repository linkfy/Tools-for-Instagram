async function getUserInfo(ig, username) {
    let pk = await ig.user.getIdByUsername(username);
    let info = await ig.user.info(pk);
    console.log("User information received".green)
    return info;
}
module.exports = getUserInfo;
