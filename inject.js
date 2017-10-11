console.log("I'm an injector");

function showNotification(){
  chrome.runtime.sendMessage({type:"random"},function(item){
    var notification = document.createElement("shuffle-notification");
    notification.className = "shuffle-notification";
    var title = document.createElement("shuffle-notification-title");
    title.innerHTML = item.title;
    var thumbnail = document.createElement("img");
    thumbnail.src = item.thumbnail;
    notification.appendChild(title);
    notification.appendChild(thumbnail);
    notification.addEventListener("click",function(){
      window.open(item.url);
    })
    document.body.appendChild(notification);
    console.log(notification);
    setTimeout(function(){
      console.log("Kill");
      document.body.removeChild(notification);
    },5000);
    console.log(item);
  })
}

setTimeout(showNotification,10000);
setInterval(showNotification,60000);
