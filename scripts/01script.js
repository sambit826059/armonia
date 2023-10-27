const AudioContext = window.AudioContext || window.webkitAudioContext;  // creation of audio context(used to manipulate the track)
const audioCtx = new AudioContext();

const audioElement = document.querySelector("audio");
const playBtn = document.querySelector(".play-button");
const volumeSlider = document.querySelector(".volume");

const playFromLinkButton = document.querySelector("play-from-link");
const audioLinkInput = document.querySelector("audio-link");

const audioSource = audioCtx.createMediaElementSource(audioElement);

//play/plause
playBtn.addEventListener("click", () => {
    //check if context is in suspended state
    if(audioCtx.state === "suspended"){
        audioCtx.resume();
    }

    //if track is stopped, play it
    if (playBtn.getAttribute("class") === "paused") {
        audioElement.play();
        playBtn.setAttribute("class", "playing");
        playBtn.textContent = "Pause";
    } else if (playBtn.getAttribute("class") === "playing") {
        audioElement.pause();
        playBtn.setAttribute("class", "paused");
        playBtn.textContent = "Play";
    }
    
    });

//if track ends
audioElement.addEventListener("ended",() => {
    playBtn.setAttribute("class", "paused");
    playBtn.textContent = "Play";
});

//volume
const gainNode = audioCtx.createGain();

volumeSlider.addEventListener("input", () => {
    gainNode.gain.value = volumeSlider.value;
});

//play from link
playFromLinkButton.addEventListener("click", () => {
    const link = audioLinkInput.value;
    if(link) {
        audioElement.src = link;
        audioElement.load();
        audioElement.play();
    }
})

audioSource.connect(gainNode).connect(audioCtx.destination);



