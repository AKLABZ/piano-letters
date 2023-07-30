// script.js
const text = document.querySelector("h1");
const button = document.querySelector(".button");

let isPaused = true;
let isInitialized = false;

const sounds = {
  N: ["24-piano-keys/key13.mp3?v=1"],
  O: ["24-piano-keys/key20.mp3?v=1"],
  E: ["24-piano-keys/key18.mp3?v=1"],
  R: ["24-piano-keys/key06.mp3?v=1"],
  S: ["24-piano-keys/key15.mp3?v=1"],
  '\u002E': ["24-piano-keys/key18.mp3?v=1"],
  '\u0C97': ['24-piano-keys/key20.mp3?v=1'],
  '\u00B0': ["24-piano-keys/key22.mp3?v=1"],
  '\u0028': ["24-piano-keys/key24.mp3?v=1"],
  '\u0C97': ["24-piano-keys/key13.mp3?v=1"],
  '\u0434': ["24-piano-keys/key17.mp3?v=1"],
  '\u3002': ['24-piano-keys/key20.mp3?v=1'],
  '\u0029': ["24-piano-keys/key22.mp3?v=1"],
  '\u0E51': ["24-piano-keys/key17.mp3?v=1"],
  '\u0027': ['24-piano-keys/key20.mp3?v=1'],
  '\u2022': ["24-piano-keys/key22.mp3?v=1"],
  '\u0020': ["24-piano-keys/key24.mp3?v=1"],
  '\u032B': ["24-piano-keys/key13.mp3?v=1"],
  '\u0942': ["24-piano-keys/key03.mp3?v=1"],
  '\u00B4': ["24-piano-keys/key13.mp3?v=1"],
  '\u0060': ["24-piano-keys/key13.mp3?v=1"],
};

const audioElements = {};

Object.entries(sounds).forEach(([letter, audioUrls]) => {
  const audios = audioUrls.map((audioUrl) => {
    const audio = new Audio(audioUrl + "?v=1");
    audio.preload = "auto";
    return audio;
  });
  audioElements[letter] = audios;
});

// Add a user interaction event to allow audio playback
function playAudio(letter) {
  if (!isPaused && audioElements[letter]) {
    const audioUrls = audioElements[letter];
    const audio = audioUrls[Math.floor(Math.random() * audioUrls.length)];
    audio.currentTime = 0;
    audio.play().then(() => {
      console.log(`Playing sound for letter ${letter}: ${audio.src}`);
    }).catch((error) => {
      console.log(`Error playing sound for letter ${letter}: ${error.message}`);
    });
  }
}

function initialize() {
  if (!isInitialized) {
    const hoverEffect = () => {
      const letters = text.textContent.split("");
      text.textContent = "";
      letters.forEach((letter) => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.addEventListener("mouseover", () => {
          span.style.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
          playAudio(letter); // Call the playAudio function on mouseover
        });
        text.appendChild(span);
      });
    };
    hoverEffect();
    isInitialized = true;
  }
}

button.addEventListener("click", () => {
  button.classList.toggle("spin");
  isPaused = !isPaused;
  if (!isPaused) {
    initialize();
  }
});

// Bounce animation on click for button 1
button.addEventListener("click", () => {
  button.classList.add("bounce");
  setTimeout(() => {
    button.classList.remove("bounce");
  }, 1000);
});
