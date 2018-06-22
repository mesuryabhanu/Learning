'use strict';
	/* Add some listeners for tab changing events. We want to update our
   *  counters when this sort of stuff happens. */


	
  chrome.tabs.onSelectionChanged.addListener(
    function(tabId, selectionInfo) {
			localStorage.currentTabId = tabId;
			manageTimer();
			localStorage.state = "selection changed";
    });

  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(tabId == localStorage.currentTabId && typeof(changeInfo.url) != 'undefined' && changeInfo.url != null) {
			updateTabDetails(tabId,changeInfo.url);
			manageTimer();
			localStorage.state = "tab updated";
    }
  });

  chrome.windows.onFocusChanged.addListener(
    function(windowId) {
      if(windowId == null || windowId == -1) {
				manageTimer();
				localStorage.state = "Focus moved out";
        return;
      }

      chrome.windows.get(windowId, function(chromeWindow) {
        if(chromeWindow.state === "minimized") {
					//console.log("Minimized");
					manageTimer();
					localStorage.state = "minimized";
          return;
        }
      });

      chrome.tabs.getSelected(windowId, function(tab) {
        //	console.log("Updating");
				localStorage.currentTabId = tab.id;
        manageTimer();
				localStorage.state = "Focus moved in";
      });
	});

	chrome.tabs.onRemoved.addListener(function(tabId, info) {
			updateTabDetails(tabId, null);
			// manageTimer();
			localStorage.state = "tab removed";
});




function updateTabDetails(tabId,newUrl) //will remove tab details if the new URL is null
{
		var currentTabs = JSON.parse(localStorage.currentTabs);
		var tabsTobeUpdated = currentTabs.filter(function(x) {return x.tabId == tabId});
		currentTabs = currentTabs.filter(function(x) {return x.tabId != tabId});
		
		//new page was opened in the same tab or the tab is being closed
		if(tabsTobeUpdated != null && tabsTobeUpdated.length != 0)
		{
			if(newUrl != null) //new page is being opened in the same tab
			{
				currentTabs.push({tabId:tabId, url:newUrl, timeOnPage:0});
			}
		}
		localStorage.currentTabs = JSON.stringify(currentTabs);
}
