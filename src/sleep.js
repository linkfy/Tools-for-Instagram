async function sleep(seconds) {
    let ms = seconds * 1000;
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = sleep;