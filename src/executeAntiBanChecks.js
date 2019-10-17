async function executeAntiBanChecks(ig) {
    if(ig.antiBanMode == true) {
        console.log("Using Antiban Powers");
        ig = await regenerateSession(ig, log = false);
    }
    return ig;
}

module.exports = executeAntiBanChecks;