var countup;
var progressBar = document.createElement("shuffle-progress");
progressBar.innerHTML = "";
document.body.appendChild(progressBar);

function shuffle(){
  chrome.runtime.sendMessage({type:"random"},function(item){
    window.location.href = item.url;
  });
}

function activate(e){
  var i = 0;
  countup = setInterval(function(){
    i++;
    progressBar.style.visibility = "visible";
    progressBar.style.width = 20 + (i*2) + "%";
    console.log("ACTIVATE!");
    if(i == 40){
      clearInterval(countup);
      active = false;
      shuffle();
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

/*
var shuffleCircle = document.createElement("shuffle-circle");
shuffleCircle.innerHTML = ""
document.body.appendChild(shuffleCircle);

var shuffleCover = document.createElement("shuffle-cover");
shuffleCover.innerHTML = "";
document.body.appendChild(shuffleCover);

var expansion;
window.addEventListener("mousedown",function(e){
  var pointX = e.clientX;
  var pointY = e.clientY;
  shuffleCircle.style.left = pointX + "px";
  shuffleCircle.style.top = pointY + "px";
  var i = 0;
  expansion = setInterval(function(){
    i+=10;
    shuffleCircle.style.left = (pointX-i) + "px";
    shuffleCircle.style.top = (pointY-i) + "px";
    shuffleCircle.style.width = shuffleCircle.style.height = (i*2) + "px";
    console.log("Expand",i);
    if(i*2 > window.innerWidth){
      reset2();
      shuffleCover.style.visibility = "visible";
      shuffle();
    }
  },10);
})

function reset2(){
  clearInterval(expansion);
  shuffleCircle.style.width = 0 + "px";
}

window.addEventListener("mouseup",reset2);
window.addEventListener("mousemove",reset2);
*/
