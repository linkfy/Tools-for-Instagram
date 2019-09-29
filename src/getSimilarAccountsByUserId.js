async function getSimilarAccountsByUserId(ig,userId, maxLengthToShow = 80){
    //Max chaining lenght is 80
    //Check if new accounts have chain ON
    //Show by maxLengthToShow
    let similarAccounts = await ig.discover.chaining(userId.toString());
    return similarAccounts.length == 0 ? "chain_not_found" : similarAccounts
}


module.exports = getSimilarAccountsByUserId;