// Jesse Moy Interactive Web Mapping Assignment 3

// gh-pages update test
// gh-pages update test 2
// gh-pages update test 3
// gh-pages update test 4
// gh-pages update test 5


// varible for our map container setting centroid [lat, lng] and zoom
var map = L.map('map').setView([40.71,-73.93], 11);

// set a tile layer to be CartoDB tiles 
var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',{
  attribution: 'Map Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors, Map Tiles &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

// add cartodb tiles to our map
map.addLayer(CartoDBTiles);

// declare global variables
var neighborhoods_GEOJSON;
var acres_GEOJSON;


//add neighborhood data
// let's add neighborhood data
$.getJSON( "geojson/NYC_neighborhood_data.geojson", function( data ) {
    // ensure jQuery has pulled all data out of the geojson file
    var neighborhoods = data;

    console.log(neighborhoods);

    // neighborhood boundries 
    var neighborhoodStyle = function (feature) {

        var style = {
            weight: 1,
            opacity: 1,
            color: 'grey',
            fillOpacity: 0,
            fillColor: null
        };

        return style;
    }


    var neighborhoodClick = function (feature, layer) {
        var percent = feature.properties.PovertyPer * 100;
        percent = percent.toFixed(0);
        // let's bind some feature properties to a pop up
        layer.bindPopup("<strong>Neighborhood:</strong> " + feature.properties.NYC_NEIG);
    }

    neighborhoodsGeoJSON = L.geoJson(neighborhoods, {
        style: neighborhoodStyle,
        onEachFeature: neighborhoodClick
    }).addTo(map);

});


// add 596 acres data set lists vacent publicly owned land

$.getJSON( "geojson/NYC_596acres.geojson", function( data ) {
    // ensure jQuery has pulled all data out of the geojson file
    var dataset = data;

    var acresPointToLayer = function(feature, latlng){
    	console.log(feature.properties);
	    
	    // symbolize points by lot area
        var area = (feature.properties.area * 10);
	    var value = (feature.properties.area);

        var fillColor = null;
        if(value >= 0 && value <= 1.0){
            fillColor = "#ffc0cb";
        }
        if(value > 1.0 && value <= 2.0){
            fillColor = "#c56056";
        }
        if(value > 2.0){
            fillColor = "#8b0000";
        }

        var acresPointMarker = L.circle(latlng, area, {
	    	stroke: false,
	    	fillColor: fillColor,
	        fillOpacity: 1
	    });

	    return acresPointMarker;
		}
		
	    var acresClick = function (feature, layer) {
	    // console.log(feature.properties.ARC_ZIP)
	    // let's bind some feature properties to a pop up
	    layer.bindPopup("<strong>Acres:</strong> " + feature.properties.area);
    	}

	acres_GEOJSON = L.geoJson(dataset, {
        pointToLayer: acresPointToLayer,
        onEachFeature: acresClick
    }).addTo(map);

    createLayerControls(); 

});


function createLayerControls() {

    // add in layer controls
    var baseMaps = {
        "CartoDB": CartoDBTiles,
    };

    var overlayMaps = {
    	"Neighborhoods": neighborhoods_GEOJSON, 
    	"Vacant Public Lots": acres_GEOJSON  
    };

    // add control
    L.control.layers(baseMaps, overlayMaps).addTo(map);

}
