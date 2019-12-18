async function regenerateSession(ig, log = true) {
    try{
        await removeCookie(ig);
    } catch(e) {
        if(log) {
            console.log("No cookie found, not needed to remove.".yellow);
        }
    }
    if(log) {

        console.log("Regenerating session".cyan);
    }
    return await login({inputLogin: ig.loggedInUser.inputLogin, inputPassword: ig.loggedInUser.inputPassword, inputProxy: ig.loggedInUser.inputProxy,  verificationMode: ig.loggedInUser.verificationMode, silentMode: true, antiBanMode: ig.antiBanMode});
}

module.exports = regenerateSession;