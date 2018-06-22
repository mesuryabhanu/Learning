var sidePanelHtml= `
    <div class="ab_sideContainer">
        <div class="ab_header">
            <img src="ExtLogo.png" class="ab_techItlogo" id="ab_techItlogo">
            <div style="margin-left: 5px;vertical-align: middle;"><b>My Basic Extension</b></div>
        </div>
        <div class="ab_identity">
            <div>Please enter your Name</div>
            <input class="ab_aliasBox" type="text" style="display:inline">
            <button class="ab_aliasSubmitBtn" id="ab_aliasSubmitBtn">Submit</button>
        </div>
        <div class="ab_addCmnts">
            <div>Please enter some text to download with page details</div>
            <textarea class="ab_addCmntsBox"></textarea>
            <button class="ab_addCmntsBtn ab_cmntReset" id="ab_cmntReset">Reset</button>
            <button class="ab_addCmntsBtn ab_cmntSubmit" id="ab_cmntSubmit">Download</button>
            <span id="ab_submitMsg"></span>
            <div id="ab_valMsg"></div>
        </div>
    </div>
    <div class="ab_extras">
        <a id="ab_viewSettings">View Settings</a>
    </div>
`;