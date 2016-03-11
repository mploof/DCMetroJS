// Function declarations
var stationInfo = "https://api.wmata.com/Rail.svc/json/";
var stationPrediction = "https://api.wmata.com/StationPrediction.svc/json/"

function getLineInfo(callback){
  var apiUrl = stationInfo + "jLines?";
  function defaultCallback(jsonObject, params){
      console.log("Got lines info: ");
      console.log(jsonObject.Lines);
  }
  if(callback == null)
    callback = defaultCallback;
  apiCall(apiUrl, null, callback);
}

function getParkingInfo(stationCode, callback){
  var params = {
    "StationCode": stationCode,
  }
  var apiUrl = stationInfo + "jStationParking?";
  function defaultCallback(jsonObject, params){
    if(stationCode == null){
      console.log("Got all parking info: ");
      console.log(jsonObject.StationsParking);
    }
    else{
      console.log("Got station parking info: ");
      console.log(jsonObject.StationsParking[0]);
    }
  }
  if(callback == null)
    callback = defaultCallback;
  if(stationCode == null)
    params = null;
  apiCall(apiUrl, params, callback);
}

function getPath(stationCode0, stationCode1, callback){
  var params = {
    "FromStationCode": station0,
    "ToStationCode": station1,
  }
  var apiUrl = stationInfo + "jPath?";
  function defaultCallback(jsonObject, params){
      console.log("Got path info: ");
      console.log(jsonObject.Path);
  }
  if(callback == null)
    callback = defaultCallback;
  apiCall(apiUrl, params, callback);
}

function getStationEntrances(lat, lon, radius, callback){
  var params = {
    "Lat": lat,
    "Lon": lon,
    "Radius": radius,
  }
  var apiUrl = stationInfo + "jStationEntrances?";
  function defaultCallback(jsonObject, params){
    console.log("Got nearby entrance info: ");
    console.log(jsonObject.Entrances);
  }
  if(callback == null)
    callback = defaultCallback;
  apiCall(apiUrl, params, callback);
}

function getStationInfo(stationCode){
  var params = {
    "StationCode": stationCode,
  }
  var apiUrl = stationInfo + "jStationInfo?";
  function defaultCallback(jsonObject, params){
      console.log("Got station info: ");
      console.log(jsonObject);
  }
  if(callback == null)
    callback = defaultCallback;
  apiCall(apiUrl, params, callback);
}

function getStationList(callback){
  getStationList(null, callback);
}
function getStationList(lineCode, callback){
  console.log("Getting station list!");
  var params = {
    "LineCode": lineCode,
  }
  var apiUrl = stationInfo + "jStations?";
  function defaultCallback(jsonObject, params){
    if(lineCode == null){
      console.log("Got all station infos: ");
      console.log(jsonObject.Stations);
    }
    else{
      console.log("Got station info for line " + lineCode + ": ");
      console.log(jsonObject.Stations);
    }
  }
  if(callback == null)
    callback = defaultCallback;
  if(lineCode == null)
    params = null;
  apiCall(apiUrl, params, callback);
}

function getStationTiming(callback){
  getStationTiming(null, callback);
}
function getStationTiming(stationCode, callback){
  var params = {
    "StationCode": stationCode,
  }
  var apiUrl = stationInfo + "jStationTimes?";
  function defaultCallback(jsonObject, params){
    if(lineCode == null){
      console.log("Got all station timing info: ");
      console.log(jsonObject.StationTimes);
    }
    else{
      console.log("Got station timing info: ");
      console.log(jsonObject.StationTimes[0]);
    }
  }
  if(callback == null)
    callback = defaultCallback;
  if(lineCode == null)
    params = null;
  apiCall(apiUrl, params, callback);
}

function getStationToStation(stationCode0, stationCode1, callback){
  var params = {
    "FromStationCode": stationCode0,
    "ToStationCode": stationCode1,
  }
  var apiUrl = stationInfo + "jSrcStationToDstStationInfo?";
  function defaultCallback(jsonObject, params){
    console.log("Got an object: ");
    console.log(jsonObject.StationToStationInfos[0]);
  }
  if(callback == null)
    callback = defaultCallback;
  apiCall(apiUrl, params, callback);
}

function getNextTrains(stationCode, callback){
  var apiUrl = stationPrediction + "GetPrediction/" + stationCode + "?";
  function defaultCallback(jsonObject, params){
    console.log("Got next trains info: ");
    var dest = String(jsonObject.Trains[0].Destination);
    console.log(jsonObject.Trains[0]);
    var results = document.createElement('p');
    results.appendChild(document.createTextNode(dest));
    document.getElementById('results').appendChild(results);
  }
  if(callback == null)
    callback = defaultCallback;
  apiCall(apiUrl, null, callback);
}

function apiCall(apiUrl, params, callback){
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
        callback(json, params);
      });
  });
}
