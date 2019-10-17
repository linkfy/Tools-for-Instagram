async function setAntiBanMode(ig, mode = true) {
    ig.antiBanMode = mode;
    return ig;
}

module.exports = setAntiBanMode;