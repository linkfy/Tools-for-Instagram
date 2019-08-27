async function topLocationList(ig, location, randomResult = false) {
    let locationSearchResults =  await ig.locationSearch.index(0.0, 0.0, location);
    //Randomize the result list selection
    let selectedLocation  = randomResult ? locationSearchResults.venues[Math.floor(Math.random() * locationSearchResults.venues.length)] : locationSearchResults.venues[0];
    locationId = selectedLocation.external_id;
    let feed = await ig.feed.location(locationId,'ranked');
    items = await feed.items();
    items.forEach(element => {
        element.comes_from = "top_location";
    });
    return items;
}

module.exports = topLocationList;
