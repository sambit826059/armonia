const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const audioElement = document.querySelector("audio");
const playBtn = document.querySelector(".play-button");
const volumeSlider = document.querySelector(".volume");

const audioSource = audioCtx.createMediaElementSource(audioElement);
const gainNode = audioCtx.createGain();

// Connect the audio source to the gain node and then to the audio context destination
audioSource.connect(gainNode).connect(audioCtx.destination);

// Play/Pause button event listener
playBtn.addEventListener("click", () => {
    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }

    if (audioElement.paused) {
        audioElement.play();
        playBtn.classList.remove("paused");
        playBtn.classList.add("playing");
        playBtn.textContent = "Pause";
    } else {
        audioElement.pause();
        playBtn.classList.remove("playing");
        playBtn.classList.add("paused");
        playBtn.textContent = "Play";
    }
});

// Update volume when slider input event occurs
volumeSlider.addEventListener("input", () => {
    // Smoothly ramp the volume to the new value
    gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volumeSlider.value, audioCtx.currentTime + 0.1);
});

// Set the initial volume to the slider value
gainNode.gain.value = volumeSlider.value;
