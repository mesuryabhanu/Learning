'use strict';
  

function inititalizeLocalStorage() {
	localStorage.storageType = "local";
    if (!localStorage.metadata) {
        var metadata = {};
        metadata.uid = guid();
        metadata.reviewModeOn = false;
        metadata.aid = "";
        metadata.version = 3.0;
        metadata.userAgent = navigator.userAgent;
        localStorage.metadata = JSON.stringify(metadata)
        
        if(!metadata.userAgent.includes("Edge")){
            chrome.identity.getProfileUserInfo(function(info) { 
                var meta = JSON.parse(localStorage.metadata);
                meta.chromeId = info.id;
                meta.email = info.email;
                localStorage.metadata = JSON.stringify(meta);
                LogPreferencesChange(meta, "New install");
            });
        }
        else{
            LogPreferencesChange(metadata, "New install");
        }
    }
    
    if (!localStorage.debugData) {
        localStorage.debugData = JSON.stringify([])
    }
    
    if (!localStorage.tabDetails) {
        localStorage.tabDetails = JSON.stringify([])
	}

    if (!localStorage.donttrack) {
        (localStorage.donttrack = JSON.stringify({}));
    }
    
    if (!localStorage.searchlogs) {
        (localStorage.searchlogs = JSON.stringify([]));
		}
    if (!localStorage.currentTabs) {
        (localStorage.currentTabs = JSON.stringify([]));
		}
    if (!localStorage.searchClickDetails) {
        (localStorage.searchClickDetails = JSON.stringify([]));
		}

    if (!localStorage.timeOnCurrentSite) {
			localStorage.timeOnCurrentSite = 0;
		}
		
}



function removeFromLocalStorageArray(arrayKey, value) 
{
	var localStorageArray = JSON.parse(localStorage.getItem(arrayKey));
	var index = localStorageArray.indexOf(value);
	if (index > -1) {
		localStorageArray.splice(index, 1);
	}
	localStorage.setItem(arrayKey,JSON.stringify(localStorageArray));
}

