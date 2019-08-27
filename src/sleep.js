async function sleep(seconds) {
    let ms = seconds * 1000;
    console.log(("Sleeping " + seconds + " seconds").yellow);
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = sleep;