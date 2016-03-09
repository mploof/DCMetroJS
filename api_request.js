// Function declarations
var stationInfo = "https://api.wmata.com/Rail.svc/json/";
var stationPrediction = "https://api.wmata.com/StationPrediction.svc/json/"

function getLineInfo(){
  var apiUrl = stationInfo + "jLines?";
  function callBack(jsonObject){
      console.log("Got lines info: ");
      console.log(jsonObject.Lines);
  }
  apiCall(apiUrl, null, callBack);
}

function getParkingInfo(stationCode){
  var params = {
    "StationCode": stationCode,
  }
  var apiUrl = stationInfo + "jStationParking?";
  function callBack(jsonObject){
    if(stationCode == null){
      console.log("Got all parking info: ");
      console.log(jsonObject.StationsParking);
    }
    else{
      console.log("Got station parking info: ");
      console.log(jsonObject.StationsParking[0]);
    }
  }
  if(stationCode == null)
    params = null;
  apiCall(apiUrl, params, callBack);
}

function getPath(stationCode0, stationCode1){
  var params = {
    "FromStationCode": station0,
    "ToStationCode": station1,
  }
  var apiUrl = stationInfo + "jPath?";
  function callBack(jsonObject){
      console.log("Got path info: ");
      console.log(jsonObject.Path);
  }
  apiCall(apiUrl, params, callBack);
}

function getStationEntrances(lat, lon, radius){
  var params = {
    "Lat": lat,
    "Lon": lon,
    "Radius": radius,
  }
  var apiUrl = stationInfo + "jStationEntrances?";
  function callBack(jsonObject){
    console.log("Got nearby entrance info: ");
    console.log(jsonObject.Entrances);
  }
  apiCall(apiUrl, params, callBack);
}

function getStationInfo(stationCode){
  var params = {
    "StationCode": stationCode,
  }
  var apiUrl = stationInfo + "jStationInfo?";
  function callBack(jsonObject){
      console.log("Got station info: ");
      console.log(jsonObject);
  }
  apiCall(apiUrl, params, callBack);
}

function getStationList(){
  getStationList(null);
}
function getStationList(lineCode){
  var params = {
    "LineCode": lineCode,
  }
  var apiUrl = stationInfo + "jStationInfo?";
  function callBack(jsonObject){
    if(lineCode == null){
      console.log("Got all station infos: ");
      console.log(jsonObject.Stations);
    }
    else{
      console.log("Got all station info: ");
      console.log(jsonObject.Stations[0]);
    }
  }
  if(lineCode == null)
    params = null;
  apiCall(apiUrl, params, callBack);
}

function getStationTiming(){
  getStationTiming(null);
}
function getStationTiming(stationCode){
  var params = {
    "StationCode": stationCode,
  }
  var apiUrl = stationInfo + "jStationTimes?";
  function callBack(jsonObject){
    if(lineCode == null){
      console.log("Got all station timing info: ");
      console.log(jsonObject.StationTimes);
    }
    else{
      console.log("Got station timing info: ");
      console.log(jsonObject.StationTimes[0]);
    }
  }
  if(lineCode == null)
    params = null;
  apiCall(apiUrl, params, callBack);
}

function getStationToStation(stationCode0, stationCode1){
  var params = {
    "FromStationCode": stationCode0,
    "ToStationCode": stationCode1,
  }
  var apiUrl = stationInfo + "jSrcStationToDstStationInfo?";
  function callBack(jsonObject){
    console.log("Got an object: ");
    console.log(jsonObject.StationToStationInfos[0]);
  }
  apiCall(apiUrl, params, callBack);
}

function getNextTrains(stationCode){
  var apiUrl = stationPrediction + "GetPrediction/" + stationCode + "?";
  function callBack(jsonObject){
    console.log("Got next trains info: ");
    var dest = String(jsonObject.Trains[0].Destination);
    console.log(jsonObject.Trains[0]);
    var results = document.createElement('p');
    results.appendChild(document.createTextNode(dest));
    document.getElementById('results').appendChild(results);
  }
  apiCall(apiUrl, null, callBack);
}

function apiCall(apiUrl, params, callBack){
  $(function() {
    console.log("Starting the API call")
      var api = {
          // API key
          "api_key" : "bdb04a8a84d844abb6958c07735c4d2e",
      };
      apiUrl = apiUrl + $.param(api);
      if(params != null)
        apiUrl = apiUrl + "&" + $.param(params);
      console.log("request url: " + apiUrl);
      $.getJSON(apiUrl, function(json){
        callBack(json);
      });
  });
}

// Actually do some stuff
//getStationToStation("E10", "J03");
getNextTrains("E10");
