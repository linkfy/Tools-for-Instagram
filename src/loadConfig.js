function loadConfig(filename = 'exampleAccount') {
    const config = require(process.env.PWD+'/accounts/'+filename);
    return config;
}

module.exports = loadConfig;