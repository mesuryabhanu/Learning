'use strict';
  var currentSite = null;
  var currentTabId = null;
  var prevTime = null;
  var updateCounterInterval = 120;  // 2 min without activity on a page is ok.
  var tabDetails = [];



inititalizeLocalStorage();
window.setInterval(UpdateSearchDetailsCacheToCloud,120*1000); //upload logs to cloud every 2 mins.

function UpdateSearchDetailsCacheToCloud(){
	var searchlogs = JSON.parse(localStorage.searchlogs);
	searchlogs = searchlogs.map(function(x) {
		if(typeof(x.status) == 'undefined' || x.status == 'updated'){
			//LogSearchDetails(x);
			x.status = "logged";
		}
		return x;
	});
	localStorage.searchlogs = JSON.stringify(searchlogs);
}

//if you want to show a popup on clicking extension icon, add the reference to popup.html in manifest file in browser action->default popup field and remove this code
chrome.browserAction.onClicked.addListener(function(tab) {
		if(tab.url.startsWith("")){ //right now the condition here is trivial but you can do different tasks based on current tab's URL.
			//message passing initiated by background script without using port
			chrome.tabs.sendMessage(tab.id, {displaySidePane:true}, function(response) {});  
		}
		else{
			chrome.tabs.sendMessage(tab.id, {displaySidePane:false}, function(response) {});  
		}
	});

//message passing initiated by content script using port
chrome.runtime.onConnect.addListener(function(port) {
		if(port.name == "popup-bg")
		{
			port.onMessage.addListener(function(msg, sendingPort) {
				if(typeof(msg.OpenSettings) != 'undefined' && msg.OpenSettings != null)
				{
					chrome.tabs.create({'url': chrome.extension.getURL('Settings.html')}, function(tab) {
						// Tab opened.
					});
				}
			});
		}
		else if(port.name == "content-bg")
		{
			port.onMessage.addListener(function(msg, sendingPort) {
			//debugger;
			if(typeof(msg.getPreferences) != 'undefined' && msg.getPreferences != null)
			{
				port.postMessage({userMetadata:JSON.parse(localStorage.metadata)});
			}
			if(typeof(msg.openSettings) != 'undefined' && msg.openSettings != null)
			{
				chrome.tabs.create({'url': chrome.extension.getURL('Settings.html')}, function(tab) {
					// Tab opened.
				});
			}
			if(typeof(msg.idUpdated) != 'undefined' && msg.idUpdated != null)
			{
				var metadata = JSON.parse(localStorage.metadata);
				var id = msg.idUpdated;
				LogPreferencesChange(metadata, "Change:IdSubmitted, Before:" + metadata.aid + ", After: " + id);
				metadata.aid = id;
				localStorage.metadata = JSON.stringify(metadata);
			}
			});
	}
  });


