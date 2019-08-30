//Async is not needed here but will do it to keep code style
async function removeCookie(ig, cookie_name = null) {
    let fileanme;
    if (cookie_name != null) {
        filename = cookie_name.toLowerCase();    
    } else {
        filename = (ig.loggedInUser.username).toLowerCase();
    }
    
    var cookiepath = "cookies/" + filename + ".json";
    
    return await fs.unlinkSync(cookiepath), function (err) { 
        
        if (err) throw err;
        console.log('Cookie deleted!'.red); 
    }
    
}

module.exports = removeCookie;