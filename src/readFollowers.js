async function readFollowers(ig, username) {
    let filename = username.toString().toLowerCase() +"_followers.json"
    let filepath = "./output/" + filename;
    let info = fs.readFileSync(filepath);
    let enc = new TextDecoder("utf-8");
    let decodedInfo = enc.decode(info);
    let followers = JSON.parse(decodedInfo);
    //The last element is EOF, so we can delete it
    
    followers.pop();
    return followers;    
}

module.exports = readFollowers;