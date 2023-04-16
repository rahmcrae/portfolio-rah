    mapboxgl.accessToken = 'pk.eyJ1IjoidGhlLXJhaCIsImEiOiJjbGdjNmJzc28wb2Z3M2Vud21ydzF4NjZiIn0.J7OmQ1WecBbo9Yco9UVZTw';

    //
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v9',
        center: [-71.104081, 42.365554],
        zoom: 12
    });

    const bostonBusStops = [
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
    
    const marker = new mapboxgl.Marker()
    .setLngLat([-71.092761, 42.357575])
    .addTo(map);      


    var counter = 0;
    function move() {
        setTimeout(() => {
            if (counter >= bostonBusStops.length) return;
            marker.setLngLat(bostonBusStops[counter]);
            counter++;
            move();
        }, 500);        
    }
    
    // reset function that sets counter to 0 and moves the marker back to the first bus stop 
    function resetMarker() {
        counter = 0;
        marker.setLngLat(bostonBusStops[counter]);
    }

    // an event listener to the reset button with the addEventListener() method that calls the resetMarker() & move function when the button is clicked
    document.getElementById("submit-button-1")
    document.getElementById("reset-button-1").addEventListener("click", resetMarker);
    move();

