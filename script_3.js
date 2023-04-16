mapboxgl.accessToken = 'pk.eyJ1IjoidGhlLXJhaCIsImEiOiJjbGdjNmJzc28wb2Z3M2Vud21ydzF4NjZiIn0.J7OmQ1WecBbo9Yco9UVZTw';

var map = new mapboxgl.Map({
    container: 'map-3',
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [-73.94150, 40.70101],
    zoom: 12
});

    // THE TACO BELL PENTAGON OF BROOKLYN
const tacoStops = [
    [-73.92207, 40.69095],
    [-73.90336, 40.70181],
    [-73.90164, 40.71470],
    [-73.94104, 40.71313],
    [-73.94190, 40.70220],
    [-73.92207, 40.69095],    
];

var start_coordinate = [-73.92370, 40.70760]
const marker_3 = new mapboxgl.Marker()
    .setLngLat(start_coordinate) //start at the HOUSE OF YES!!
    .addTo(map);

// function to create a new img element with the taco image
function createTacoImg() {
    const img = document.createElement('img');
    img.src = 'tacobell.png';
    img.width = 30;
    img.height = 30;
    return img;
  }

// create a new marker for each coordinate in tacoStops
tacoStops.forEach(function(coord) {
    const tacoBell = new mapboxgl.Marker({ element: createTacoImg() }).setLngLat(coord).addTo(map);
  });

// create an empty LineString feature
var lineString = {
    type: 'Feature',
    geometry: {
        type: 'LineString',
        coordinates: []
    }
};

// add the LineString feature to the map
map.on('load', function() {
    map.addSource('lineString', {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: [lineString]
        }
    });
    map.addLayer({
        id: 'lineString',
        type: 'line',
        source: 'lineString',
        layout: {
            'line-cap': 'round',
            'line-join': 'round'
        },
        paint: {
            'line-color': '#F51900',
            'line-width': 5
        }
    });
});

var counter = 0;
function move() {
    setTimeout(() => {
        if (counter >= tacoStops.length) return;
        const lngLat = tacoStops[counter];
        marker_3.setLngLat(lngLat);
        lineString.geometry.coordinates.push(lngLat);
        map.getSource('lineString').setData({
            type: 'FeatureCollection',
            features: [lineString]
        });
        counter++;
        move();
    }, 500);    
}

async function run() {
    // get bus data    
    const locations = await getBusLocations();
    console.log(new Date());
    console.log(locations);

    // timer
    setTimeout(run, 15000);
}

// reset function that sets counter to 0 and moves the marker back to the first bus stop 
function resetMarker() {
    counter = 0;
    marker_3.setLngLat(start_coordinate);
    lineString.geometry.coordinates = [tacoStops[counter]];
    map.getSource('lineString').setData({
        type: 'FeatureCollection',
        features: [lineString]
    });
}

// an event listener to the reset button with the addEventListener() method that calls the resetMarker() function when the button is clicked
document.getElementById("submit-button-3")
document.getElementById("reset-button-3").addEventListener("click", resetMarker);
run();
