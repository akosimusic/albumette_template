/* Javascript Cookies, Local Storage, and Session Storage */
let accessCookie = true

window.onload = () => {
    if (performance.getEntriesByType("navigation")[0].type === "navigate") {
        localStorage.setItem('userAccess',"granted")
    } else if (performance.getEntriesByType("navigation")[0].type !== "navigate"){
        localStorage.setItem('userAccess',"denied")
    }

    if (accessCookie === false && localStorage.getItem('userAccess') === "denied"){
        //the user's access has expired and that user's POE is NOT via NFC Card
        console.log(accessCookie + localStorage.getItem('userAccess'))
        document.getElementById("popup-notifications").style.height = "100%"
    } else if (accessCookie === false && localStorage.getItem('userAccess') === "granted"){
        //the user's access has expired but the user's POE is via NFC Card
        setAccessCookie("albumetteAccess","granted",6)
        console.log(accessCookie + localStorage.getItem('userAccess'))
    } else if (accessCookie === true && localStorage.getItem('userAccess') === "denied"){ 
        //the user's access has not expired but the user's POE is NOT via NFC Card
        console.log(accessCookie + localStorage.getItem('userAccess'))
    } else if (accessCookie === true && localStorage.getItem('userAccess') === "granted"){ 
        //the user's access has not expired and the user's POE is via NFC Card
        console.log(accessCookie + localStorage.getItem('userAccess'))
        setAccessCookie("albumetteAccess","granted",6)
    }
}

function setAccessCookie(name, value, minutes){
    const currDate = new Date();
    currDate.setTime(currDate.getTime() + (1000 * 60 * minutes))
    let expirationDate = "expires=" + currDate.toUTCString()
    document.cookie = `${name}=${value}; ${expirationDate}; path=/`
    accessCookie = true
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
        console.log(accessCookie + localStorage.getItem('userAccess'))
        clearInterval(cookieChecker)
    }
}, 1000)


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

