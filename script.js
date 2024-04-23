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

/* Categories */
const artistCategoryBtn = document.getElementById("artist-category-btn")
const lyricsCategoryBtn = document.getElementById("lyrics-category-btn")
const musicCategoryBtn = document.getElementById("music-category-btn")
const videoCategoryBtn = document.getElementById("video-category-btn")

const artistCategoryContent = document.getElementById("artist-category-content")
const lyricsCategoryContent = document.getElementById("lyrics-category-content")
const musicCategoryContent = document.getElementById("music-category-content")
const videoCategoryContent = document.getElementById("video-category-content")

artistCategoryBtn.addEventListener("click", () => {
    if (artistCategoryBtn.classList.contains("category-btn-selected")){
        artistCategoryContent.classList.add("hidden-content")
        artistCategoryBtn.classList.remove("category-btn-selected")
    } else {
        lyricsCategoryContent.classList.add("hidden-content")
        musicCategoryContent.classList.add("hidden-content")
        videoCategoryContent.classList.add("hidden-content")
        artistCategoryContent.classList.remove("hidden-content")

        lyricsCategoryBtn.classList.remove("category-btn-selected")
        musicCategoryBtn.classList.remove("category-btn-selected")
        videoCategoryBtn.classList.remove("category-btn-selected")
        artistCategoryBtn.classList.add("category-btn-selected")
    }
})

lyricsCategoryBtn.addEventListener("click", () => {
    if (lyricsCategoryBtn.classList.contains("category-btn-selected")){
        lyricsCategoryContent.classList.add("hidden-content")
        lyricsCategoryBtn.classList.remove("category-btn-selected")
    } else {
        artistCategoryContent.classList.add("hidden-content")
        musicCategoryContent.classList.add("hidden-content")
        videoCategoryContent.classList.add("hidden-content")
        lyricsCategoryContent.classList.remove("hidden-content")

        artistCategoryBtn.classList.remove("category-btn-selected")
        musicCategoryBtn.classList.remove("category-btn-selected")
        videoCategoryBtn.classList.remove("category-btn-selected")
        lyricsCategoryBtn.classList.add("category-btn-selected")
    }
})

musicCategoryBtn.addEventListener("click", () => {

    if (musicCategoryBtn.classList.contains("category-btn-selected")){
        musicCategoryContent.classList.add("hidden-content")
        musicCategoryBtn.classList.remove("category-btn-selected")
    } else {
        artistCategoryContent.classList.add("hidden-content")
        lyricsCategoryContent.classList.add("hidden-content")
        videoCategoryContent.classList.add("hidden-content")
        musicCategoryContent.classList.remove("hidden-content")

        artistCategoryBtn.classList.remove("category-btn-selected")
        lyricsCategoryBtn.classList.remove("category-btn-selected")
        videoCategoryBtn.classList.remove("category-btn-selected")
        musicCategoryBtn.classList.add("category-btn-selected")
    }
})

videoCategoryBtn.addEventListener("click", () => {
    if (videoCategoryBtn.classList.contains("category-btn-selected")){
        videoCategoryContent.classList.add("hidden-content")
        videoCategoryBtn.classList.remove("category-btn-selected")
    } else {
        artistCategoryContent.classList.add("hidden-content")
        lyricsCategoryContent.classList.add("hidden-content")
        musicCategoryContent.classList.add("hidden-content")
        videoCategoryContent.classList.remove("hidden-content")

        artistCategoryBtn.classList.remove("category-btn-selected")
        lyricsCategoryBtn.classList.remove("category-btn-selected")
        musicCategoryBtn.classList.remove("category-btn-selected")
        videoCategoryBtn.classList.add("category-btn-selected")
    }
})

/* Menu Controls */
const openMenuBtn = document.getElementById("open-menu-btn")
const closeMenuBtn = document.getElementById("close-menu-btn")

openMenuBtn.addEventListener("click", () => {
    document.getElementById("overlay-menu").style.height = "100%"
})

closeMenuBtn.addEventListener("click", () => {
    document.getElementById("overlay-menu").style.height = "0%"
})
