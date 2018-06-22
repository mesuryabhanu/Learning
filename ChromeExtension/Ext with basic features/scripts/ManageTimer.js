'use strict';
  //   var currentSite = null;
//   var currentTabId = null;
  //var prevTime = null;
  var idleTimeThreshold = 120;  // 2 min without activity on a page is ok.
//   var tabDetails = [];

window.setInterval(manageTimer,2*1000);


function manageTimer() {
	if(localStorage.currentTabId == null)
		return;
	chrome.tabs.get(parseInt(localStorage.currentTabId), function(tab) {
		if(tab == null)
			console.log("tab closed");
		else{
		/* Make sure we're on the focused window, otherwise we're recording bogus stats. */
			chrome.windows.get(tab.windowId, function(window) {
				if(!window.focused) return;
				var url = tab.url;
				// var timeOnsite = 0;
				var date = new Date();
				//Start timer for this tab
				if(localStorage.currentSite == null || localStorage.currentSite != url || localStorage.state == "minimized" || localStorage.state == "Focus moved out") {
					localStorage.currentSite = url;
					localStorage.prevTime = date.getTime();
					localStorage.timeOnSite = 0;
					localStorage.timeOnCurrentSite = 0;
					//console.log("New site:" + url);
					return;
				}
				var delta = Math.floor((date.getTime() - localStorage.prevTime) / 1000); //convert to seconds
				localStorage.prevTime = date.getTime();
				localStorage.timeOnSite = parseInt(localStorage.timeOnSite) + delta;
				if(localStorage.timeOnSite > idleTimeThreshold)   return;  //Too much idle. Ignore this.
				localStorage.timeOnCurrentSite = parseInt(localStorage.timeOnCurrentSite) + delta; 
				addTimeOnTab(localStorage.currentTabId, localStorage.currentSite, localStorage.timeOnSite);
			});
		}
	});
}


function addTimeOnTab(tabId, url, timeOnPage)
{
	var currentTabs = JSON.parse(localStorage.currentTabs);
	currentTabs = currentTabs.map(function(x) {
		if(x.tabId == tabId && x.url == url) 
			x.timeOnPage = parseInt(x.timeOnPage) + parseInt(timeOnPage);
		return x;
		});
	localStorage.currentTabs = JSON.stringify(currentTabs);
	chrome.browserAction.setBadgeText({text: timeOnPage});
}
