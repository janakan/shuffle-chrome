function shuffle(){
  chrome.runtime.sendMessage({type:"random"},function(item){
    window.location.href = item.url;
  });
}
function hideButton(){
  shuffleButton.style.display = "none";
  closeButton.style.display = "none";
}

/*

var closeButton = document.createElement("shuffle-close-button");
closeButton.innerHTML = "Close";
closeButton.addEventListener("click",hideButton);
document.body.appendChild(closeButton);
*/


var restricted = ["TEXTAREA","INPUT"];
window.addEventListener("keydown",function(e){
  if(e.keyCode == 32 && restricted.indexOf(e.target.nodeName) == -1){
    e.preventDefault();
    shuffle();
  }
})

window.addEventListener("dblclick",function(e){
  //shuffle();
})

var content = "<div style='flex:1' class='impact-count'>You've sponsored 15 cups of water today.</div><div class='shuffle-button'>Shuffle</div><img src='http://localhost:5000/heart.png'>"

var shuffleBar = document.createElement("shuffle-bar");
shuffleBar.innerHTML = content;
shuffleBar.addEventListener("click",shuffle);
document.body.appendChild(shuffleBar);

/*

var shuffleButton = document.createElement("shuffle-button");
var icon = document.createElement("img");
icon.src = "http://localhost:5000/shuffle.png";
shuffleButton.appendChild(icon);
shuffleButton.addEventListener("click",shuffle);
document.body.appendChild(shuffleButton);

var shuffleLabel = document.createElement("shuffle-label");
shuffleLabel.innerHTML = "15";
document.body.appendChild(shuffleLabel);

//shuffleButton.innerHTML = "Shuffle"; // + window.location.hostname.replace("www.","");

var cupIcon = document.createElement("img");
cupIcon.className = "shuffle-cup-icon";
cupIcon.src = "http://localhost:5000/cup.png";
document.body.appendChild(cupIcon);

var heartIcon = document.createElement("img");
heartIcon.className = "shuffle-heart-icon";
heartIcon.src = "http://localhost:5000/heart.png";
document.body.appendChild(heartIcon);
*/
