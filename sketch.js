let marker;

mapboxgl.accessToken = 'pk.eyJ1IjoiYWNoYXNlMjYiLCJhIjoiY2thcHJnMjNmMDJhbDJ0bjAzamd1Z25pNiJ9.JWeXP_3qVlavLxpSeP5smw';
const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/dark-v10', //hosted style id
    center: [-77.38, 39], // starting position
    zoom: 3 // starting zoom
});

// Change Map Locations (Fly-to)
document.getElementById('home').addEventListener('click', function () {
    marker = new mapboxgl.Marker()
        .setLngLat([-74.2049, 40.7673])
        .addTo(map);
    map.flyTo({
        center: [-74.2049, 40.7673],
        zoom: 13,
        interactive: false,
    });
});
document.getElementById('school').addEventListener('click', function () {
    marker = new mapboxgl.Marker()
        .setLngLat([-69.9640, 43.9077])
        .addTo(map);
    map.flyTo({
        center: [-69.9640, 43.9077],
        zoom: 14,
        interactive: false,
    });
});
document.getElementById('work').addEventListener('click', function () {
    marker = new mapboxgl.Marker()
        .setLngLat([-74.0111, 40.7041])
        .addTo(map);
    map.flyTo({
        center: [-74.0111, 40.7041],
        zoom: 14,
        interactive: false,
    });
});
document.getElementById('vacation').addEventListener('click', function () {
    marker = new mapboxgl.Marker()
        .setLngLat([-118.2437, 34.0522])
        .addTo(map);
    map.flyTo({
        center: [-118.2437, 34.0522],
        zoom: 12,
        interactive: false,
    });
});

// Building 3-D effect
map.on('load', function () {
    // Insert the layer beneath any symbol layer.
    var layers = map.getStyle().layers;

    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
            break;
        }
    }

    map.addLayer(
        {
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
                'fill-extrusion-color': '#aaa',

                // use an 'interpolate' expression to add a smooth transition effect to the
                // buildings as the user zooms in
                'fill-extrusion-height': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'height']
                ],
                'fill-extrusion-base': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'min_height']
                ],
                'fill-extrusion-opacity': 0.6
            }
        },
        labelLayerId
    );
});



// "About-Me" modal functionality:
let modal = document.getElementById("simpleModal");
let modalBtn = document.getElementById("modalBtn");
let closeBtn = document.getElementsByClassName("closeBtn")[0];

modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', clickOutside);

function openModal(){
    modal.style.display = "block";
}

function closeModal(){
    modal.style.display = "none";
}

function clickOutside(e){
    if(e.target == modal){
        modal.style.display = "none";
    }
}


