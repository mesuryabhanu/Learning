
var ANALYTICS_HOST = "http://ServiceTopLevelURL/"; // you need to add this URL pattern in the manifest file in permissions field


//sample post request
function LogPreferencesChange(preferences, change)
{
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
  xmlhttp.open("POST", ANALYTICS_HOST + "LogPreferencesChange");
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  var postData = JSON.stringify({UserId:preferences.uid,Time: (new Date()).getTime(), Change:change, NewPreferencesJson:JSON.stringify(preferences)});//JSON.stringify(data)
  //xmlhttp.send(postData); //uncomment to send request
}

//sample get request
function Log_GetEntry(userId, impressionId, port)
{
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
  xmlhttp.open("GET", ANALYTICS_HOST + "GetEntry?userId=" + userId + "&impId=" + impressionId);
  xmlhttp.onreadystatechange = function() //function to be executed after the request is complete
  {
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        port.postMessage({oneImpLogResponse:JSON.parse(xmlhttp.responseText)});
      }
  }
  //xmlhttp.send(null); //uncomment to send request
}
