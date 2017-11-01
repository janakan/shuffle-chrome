var service = analytics.getService("boredom_button");
var tracker = service.getTracker("UA-61221904-15");
var versionId = "Chrome-V7";

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
var searchHistory = {};

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
  if(tab.status == "complete" && !tab.url){
    tracker.sendEvent(versionId,"NewTab");
  }
  if(changeInfo.url){
    var u = new URL(changeInfo.url);
    var hostname = u.hostname;
    tracker.sendEvent(versionId,"Visit",hostname);
    if(hostname == "www.youtube.com"){
      tracker.sendEvent(versionId,"Video");
    }
  }
  if(tab.status == "loading" && tab.url && tab.url.indexOf("google.") != -1 && tab.url.indexOf("/search") != -1 && tab.url.indexOf("q=") != -1){
    if(!searchHistory[tab.url]){
      tracker.sendEvent(versionId,"GoogleSearch");
      searchHistory[tab.url] = 1;
      setTimeout(function(){
        delete searchHistory[tab.url];
      },5000);
    }
  }
})

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
  switch(request.type){
    case "random":
      tracker.sendEvent(versionId,"Shuffle",request.trigger);
      sendResponse(randomItem());
      break;
    case "blur":
      var active = (sender.tab.windowId == currentWindowId) && (sender.tab.active);
      if(active){
        tracker.sendEvent(versionId,"OmnibarFocus");
        console.log("OmnibarFocusEvent",versionId);
      }
      break;
    default:break;
  }
})

var currentWindowId = -1;
chrome.windows.onFocusChanged.addListener(function(windowId){
  currentWindowId = windowId;
});
chrome.windows.getCurrent(function(window){
  currentWindowId = window.id;
});
