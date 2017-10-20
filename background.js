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
    chrome.tabs.update(currentTab.id, {url:item.url});
  });
});

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
  switch(request.type){
    case "random":
      sendResponse(randomItem());
      break;
    default:
      console.log("Unknown request type",request);
      break;
  }
})
