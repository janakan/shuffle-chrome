var service = analytics.getService("boredom_button");
var tracker = service.getTracker("UA-61221904-15");
tracker.sendAppView("Launch");
tracker.sendEvent("Chrome","Start");

chrome.runtime.onInstalled.addListener(function(details){
  if(details.reason == "install"){
    tracker.sendEvent("Chrome","Install");
  }
  if(details.reason == "update"){
    tracker.sendEvent("Chrome","Update");
  }
});
chrome.runtime.setUninstallURL("http://www.boredombutton.com/uninstall.html?client=chrome");

chrome.browserAction.onClicked.addListener(function(tab){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var currentTab = tabs[0];
    var item = randomItem();
    tracker.sendEvent("Chrome","Shuffle","BrowserAction");
    chrome.tabs.update(currentTab.id, {url:item.url});
  });
});

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
  switch(request.type){
    case "random":
      tracker.sendEvent("Chrome","Shuffle","Mouse");
      sendResponse(randomItem());
      break;
    case "visit":
      tracker.sendEvent("Chrome","Visit",request.hostname);
      break;
    default:
      console.log("Unknown request type",request);
      break;
  }
})
