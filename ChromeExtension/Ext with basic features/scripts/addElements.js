'use strict';


	var sidePanel = null;
	var sidePanelDisplayed = false;
	var port = null;
	var blockIdCounter = 1;
	var preferences = {};
function addElements(){
	pageUrl = window.location.href;
	port = chrome.runtime.connect({name: "content-bg"});
	port.postMessage({getPreferences:true});
	addSidePanel();

	//this is communication initiated by background script without using any port
	chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
		if (msg.displaySidePane == true) {
			if(sidePanel == null){	
				sidePanel.classList.remove('ab_sidePanel_hidden');
				sidePanel.classList.add('ab_sidePanel_shown');
				sidePanelDisplayed = true;
			}
			else{
				if(sidePanelDisplayed){
					sidePanel.classList.remove('ab_sidePanel_shown');
					sidePanel.classList.add('ab_sidePanel_hidden');
					sidePanelDisplayed = false;
				}
				else{
					sidePanel.classList.remove('ab_sidePanel_hidden');
					sidePanel.classList.add('ab_sidePanel_shown');
					sidePanelDisplayed = true;
				}
			}
		}
	  });


	//this is a communication initiated by content script using port
	port.onMessage.addListener(function(msg) {
		if (typeof(msg.tabId) != 'undefined' && msg.tabId != null)
		{
			currentTabId = msg.tabId;
			var links = document.getElementsByTagName('a');
			for(var i=0;i <links.length; i++){
				links[i].addEventListener('click', function() {
					this.classList.add("ab_clicked");
					port.postMessage({tabContentUpdated: JSON.stringify({impressionId:pageDetails.impressionId, url:pageUrl, html: cleanHtml(pageUrl, document.documentElement)})});
					var linkPosition = -1;
					if(engine == "G" || engine == "B")
						linkPosition = webNodes.indexOf(this);
					var clickDetails = {url:this.href, parentUrl: pageUrl, position:linkPosition, parentTabId:currentTabId, parentImpId:impressionId};
					port.postMessage({clicked: 
						JSON.stringify(clickDetails)
					});
				});
			}
		}
		if (typeof(msg.userMetadata) != 'undefined' && msg.userMetadata != null)
		{
			var userMetadata = msg.userMetadata;
			preferences = userMetadata;
			
			var id = preferences.aid;
			if(id != ""){
				sidePanel.getElementsByClassName('ab_identity')[0].innerText = "Hello " + id + "!";
			}
		}
	});
}

function addSidePanel(){
	sidePanel = document.createElement("div");
	sidePanel.className = "ab_sidePanel";
	sidePanel.id = "ab_sidePanel";
	sidePanel.innerHTML = sidePanelHtml;
	sidePanel.querySelector('#ab_techItlogo').src = chrome.extension.getURL('icons/ExtLogo.png'); //the source url specified in HTML will not work. You also need to add the image in web_accessible_resource in manifest for content scripts to be able to use it.
	
	sidePanel.querySelector('#ab_aliasSubmitBtn').onclick = function(){
		var alias = document.getElementsByClassName('ab_aliasBox')[0].value;
		if(alias.trim() != ""){
			//log identity
			port.postMessage({idUpdated: alias});
			document.getElementsByClassName('ab_identity')[0].innerText = "Hello " + alias + "!";
		}
	};

	sidePanel.querySelector('#ab_cmntReset').onclick = oFbControlReset;
	sidePanel.querySelector('#ab_cmntSubmit').onclick = function(){
		var text = document.getElementsByClassName('ab_addCmntsBox')[0].value;
		if(text.trim() != "")
		{
			text += "\r\nReferrer Page: " + document.referrer; 

			var SubmitMsgNode = document.getElementById("ab_submitMsg");
			SubmitMsgNode.innerText = "Downloading..";
			SubmitMsgNode.style.color = "green";
			downloadTextAsFile("_tmp_extFile.txt", text)
			window.setTimeout(function(){SubmitMsgNode.innerText = ""; SubmitMsgNode.style.color = "black"}, 3000);
		}
		else{
			var validationMsgNode = document.getElementById("ab_valMsg");
			validationMsgNode.innerText = "Please enter something to submit";
			validationMsgNode.style.color = "red"
			window.setTimeout(function(){validationMsgNode.innerText = ""; validationMsgNode.style.color = "black"}, 3000);
		}
	};
	
	sidePanel.querySelector('#ab_viewSettings').onclick = function(){
		port.postMessage({openSettings:true});
	};
	sidePanel.classList.add('ab_sidePanel_hidden');
	document.documentElement.appendChild(sidePanel);
}

function oFbControlReset(){
	document.getElementsByClassName('ab_addCmntsBox')[0].value = "";
}