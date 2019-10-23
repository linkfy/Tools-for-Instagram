async function getUserInfo(ig, username) {
    let pk = await ig.user.getIdByUsername(username);
    let info = await ig.user.info(pk);
    try {
        //If its not null make an alias
        info.id = pk;
    } catch (err) {

    }
    console.log("User information received".green)
    return info;
}
module.exports = getUserInfo;
