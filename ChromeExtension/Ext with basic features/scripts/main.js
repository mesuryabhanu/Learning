'use strict';

// add controls for to provide overall feedback of the page.

//add controls for block level feedback
var highlightedClassName = "ab_highlightedArea";
var feedbackDiv = null;
//var oFeedbackDiv = createOverallFeebackDiv();
var prevDOM = null;
var pageUrl = null;



window.addEventListener("hashchange", reRunScripts, false);
main();

function main(){
    feedbackDiv = createDivItem("ab_blockFb", "ab_blockFb", "width:100px;height:100px;background:lightgreen;border:solid 1px green;position:absolute;z-index:10002");
    document.body.addEventListener('mouseover', ab_HoverEventListen, false);
    // pageUrl = window.location.href;
    addElements();
}

function reRunScripts(){
    var sidePanel = document.getElementById('sidePanel');
    sidePanel.parentNode.removeChild(sidePanel);
    main();
}



function ab_HoverEventListen(e) 
    { 
        var srcElement = e.srcElement;
        console.log(srcElement.nodeName + " " + srcElement.className);
        
        if(!isDescendantOrSameNode(feedbackDiv, srcElement))
        {
            var currentHighlighted = Array.from(document.getElementsByClassName(highlightedClassName));
            currentHighlighted.forEach(function(x){
                x.classList.remove(highlightedClassName);
                x.parentNode.removeChild(feedbackDiv);
            });
        }
        if ((srcElement.nodeName == 'LI') //|| srcElement.nodeName == 'DIV' || srcElement.nodeName == 'LI' || srcElement.nodeName == 'A' || srcElement.nodeName == 'IMG') 
            && !isDescendantOrSameNode(feedbackDiv, srcElement)) 
        {
            var interestingNode = srcElement;
            interestingNode.parentNode.style.position = "relative";
            var rect = interestingNode.getBoundingClientRect();
            var left = rect.width;
            var styleOfInterestingNode = interestingNode.currentStyle || window.getComputedStyle(interestingNode);
            left += parseInt(styleOfInterestingNode.marginLeft.replace(/px/,""));
            feedbackDiv.style.left = left + "px";
            feedbackDiv.style.top = interestingNode.offsetTop + "px";
            //interestingNode.prepend(feedbackDiv);
            //feedbackDiv.style.display = "none";
            interestingNode.insertAdjacentElement('afterend',feedbackDiv);
            interestingNode.classList.add(highlightedClassName);
            feedbackDiv.style.display = "block";
   
            prevDOM = interestingNode;
        } 
    }