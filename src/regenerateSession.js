async function regenerateSession(ig, log = true) {
    await removeCookie(ig);
    if(log) {

        console.log("Regenerating session".cyan);
    }
    return await login({inputLogin: ig.loggedInUser.inputLogin, inputPassword: ig.loggedInUser.inputPassword, inputProxy: ig.loggedInUser.inputProxy,  verificationMode: ig.loggedInUser.verificationMode, silentMode: true, antiBanMode: ig.antiBanMode});
}

module.exports = regenerateSession;