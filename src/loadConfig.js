function loadConfig(filename = 'exampleAccount') {
    const config = require('../logins/'+filename);
    return config;
}

module.exports = loadConfig;