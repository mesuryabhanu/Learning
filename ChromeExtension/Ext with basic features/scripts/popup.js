'use strict';
var port = chrome.runtime.connect({name: "popup-bg"});
document.querySelector("#viewSettings").onclick= function (){
	port.postMessage({OpenSettings:true});
}

document.querySelector("#overallFbSubmitBtn").onclick= function (){
	var feedback = document.querySelector("#overallFbArea").value;
	if(feedback.trim() != "")
	{
		document.querySelector("#popupArea").innerHTML = "Thanks for your feedback."
		port.postMessage({feedback: feedback});
	}
}
