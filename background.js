console.log("Hello world");


chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    for (var i = 0; i < details.responseHeaders.length; ++i) {
      if (details.responseHeaders[i].name.toLowerCase() == 'x-frame-options') {
        details.responseHeaders.splice(i, 1);
        return {
          responseHeaders: details.responseHeaders
        };
      }
    }
  }, {urls: ["<all_urls>"]}, ["blocking", "responseHeaders"]);




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

var i = 0;
function updateIcon(){
  var colors = ["yellow","red","blue","purple"]
  i++;
  var color = 'hsl(' + i + ', 100%, 50%)';
  console.log(color);
  var canvas = document.createElement("canvas");
  canvas.width = 150;
  canvas.height = 150;
  var ctx = canvas.getContext('2d');

  ctx.fillStyle = color;
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(75, 75, 70, 0, Math.PI * 2); // Outer circle
  ctx.stroke();
  ctx.fill();

  ctx.fillStyle = "black";
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.arc(50,60,10,0,Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "black";
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.arc(100,60,10,0,Math.PI * 2);
  ctx.fill();

  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(40,100);
  ctx.lineTo(110,110);
  ctx.stroke();

  chrome.browserAction.setIcon({
    imageData: ctx.getImageData(0, 0, 150, 150)
  });
}

//setInterval(updateIcon,100);
console.log("SUCCESS!");


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
