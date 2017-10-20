function shuffle(){
  chrome.runtime.sendMessage({type:"random"},function(item){
    window.location.href = item.url;
  });
}

var progressBar = document.createElement("shuffle-progress");
progressBar.innerHTML = "Hold to shuffle";
document.body.appendChild(progressBar);

var countup;

window.addEventListener("mousedown",function(e){
  var i = 0;
  countup = setInterval(function(){
    i++;
    progressBar.style.display = "block";
    progressBar.style.width = 20 + (i*2) + "%";
    if(i == 40){
      clearInterval(countup);
      active = false;
      shuffle();
    }
  },15);
});
window.addEventListener("mouseup",function(){
  clearInterval(countup);
  progressBar.style.width = "20%";
  progressBar.style.display = "none";
});

window.addEventListener("mousemove",resetInfo);
window.addEventListener("scroll",resetInfo);
