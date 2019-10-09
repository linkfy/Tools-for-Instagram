async function regenerateSession(ig) {
    await removeCookie(ig);
    console.log("Regenerating session".cyan);
    return await login(ig.loggedInUser.inputLogin, ig.loggedInUser.inputPassword, ig.loggedInUser.inputProxy,  ig.loggedInUser.verificationMode, silentMode=true);
}

module.exports = regenerateSession;