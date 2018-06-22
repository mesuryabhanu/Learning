'use strict';
//This file contains the common utility fucntions in JavaScript

/**Create a unique guid, can be used as user id/impression ID etc.
*/
function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**Checks if the child node is a descendant of potentialAncestor node
*/
function isDescendant(potentialAncestor, child) {
  var node = child.parentNode;
  while (node != null) {
      if (node == potentialAncestor) {
          return true;
      }
      node = node.parentNode;
  }
  return false;
}

/**Checks if the given node is a descendant of potentialAncestor node or it is the same node
*/
function isDescendantOrSameNode(potentialAncestor, node) {
  if(node == potentialAncestor || isDescendant(potentialAncestor, node))
    return true;
  return false;
}

/**Adds value to an array stored in localStorage with arrayKey as key. Creates the array with one value if it does not exist.
*/
function addToLocalStorageArray(arrayKey, value) 
{
    var localStorageValue = localStorage.getItem(arrayKey);
    if(typeof(localStorageValue) == 'undefined' || localStorageValue == null)
        localStorageValue = '[]';
	var localStorageArray = JSON.parse(localStorageValue);
	localStorageArray.push(value);
	localStorage.setItem(arrayKey, JSON.stringify(localStorageArray));
}

/**Returns the value of the cookie with cname as key
*/
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


/**downloads the text as a file in the default downloads location of the user.
*/
function downloadTextAsFile(filename, text) {
    var tempElem = document.createElement('a');
    tempElem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    tempElem.setAttribute('download', filename);
    tempElem.click();
 }

/**Creates HTML TextArea  tag with given parameters
*/
function createTextAreaItem(id, name, className, rows, cols, placeholder)
{
  var textAreaNode = document.createElement("textarea");
  textAreaNode.rows = rows;
  textAreaNode.cols = cols;
  textAreaNode.id = id;
  textAreaNode.name = name;
  textAreaNode.className = className;
  textAreaNode.placeholder = placeholder;
  return textAreaNode;
}

/**Creates HTML input tag with given parameters
*/
function createInputItem(text, id, type, className, style="")
{
  var inputNode = document.createElement("input");
  inputNode.value = text;
  inputNode.type = type;
  inputNode.id = id;
  inputNode.className = className;
  inputNode.style = style;
  return inputNode;
}

/**Creates HTML Label tag with given parameters
*/
function createLabelItem(id, className, style, text, tooltip)
{
  var labelNode = document.createElement("label");
  if(id != '')
    labelNode.id = id;
  if(className != '')
    labelNode.className = className;
  labelNode.style = style;
  labelNode.innerText = text;
  if(tooltip != '')
    labelNode.title = tooltip;
  return labelNode;
}

/**Creates HTML Checkbox tag with given parameters
*/
function createCheckboxItem(id, className, style, isChecked)
{
  var inputNode = document.createElement("input");
  inputNode.type = "checkbox";

  if(id != '')
    inputNode.id = id;
  if(className != '')
    inputNode.className = className;
  inputNode.style = style;
  inputNode.checked = isChecked;
  return inputNode;
}

/**Creates HTML Span tag with given parameters
*/
function createSpanItem(id, className, style="")
{
  var spanNode = document.createElement("span");
  if(id != '')
    spanNode.id = id;
  if(className != '')
    spanNode.className = className;
  spanNode.style = style;
  return spanNode;
}

/**Creates HTML Div tag with given parameters
*/
function createDivItem(id, className, style="")
{
  var divNode = document.createElement("div");
  if(id != '')
    divNode.id = id;
  if(className != '')
    divNode.className = className;
  divNode.style = style;
  return divNode;
}
