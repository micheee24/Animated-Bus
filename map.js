const markers = [];

async function run(){
    // get bus data    
	const locations = await getBusLocations();
	console.log(new Date());
	console.log(locations);

		for(let i = 0; i < locations.length; i++){
			let newPosition = new mapboxgl.flyTo({
				locations[i]["attributes"]["longitude"],
				locations[i]["attributes"]["latitude"]
      
			});
	let marker = new mapboxgl.Marker({
		positon: newPosition
	});
	markers.push(marker);
}

}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

async function move(){
	let newLocation = await getBusLocations();
	for (let i = 0; i < newLocation.lenght; i++){
		markers[i].setMap(null);
		let newPosition = new mapboxgl.on(
			locations[i]["attributes"]["longitude"],
			locations[i]["attributes"]["latitude"]
	);
	markers[i]["positon"] = newPosition;
	markers[i].setMap(map);	
	} setTimeout(move, 20000);
}
run();
move();
