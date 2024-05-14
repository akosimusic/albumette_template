/* Javascript Cookies, Local Storage, and Session Storage */
let accessCookie = true

window.onload = () => {
    if (getCookie("albumetteAccess") !== "granted"){
        accessCookie = false
    }

    if (accessCookie === false){
        setLocalSession()
        clearInterval(cookieChecker)
        if (localStorage.getItem('userAccess') === "granted"){
            setAccessCookie("albumetteAccess","granted",6)
            console.log(accessCookie + " " + localStorage.getItem('userAccess'))
            console.log("user cookies have expired and the poe is via direct link")
            //this means that the user's cookies expired but the user was able to tap their NFC card so their cookies are reset.
        } else if (localStorage.getItem('userAccess') === "denied"){
            document.getElementById("popup-notifications").style.height = "100%"
            console.log(accessCookie + " " + localStorage.getItem('userAccess'))
            console.log("user cookies have expired and the poe is NOT via direct link")
            //this means that the user's cookies expired and the user was not able to tap their NFC card so their cookies are not reset.
        }
    } else {
        setLocalSession()
        if (localStorage.getItem('userAccess') === "granted"){
            setAccessCookie("albumetteAccess","granted",6)
            console.log(accessCookie + " " + localStorage.getItem('userAccess'))
            console.log("user cookies have NOT expired and the poe is via direct link")
            //this means that the user's cookies has not expired but the user was able to tap their NFC card so their cookies are reset.
        } else if (localStorage.getItem('userAccess') === "denied"){
            console.log(accessCookie + " " + localStorage.getItem('userAccess'))
            console.log("user cookies have NOT expired and the poe is NOT via direct link")
            //this means that the user's cookies has not expired but the user's POE is not via direct link.
        }
    }

}

function setAccessCookie(name, value, minutes){
    const currDate = new Date();
    currDate.setTime(currDate.getTime() + (1000 * 60 * minutes))
    let expirationDate = "expires=" + currDate.toUTCString()
    document.cookie = `${name}=${value}; ${expirationDate}; path=/`
    accessCookie = true
}

function setLocalSession(){
    if (performance.getEntriesByType("navigation")[0].type === "navigate") {
        localStorage.setItem('userAccess',"granted")
    } else if (performance.getEntriesByType("navigation")[0].type !== "navigate"){
        localStorage.setItem('userAccess',"denied")
    }
}

function getCookie(name){
    const cookieDecoded = decodeURIComponent(document.cookie)
    const cookieArray = cookieDecoded.split("; ")
    let result

    cookieArray.forEach(element => {
        if(element.indexOf(name) == 0){
            result = element.substring(name.length + 1)
        }
    })

    return result
}

let cookieChecker = setInterval(() => {
    if (getCookie("albumetteAccess") !== "granted"){
        accessCookie = false
        document.getElementById("popup-notifications").style.height = "100%"
        console.log(accessCookie + " " + localStorage.getItem('userAccess'))
        clearInterval(cookieChecker)
    }
}, 1000)

/* Music Player */
let playPauseBtn = document.querySelector(".playpause-track")
let currentTrack = document.getElementById("song")
let trackProgress = document.getElementById("progress")
let currentTime = document.querySelector(".current-time")
let totalDuration = document.querySelector(".total-duration")
let isPlaying = false

currentTrack.onloadedmetadata = function(){
    trackProgress.max = currentTrack.duration;
    trackProgress.value = currentTrack.currentTime;
}

function playpauseTrack() {
    isPlaying ? pauseTrack () : playTrack()
}

function playTrack(){
    currentTrack.play()
    isPlaying = true
    playPauseBtn.innerHTML = '<img class="play-icon-xl" src="svg/pause.svg">'
}

function pauseTrack(){
    currentTrack.pause()
    isPlaying = false
    playPauseBtn.innerHTML = '<img class="play-icon-xl" src="svg/play.svg">'
}

if(currentTrack.play()){
    setInterval(()=>{
        trackProgress.value = currentTrack.currentTime
   
        let currentMinutes = Math.floor(currentTrack.currentTime / 60)
        let currentSeconds = Math.floor(currentTrack.currentTime - currentMinutes * 60)
    
        let durationMinutes = Math.floor(currentTrack.duration / 60)
        let durationSeconds = Math.floor(currentTrack.duration - durationMinutes * 60)
    
        if (currentSeconds < 10){
             currentSeconds = "0" + currentSeconds
        }
    
        if (durationSeconds < 10){
            durationSeconds = "0" + durationSeconds
        }
    
        if (currentMinutes < 10){
            currentMinutes = "0" + currentMinutes
        }
    
        if (durationMinutes < 10){
            durationMinutes = "0" + durationMinutes
        }
    
        currentTime.textContent = currentMinutes + ":" + currentSeconds
        totalDuration.textContent = durationMinutes + ":" + durationSeconds
    },300);
}

trackProgress.onchange = function(){
    trackProgress.value = currentTrack.currentTime
    playTrack()
}

trackProgress.onchange = function(){
    currentTrack.play();
    currentTrack.currentTime = trackProgress.value
    playTrack()
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

/* YouTube API Integrations */

fetch('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=UU2VRbK74uiqa90HtJXrXm7w&key=AIzaSyAz3o1mkFqwGFTyScUJ_KVwnQ76S3ouPVo')
.then(res =>{
    return res.json()
})
.then (data =>{
    data.items.forEach(curr=>{
        videoTitle = curr.snippet.title
        videoId = curr.snippet.resourceId.videoId
        videoURL = "https://www.youtube.com/watch?v=" + curr.snippet.resourceId.videoId
        videoThumbnail = curr.snippet.thumbnails.maxres.url
        videoUploadTimeStamp = new Date(curr.snippet.publishedAt).getTime()

        videoUploadDay = new Date(videoUploadTimeStamp).getDate()
        switch (new Date(videoUploadTimeStamp).getMonth() + 1){
            case 0:
                videoUploadMonth = "January"
                break;
            case 1:
                videoUploadMonth = "February"
                break;
            case 2:
                videoUploadMonth = "March"
                break;
            case 3:
                videoUploadMonth = "April"
                break;
            case 4:
                videoUploadMonth = "May"
                break;
            case 5:
                videoUploadMonth = "June"
                break;
            case 6:
                videoUploadMonth = "July"
                break;
            case 7:
                videoUploadMonth = "August"
                break;
            case 8:
                videoUploadMonth = "September"
                break;
            case 9:
                videoUploadMonth = "October"
                break;
            case 10:
                videoUploadMonth = "November"
                break;
            case 11:
                videoUploadMonth = "December"
                break;
        }
        videoUploadYear = new Date(videoUploadTimeStamp).getFullYear()

        markupVideoGallery = `<div class="video-placeholder">
                                <a style="text-decoration: none" href='${videoURL}' target='_blank'><image class="video-thumbnail" src=${videoThumbnail}></image></a>
                                <a style="text-decoration: none" href='${videoURL}' target='_blank'><div class="video-title body-white">${videoTitle}</div></a>
                                <div class="video-upload-date caption-white">${videoUploadYear} ${videoUploadMonth} ${videoUploadDay}</div>
                            </div>`

        document.querySelector('div.video-gallery').insertAdjacentHTML('beforeend',markupVideoGallery)
    })
})

