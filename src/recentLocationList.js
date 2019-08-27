async function recentLocationList(ig, location, randomResult = false) {
    let locationSearchResults =  await ig.locationSearch.index(0.0, 0.0, location);
    //Randomize the result list selection
    let selectedLocation  = randomResult ? locationSearchResults.venues[Math.floor(Math.random() * locationSearchResults.venues.length)] : locationSearchResults.venues[0];
    locationId = selectedLocation.external_id;
    let feed = await ig.feed.location(locationId,'recent');
    items = await feed.items();
    items.forEach(element => {
        element.comes_from = "recent_location";
    });
    return items;
}

module.exports = recentLocationList;
