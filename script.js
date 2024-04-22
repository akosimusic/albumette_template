/* Header */
window.onscroll = function() {myFunction()}

var header = document.getElementById("header")

var sticky = header.offsetTop

function myFunction() {
  if (window.scrollY > sticky) {
    header.classList.add("sticky")
  } else {
    header.classList.remove("sticky")
  }
}

/* Music Player Controls */
let progress = document.getElementById("progress")
let song = document.getElementById("song")
let ctrlIcon = document.getElementById("ctrlIcon")

song.onloadedmetadata = function(){
    progress.max = song.duration;
    progress.value = song.currentTime;
}

function playPause() {
    if(ctrlIcon.classList.contains("play")){
        song.play();
        ctrlIcon.src = "svg/pause.svg"
        ctrlIcon.classList.remove("play")
        ctrlIcon.classList.add("pause")
    } else {
        song.pause();
        ctrlIcon.src = "svg/play.svg"
        ctrlIcon.classList.remove("pause")
        ctrlIcon.classList.add("play")
    }
}

if(song.play()){
    setInterval(()=>{
        progress.value = song.currentTime
    },300);
}

progress.onchange = function(){
    song.play();
    song.currentTime = progress.value
    ctrlIcon.src = "svg/pause.svg"
    ctrlIcon.classList.remove("play")
    ctrlIcon.classList.add("pause")
}

/* Card Flip Animations */
const flipCard = document.getElementById("flip-card")
const cardFrontFlipBtn = document.getElementById("btn-front-flip")
const cardBackFlipBtn = document.getElementById("btn-back-flip")

cardFrontFlipBtn.addEventListener("click", () => {
    flipCard.classList.toggle("active")
} )

cardBackFlipBtn.addEventListener("click", () => {
    flipCard.classList.toggle("active")
} )
