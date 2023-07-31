const text = document.querySelector("h1");
const button = document.querySelector(".button");
const customCursor = document.querySelector(".custom-cursor");
const cursorSquare = document.querySelector(".cursor-square");
const mainPage = document.querySelector(".main-page"); // New letter button
const exppandedCursor = document.querySelector(".exppanded-cursor");
const transitionBg =  document.querySelector(".transition-bg");
let isPaused = true;
let isInitialized = false;
let hasBeenClicked = false; // New variable to track if the button has been clicked
let mainPageClicked = false; // New variable to track if the button has been clicked
const audioElements = {};


const sounds = {
  N: ["./24-piano-keys/key13.mp3?v=1"],
  O: ["./24-piano-keys/key20.mp3?v=1"],
  E: ["./24-piano-keys/key18.mp3?v=1"],
  R: ["./24-piano-keys/key06.mp3?v=1"],
  S: ["./24-piano-keys/key15.mp3?v=1"],
  '\u002E': ["./24-piano-keys/key18.mp3?v=1"],
  '\u0C97': ['./24-piano-keys/key20.mp3?v=1'],
  '\u00B0': ["./24-piano-keys/key22.mp3?v=1"],
  '\u0028': ["./24-piano-keys/key24.mp3?v=1"],
  '\u0C97': ["./24-piano-keys/key13.mp3?v=1"],
  '\u0434': ["./24-piano-keys/key17.mp3?v=1"],
  '\u3002': ['./24-piano-keys/key20.mp3?v=1'],
  '\u0029': ["./24-piano-keys/key22.mp3?v=1"],
  '\u0E51': ["./24-piano-keys/key17.mp3?v=1"],
  '\u0027': ['./24-piano-keys/key20.mp3?v=1'],
  '\u2022': ["./24-piano-keys/key22.mp3?v=1"],
  '\u0020': ["./24-piano-keys/key24.mp3?v=1"],
  '\u032B': ["./24-piano-keys/key13.mp3?v=1"],
  '\u0942': ["./24-piano-keys/key03.mp3?v=1"],
  '\u00B4': ["./24-piano-keys/key13.mp3?v=1"],
  '\u0060': ["./24-piano-keys/key13.mp3?v=1"],
};

function getRandomColor() {
  const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"]; // Add your desired colors here
  return colors[Math.floor(Math.random() * colors.length)];
}

function updateCursorColor() {
  const randomColor1 = getRandomColor();
  const randomColor2 = getRandomColor();
  cursorSquare.style.setProperty("--gradient-colors", `${randomColor1}, ${randomColor2}`);
}

function updateCustomCursor(event) {
  const { clientX, clientY } = event;
  customCursor.style.left = `${clientX}px`;
  customCursor.style.top = `${clientY}px`;

  // Get the computed color of the button
  const computedStyle = window.getComputedStyle(button);
  const buttonColor = computedStyle.getPropertyValue('background-color');
  customCursor.style.backgroundColor = buttonColor;
}

document.addEventListener("mousemove", updateCustomCursor);

function showLetterButton(letter) {
  mainPage.textContent = letter;
  mainPage.style.visibility = "visible";
}

text.addEventListener("mouseover", (event) => {
  const target = event.target;
  if (target.tagName === "SPAN") {
    showLetterButton('Enter');
  }
});


function followMouse(event) {
  // Get the mouse position
  const mouseX = event.pageX;
  const mouseY = event.pageY;

  // Calculate the position for the cursor square
  const cursorX = mouseX - cursorSquare.clientWidth / 2;
  const cursorY = mouseY - cursorSquare.clientHeight / 1;

  // Set the position for the cursor square
  cursorSquare.style.left = `${cursorX}px`;
  cursorSquare.style.top = `${cursorY}px`;

  // Check if the mouse is within the button area
  const buttonRect = button.getBoundingClientRect();
  const isHoveringButton = mouseX >= buttonRect.left && mouseX <= buttonRect.right && mouseY >= buttonRect.top && mouseY <= buttonRect.bottom;

  // Set a class to the cursor square to apply a different style when hovering over the button
  cursorSquare.classList.toggle("hovering-button", isHoveringButton);
}

Object.entries(sounds).forEach(([letter, audioUrls]) => {
  const audios = audioUrls.map((audioUrl) => {
    const audio = new Audio(audioUrl + "?v=1");
    return audio;
  });
  audioElements[letter] = audios;
});


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

function preloadAudio(letter) {
  return new Promise((resolve, reject) => {
    if (audioElements[letter]) {
      const audioUrls = audioElements[letter];
      let loadedCount = 0;
      audioUrls.forEach((audioUrl) => {
        const audio = new Audio(audioUrl + "?v=1");
        audio.load();
        audio.addEventListener("loadeddata", () => {
          loadedCount++;
          if (loadedCount === audioUrls.length) {
            resolve();
          }
        });
        audio.addEventListener("error", (error) => {
          reject(error);
        });
      });
    } else {
      reject(new Error(`Audio files for letter ${letter} not found.`));
    }
  });
}

async function showLettersAndSymbols() {
  if (!hasBeenClicked) {
    const letters = text.textContent.split("");
    text.textContent = "";
    try {
      await Promise.all(letters.map((letter) => preloadAudio(letter)));
      letters.forEach((letter) => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.addEventListener("mouseover", () => {
          span.style.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
          playAudio(letter);
        });
        text.appendChild(span);
      });
      isInitialized = true;
    } catch (error) {
      console.error(error);
    }
  }
}

function changeLetterColorRandomly() {
  if (!hasBeenClicked) {
    const letters = text.querySelectorAll("span");
    letters.forEach((letter) => {
      letter.style.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    });
    hasBeenClicked = true;
  }
}
function showLettersAndSymbols() {
  if (!isInitialized) {
    const letters = text.textContent.split("");
    text.textContent = "";
    letters.forEach((letter) => {
      const span = document.createElement("span");
      span.textContent = letter;
      span.addEventListener("mouseover", () => {
        span.style.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
        playAudio(letter);
      });
      text.appendChild(span);
      preloadAudio(letter); // Preload the audio for the corresponding letter
    });
    isInitialized = true;
  }
}

function toggleButtonAnimation() {
  button.classList.toggle("spin");
  isPaused = !isPaused;
}

function handleButtonClick() {
  if (!hasBeenClicked) {
    showLettersAndSymbols();
    changeLetterColorRandomly();
  }

  toggleButtonAnimation();
  
}

button.addEventListener("click", handleButtonClick);



function handleNewPage() {
  if (!mainPageClicked) {
    // Start the transition animation
    const expandedCursor = document.createElement("div");
    expandedCursor.classList.add("expanded-cursor");
    document.body.appendChild(expandedCursor);

    const transitionBg = document.createElement("div");
    transitionBg.classList.add("transition-bg");
    document.body.appendChild(transitionBg);

    // Use the "transitionend" event to detect when the transition is completed
    transitionBg.addEventListener("transitionend", () => {
      // After the transition is complete, navigate to the new page
      window.location.href = "https://aklabz.github.io/NoErrors/";
    });

    // Update the opacity to make the transition background appear
    setTimeout(() => {
      transitionBg.style.opacity = "1";
    }, 200); // Delay the opacity change to allow the cursor animation to start
  }
}

const letterButton = document.querySelector(".letter-button");
letterButton.addEventListener("click", mainPageClicked);
