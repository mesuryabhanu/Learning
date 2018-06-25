# Developing chrome extensions:
If you want to create a chrome extension, follow these steps:
1. Explore: The first steps is to install many(>50) extensions and take note of interesting designs and features. Go through their code and understand how they have implemented a particular feature.
2. Create design spec: List the features you want, and decide the compelte flow with the UX mocks. This steps is crucial for timely delivery of the projects. If you skip this the journey will be painful.
3. Create dev spec: Break the product into small pieces and implement them on by one. It will make the development very easy if you spend more time here and do a nice breakdown.
4. Work on implementing the features by following the dev spec.

# Edge extension:
To create an Edge extension, first create a Chrome extension and then make it compatible with Edge using Microsoft Edge Extension Tookit(you can download it from internet). It creates two additional files contentScriptsAPIBridge.js and backgroundScriptsAPIBridge.js to bridge the API call to chrome plarform APIs to Edge APIs and references these two files in manifest with -ms-preload field.


# Extension Basics:
## Manifest.json
The root file of the extension is manifest.json which contains the details/reference of the others files. You can check the format of manifest.json on internet to know what all fields are supported and the meaning of those fields. The most common parts of manifest.json are described here:
1. content_scripts: List of JS and css files which runs after page load, every time the user goes to a site mathing the 'matches' regex. Take care that the files should be written in order you intend them to be used and the external libraries used are also referenced here. 
    "content_scripts": [
        {
            "matches": [
                "http://*/*",
                "https://*/*"
            ],
            "js": [
                "scripts/jquery.min.js",
                "scripts/main.js"
            ],
            "css": [
                "scripts/main.css"
            ]
        }
    Do note that content scripts is not added to the current impression permanently, instead they are run on the current impression once and you can add event handlers to current page's event. Any function defined in content script will not be accessible to the current DOM unless it has been added to DOM. for example:
    document.getElementById("myId").onclick = myFunction;
    
    but the following will not work:
    document.getElementById("myId").innerHtml = "<button onclick='myFunction'>";
    
2. background scripts: These are the scripts which run in background only once, when the extension is installed. In this script you can initialize the localStorage, give some unique ID to the user, add eventlisteners to do soemthing like logging etc. on receiving message or on browser events like tab open, close, focus change etc. You can also use window.setInterval to run a function perodically in background script.
    "background": {
        "page": "background.html",
        "persistent": true
    },
    background.html will have reference to the javascript files which have to be run on extension install. This format of declaring background is compatiable with both Chrome and Edge. There is other way of declaring in Chrome where you specify the list of JS files in manifest and Chrome will internally create background.html for you by referencing those JS files.
3. browser actions:
It describes the icon which appears on the top of the browser for the extension. It consists of icon, tooltip, badge -> text over the icon, and popup html. You can capture the events of browser action in background script and do other things like modifying the current page or opening settings page in new tab etc. if you want.

4. permissions:
Here you need to specify the additional permissions your extension needs.

## Parts of extesnsion:
    Content scripts
    Background scripts
    popup.html

## Message passing between different parts of extension: 
You can pass messages from background to content script or content to background script. 
You dont need to pass message to communicate from one content script to other or one background script to other, you can use function calls for that.

## localStorage:
It is a storage provided by the browser for webpages, similar to cookies but much larger than cookies. The content scripts can access the localStorage of the current page. The background html of the extension also has a localStorage which can be accessed through background scripts and is persistent across browser sessions and computer restarts. The limit of localStorage of any webPage or of any extension is 25 to 20 MB. Always keep in mind that localStorage accessed though content script is differnt from localStorage accessed though background HTML. If you want to save something from content script persistently, send it as message to background script and store it in localStorage from background script.

## Making calls to an external API
## Debugging


## Commons tips:
1. Opening a URL or extension page in new Tab
2. Modifying the HTML of the current page: Take care that the IDs and class names of the newly added elements do not match with existing IDs/classes on the page otherwise unexpected problem will occur.
3. Add event listeners to current page
4. Logging the details of the current page
5. Opening a popup on clicking the extension icon
6. Doing something in background/current HTML on clicking the extension icon: 
7. Managing time on current page/tab
8. Tab events listeners

