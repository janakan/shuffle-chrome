var subscriptions = [
  "news",
  "funny",
  "videos",
  "pics",
  "todayilearned",
  "worldnews",
  "gifs",
  "aww",
  "movies",
  "mildlyinteresting",
  "politics",
  "nottheonion",
  "wtf"
];

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

var items = {};
var pending = [];

function update(){
  subscriptions.forEach(function(s){
    fetch("https://api.reddit.com/r/" + s + "/hot").then(function(resp){
      return resp.json();
    }).then(function(resp){
      resp.data.children.forEach(function(child){
        var item = child.data;
        if(!items[item.id]){
          pending.push(item);
          items[item.id] = item;
        }
      })
    })
  })
}

update();

function randomItem(){
  if(pending.length < 1){
    pending = Object.values(items);
  }
  var rid = Math.floor(Math.random() * pending.length);
  var si = pending.splice(rid,1)[0];
  return si;
}

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
