var countup;
var progressBar = document.createElement("shuffle-progress");
progressBar.innerHTML = "";
document.body.appendChild(progressBar);


chrome.runtime.sendMessage({type:"visit",hostname:window.location.hostname},function(enabled){
  if(enabled){
    var shuffleButton = document.createElement("shuffle-button");
    shuffleButton.innerHTML = "Shuffle";
    shuffleButton.addEventListener("click",function(){
      shuffle("bigbutton");
    });
    document.body.appendChild(shuffleButton);
    var closeButton = document.createElement("span");
    closeButton.innerHTML = "X";
    shuffleButton.appendChild(closeButton);
    closeButton.addEventListener("click",function(e){
      chrome.runtime.sendMessage({type:"disable"});
      e.stopPropagation();
      shuffleButton.style.display = "none";
    })
  }
});

function shuffle(trigger){
  chrome.runtime.sendMessage({type:"random",trigger:trigger},function(item){
    window.location.href = item.url;
  });
}

function activate(e){
  var i = 0;
  countup = setInterval(function(){
    i++;
    progressBar.style.visibility = "visible";
    progressBar.style.width = 20 + (i*2) + "%";
    if(i == 40){
      clearInterval(countup);
      active = false;
      shuffle("mouse");
    }
  },15);
}

function reset(){
  clearInterval(countup);
  progressBar.style.width = "20%";
  progressBar.style.visibility = "hidden";
}

window.addEventListener("mousedown",activate);
window.addEventListener("mouseup",reset);
window.addEventListener("mousemove",reset);
window.addEventListener("click",reset);
window.addEventListener("contextmenu",reset);
