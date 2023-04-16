// color array
const colors = ['#ff0000', '#DB6914','#E6FF03', '#0FFF52', '#0D02DB', '#7A02DB','#ff0000', '#DB6914','#E6FF03', '#0FFF52', '#0D02DB', '#7A02DB'];

mapboxgl.accessToken = 'pk.eyJ1IjoidGhlLXJhaCIsImEiOiJjbGdjNmJzc28wb2Z3M2Vud21ydzF4NjZiIn0.J7OmQ1WecBbo9Yco9UVZTw';

    // create map
    var map = new mapboxgl.Map({
        container: 'map-2',
        style: 'mapbox://styles/mapbox/dark-v9',
        center: [-71.104081, 42.365554],
        zoom: 12
    });    
   
    const busStops = [
        [-71.093729, 42.359244],
        [-71.094915, 42.360175],
        [-71.095800, 42.360698],
        [-71.099558, 42.362953],
        [-71.103476, 42.365248],
        [-71.106067, 42.366806],
        [-71.108717, 42.368355],
        [-71.110799, 42.369192],
        [-71.113095, 42.370218],
        [-71.115476, 42.372085],
        [-71.117585, 42.373016],
        [-71.118625, 42.374863]
    ];

    // add marker
    const marker_2 = new mapboxgl.Marker()
    .setLngLat([-71.092761, 42.357575])
    .addTo(map);

    var counter = 0;
    function move() {
        setTimeout(() => {
            if (counter >= busStops.length) return;
            marker_2.setLngLat(busStops[counter]);
            counter++;
            move();
        }, 500);        
    }

    // create a legend for the different bus markers
const legend = document.createElement('div');
legend.id = 'legend';

// add a label for each color in the legend
colors.forEach((color, index) => {
    const label = document.createElement('div');
    label.className = 'legend-label';
    label.style.backgroundColor = color;
    label.innerHTML = `Bus ${index + 1}`;
    legend.appendChild(label);
});


//let busMarkers = [];    
async function run(){
        // get bus data    
      const locations = await getBusLocations();
      console.log(new Date());
      console.log(locations);              
// remove old markers from the map
busMarkers.forEach(function(marker) {
    marker.remove();
});
busMarkers = [];       

// update marker position with real-time bus data
locations.forEach(function(bus, i) {
    const {latitude, longitude} = bus.attributes;
    const bus_marker = new mapboxgl.Marker({
        'color': colors[i % colors.length],
        'rotation': bus.attributes.bearing
    })
    .setLngLat([longitude, latitude])
    .addTo(map);
    busMarkers.push(bus_marker);
});


// create a legend for the different bus markers
const legend = document.createElement('div');
legend.id = 'legend';

// add a label for each color in the legend
locations.forEach(function(bus, i) {
    const {latitude, longitude} = bus.attributes;
    const color = colors[i % colors.length];
    const label = document.createElement('div');
    label.className = 'legend-label';
    label.style.backgroundColor = color;
    label.innerHTML = `Bus ${i + 1} - Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
    legend.appendChild(label);
});

// add the legend to the map
document.getElementById('map-2').appendChild(legend);


      // timer
      setTimeout(run, 15000);
}
    // reset function that sets counter to 0 and moves the marker back to the first bus stop 
    function resetMarker() {
        counter = 0;
        marker_2.setLngLat(busStops[counter]);
    }

    // an event listener to the reset button with the addEventListener() method that calls the resetMarker() function when the button is clicked
    document.getElementById("submit-button-2")
    document.getElementById("reset-button-2").addEventListener("click", resetMarker);

    // Request bus data from MBTA
    async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

let busMarkers = [];
run();