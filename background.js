console.log("Hello world");

var subscriptions = [
  "news",
  "funny",
  "videos",
  "pics",
  "todayilearned"
];

var items = {};

subscriptions.forEach(function(s){
  fetch("https://api.reddit.com/r/" + s +"/hot").then(function(resp){
    return resp.json();
  }).then(function(resp){
    resp.data.children.forEach(function(child){
      var item = child.data;
      items[item.id] = item;
    })
    console.log(Object.keys(items).length,"items");
  })
})

function randomItem(){
  var keys = Object.keys(items);
  var rkey = keys[Math.floor(Math.random() * keys.length)];
  return items[rkey];
}

chrome.browserAction.onClicked.addListener(function(tab){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var currentTab = tabs[0];
    var item = randomItem();
    console.log("Selected",item);
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

/*
setTimeout(function(){
  var item = randomItem();
  if(item.thumbnail && item.thumbnail != "default"){
    console.log("THUMB",item.thumbnail);
    showNotification(item);
  }else{
    console.log("Doesn't have a thumbnail");
  }
},10000);

function showNotification(item,imgurl){
  chrome.notifications.create(item.id,{
    type:"image",
    iconUrl:item.thumbnail,
    imageUrl:item.thumbnail,
    title:item.title,
    message:"Trending on BoredomButton",
    isClickable:true
  },function(notId){
    console.log("OK",notId);
  })
}
*/
