var map = L.map('map').setView([40.71,-73.93], 11);

// set a tile layer to be CartoDB tiles 
var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',{
  attribution: 'Map Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors, Map Tiles &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

map.attributionControl.setPrefix('');

// add these tiles to our map
map.addLayer(CartoDBTiles);


// create global variables we can use for layer controls
var Sandy_Inundation_Zone_GEOJSON;


$.getJSON( "geojson/Sandy_Inundation_Zone.geojson", function( data ) {
    // ensure jQuery has pulled all data out of the geojson file
    var Sandy_Inundation_Zone = data;

    console.log(Sandy_Inundation_Zone);

    // neighborhood choropleth map
    // let's use % in poverty to color the neighborhood map

    var flood_style = {
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.75,
        fillColor: 'blue'
    };

    // var povertyClick = function (feature, layer) {
    //     var percent = feature.properties.PovertyPer * 100;
    //     percent = percent.toFixed(0);
    //     // let's bind some feature properties to a pop up
    //     layer.bindPopup("<strong>Neighborhood:</strong> " + feature.properties.NYC_NEIG + "<br /><strong>Percent in Poverty: </strong>" + percent + "%");
    // }

    Sandy_Inundation_Zone = L.geoJson(Sandy_Inundation_Zone).addTo(map)