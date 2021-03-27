mapboxgl.accessToken = 'pk.eyJ1IjoieWFzaGJhcm90MTk5NSIsImEiOiJja2xiZnpzNm0ybDIwMnZwZTN5YTNicTdxIn0.KFX00mfcRSTdnk9hFCVLaw';
var map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: [-90.98433940235135, 40.75487934025684], // starting position [lng, lat]
  zoom: 4 // starting zoom
});

map.on('load', function () {
       // Add an image to use as a custom marker
       map.loadImage(
           'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
           function (error, image) {
               if (error) throw error;
               map.addImage('custom-marker', image);
               map.addSource('dams', {
                 type: 'geojson',
                 data: 'data/temp.geojson'
               });

               // Add a symbol layer
                map.addLayer({
                    'id': 'damLayer',
                    'type': 'symbol',
                    'source': 'dams',
                    'layout': {
                        'icon-image': 'custom-marker',
                        // get the title name from the source's "title" property
                        'text-field': ['get', 'Name'],
                        'text-font': [
                            'Open Sans Semibold',
                            'Arial Unicode MS Bold'
                        ],
                        'text-offset': [0, 1.25],
                        'text-anchor': 'top'
                    }
                });
           }
       );

       map.loadImage(
           'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
           function (error, image) {
               if (error) throw error;
               map.addImage('custom-marker1', image);
               map.addSource('ports', {
                 type: 'geojson',
                 data: 'data/temp1.geojson'
               });

               // Add a symbol layer
                map.addLayer({
                    'id': 'portLayer',
                    'type': 'symbol',
                    'source': 'ports',
                    'layout': {
                        'icon-image': 'custom-marker1',
                        // get the title name from the source's "title" property
                        'text-field': ['get', 'Name'],
                        'text-font': [
                            'Open Sans Semibold',
                            'Arial Unicode MS Bold'
                        ],
                        'text-offset': [0, 1.25],
                        'text-anchor': 'top'
                    }
                });
           }
       );
   });

   // After the last frame rendered before the map enters an "idle" state.
map.on('idle', function () {
// If these two layers have been added to the style,
// add the toggle buttons.
if (map.getLayer('damLayer') && map.getLayer('portLayer')) {
// Enumerate ids of the layers.
var toggleableLayerIds = ['damLayer', 'portLayer'];
// Set up the corresponding toggle button for each layer.
for (var i = 0; i < toggleableLayerIds.length; i++) {
var id = toggleableLayerIds[i];
if (!document.getElementById(id)) {
// Create a link.
var link = document.createElement('a');
link.id = id;
link.href = '#';
link.textContent = id;
link.className = 'active';
// Show or hide layer when the toggle is clicked.
link.onclick = function (e) {
var clickedLayer = this.textContent;
e.preventDefault();
e.stopPropagation();

var visibility = map.getLayoutProperty(
clickedLayer,
'visibility'
);

// Toggle layer visibility by changing the layout object's visibility property.
if (visibility === 'visible') {
map.setLayoutProperty(
clickedLayer,
'visibility',
'none'
);
this.className = '';
} else {
this.className = 'active';
map.setLayoutProperty(
clickedLayer,
'visibility',
'visible'
);
}
};

var layers = document.getElementById('menu');
layers.appendChild(link);
}
}
}
});
