var countup;
var progressBar = document.createElement("shuffle-progress");
progressBar.innerHTML = "";
document.body.appendChild(progressBar);

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

window.addEventListener("blur",function(){
  chrome.runtime.sendMessage({type:"blur"});
})
