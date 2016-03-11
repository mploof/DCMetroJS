var map;
var aaLatLng = {lat: 42.2814, lng: -83.7483};
var ypsiLatLng = {lat: 42.2428, lng: -83.6183};
var dtwLatLng = {lat: 42.2125, lng: -83.3533};
var dcLatLng = {lat: 38.9047, lng: -77.0164}

function lineProps(code, color) {
    this.code = code;
    this.color = color;
}

var lines = [
  new lineProps("GR", "#00FF00"),
  new lineProps("BL", "#0000FF"),
  new lineProps("RD", "#FF0000"),
  new lineProps("YL", "#FFFF00"),
  new lineProps("OR", "#FF8000"),
  new lineProps("SV", "#C0C0C0")
];

function initMap() {
  console.log("Initializing the map");
  map = new google.maps.Map(document.getElementById('map'), {
    center: dcLatLng,
    zoom: 11
  });
  drawMetro();

}

function drawMetro(){
  // Draw the station markers
  //getStationList("", createStationMarkers);

  // Draw the line indicators
  for(var i = 0; i < lines.length; i++){
    getStationList(lines[i].code, createLine);
  }
}

function createStationMarkers(jsonArray, params){
  console.log("Creating station markers");

  // Place the markers
  for(var i = 0; i < jsonArray.Stations.length; i++){
    var s = jsonArray.Stations[i];
    console.log(String(i) + ": " + String(s.Name));
    var thisLat = Number(String(s.Lat));
    var thisLon = Number(String(s.Lon));
    latLon = new google.maps.LatLng(thisLat, thisLon);
    new google.maps.Marker({
      position: latLon,
      map: map,
      title: 'Station'
    });
  }
}

function createLine(jsonArray, params){
  var code = String($.param(params)).substring(9,11);
  var locations = [];

  // Create the locations list
  for(var i = 0; i < jsonArray.Stations.length; i++){
    var s = jsonArray.Stations[i];
    var thisLat = Number(String(s.Lat));
    var thisLon = Number(String(s.Lon));
    latLon = new google.maps.LatLng(thisLat, thisLon);
    locations.push(latLon);
  }

  // Determine the line code
  var color;
  for(var i = 0; i < lines.length; i++){
    if(code == lines[i].code){
      color = lines[i].color;
      break;
    }
  }

  // Draw the
  new google.maps.Polyline({
    map: map,
    path: locations,
    geodesic: true,
    strokeColor: color,
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
}

function loadGoogleMap() {
   console.log("Loading da fun!");
   var script = document.createElement('script');
   script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCyC-QI3R_qg_SXAL9sfeOJDCkA2JWmE5Q&callback=initMap';
   script.type = 'text/javascript';
   var head = document.getElementsByTagName("head")[0];
   head.appendChild(script);
}

function createSomeMarkers(){
  var locations = [aaLatLng, ypsiLatLng, dtwLatLng];
  for(var i = 0; i < locations.length; i++){
    new google.maps.Marker({
      position: locations[i],
      map: map,
      title: 'Ann Arbor!'
    });
  }
}

$( document ).ready(function() {
    loadGoogleMap();
});
