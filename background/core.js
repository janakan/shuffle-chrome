var service = analytics.getService("boredom_button");
var tracker = service.getTracker("UA-61221904-15");
var versionId = "Chrome-V4";

tracker.sendAppView("Launch");
tracker.sendEvent(versionId,"Start");

chrome.runtime.onInstalled.addListener(function(details){
  if(details.reason == "install"){
    tracker.sendEvent(versionId,"Install");
  }
  if(details.reason == "update"){
    tracker.sendEvent(versionId,"Update");
  }
});
chrome.runtime.setUninstallURL("http://www.boredombutton.com/uninstall.html?client=chrome");

chrome.browserAction.onClicked.addListener(function(tab){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var currentTab = tabs[0];
    var item = randomItem();
    tracker.sendEvent(versionId,"Shuffle","BrowserAction");
    chrome.tabs.update(currentTab.id, {url:item.url});
  });
});

var enabled = true;

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo){
  if(changeInfo.url){
    var u = new URL(changeInfo.url);
    tracker.sendEvent(versionId,"Visit",u.hostname);
  }
})

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
  switch(request.type){
    case "random":
      tracker.sendEvent(versionId,"Shuffle",request.trigger);
      sendResponse(randomItem());
      break;
    case "visit":
      tracker.sendEvent(versionId,"Visit",request.hostname,(enabled ? 1 :0));
      sendResponse(enabled);
      break;
    case "disable":
      tracker.sendEvent(versionId,"Disable");
      enabled = false;
      break;
    default:
      console.log("Unknown request type",request);
      break;
  }
})
