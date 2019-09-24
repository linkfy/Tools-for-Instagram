function sleepSync(ms) {
    const startPoint = new Date().getTime()
    while (new Date().getTime() - startPoint <= ms) {/* wait */}

}

module.exports = sleepSync;