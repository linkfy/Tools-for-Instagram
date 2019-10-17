async function regenerateSession(ig, log = true) {
    await removeCookie(ig);
    if(log) {

        console.log("Regenerating session".cyan);
    }
    return await login(ig.loggedInUser.inputLogin, ig.loggedInUser.inputPassword, ig.loggedInUser.inputProxy,  ig.loggedInUser.verificationMode, silentMode=true, ig.antiBanMode);
}

module.exports = regenerateSession;