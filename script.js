const text = document.querySelector("h1");
const button = document.querySelector(".button");

let isPaused = false;

const sounds = {
  N: ["24-piano-keys/key13.mp3?v=1"],
  O: ["24-piano-keys/key20.mp3?v=1"],
  E: ["24-piano-keys/key23.mp3?v=1"],
  R: ["24-piano-keys/key20.mp3?v=1"],
  S: ["24-piano-keys/key15.mp3?v=1"],
  
  '\u002E': ["24-piano-keys/key17.mp3?v=1"],
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
  '\u0942': ["24-piano-keys/key13.mp3?v=1"],
  '\u00B4': ["24-piano-keys/key13.mp3?v=1"],
  '\u0060': ["24-piano-keys/key13.mp3?v=1"],
};

// Preload audio files to improve playback
Object.values(sounds).forEach((audioUrls) => {
  audioUrls.forEach((audioUrl) => {
    const audio = new Audio(audioUrl + "?v=1");
    audio.preload = "auto";
  });
});

button.addEventListener("click", () => {
  button.classList.toggle("spin");
  isPaused = !isPaused;

  const hoverEffect = () => {
    const letters = text.textContent.split("");
    text.textContent = ""; // clear the text content
    let index = 0;
    letters.forEach((letter) => {
      const span = document.createElement("span");
      span.textContent = letter;
      span.addEventListener("mouseover", () => {
        span.style.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
        // Play sound for corresponding letter
        if (sounds[letter]) {
          const audioUrls = sounds[letter];
          const audioUrl = audioUrls[index % audioUrls.length];
          const audio = new Audio(audioUrl + "?v=1");
          audio.currentTime = 0; // rewind to start of audio file
          audio.play().then(() => {
            console.log(`Playing sound for letter ${letter}: ${audioUrl}`);
          }).catch((error) => {
            console.log(`Error playing sound for letter ${letter}: ${error.message}`);
          });
          index++;
        }
      });
      text.appendChild(span);
    });
  };

  hoverEffect();
});

// Bounce animation on click for button 1
button.addEventListener("click", () => {
  button.classList.add("bounce");
  setTimeout(() => {
    button.classList.remove("bounce");
  }, 1000);
});

// Pause animation on click for button 2
const pauseButton = document.querySelector(".pause-button");

pauseButton.addEventListener("click", () => {
  if (isPaused) {
    button.classList.add("spin");
    isPaused = false;
  } else {
    button.classList.remove("spin");
    isPaused = true;
  }
});
