// Setting Game Name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Game Created By Ahmed Labib`;
// setting Game Options
let numberOfTries = 5;
let numberOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;
// mange word
let wordToGuess = "";
const words = [
  "Create",
  "Update",
  "Delete",
  "Master",
  "Branch",
  "Clouds",
  "Fables",
  "Flakes",
  "Gained",
  "Hounds",
  "Lances",
  "Loaded",
  "Mounds",
  "Pained",
  "Rounds",
  "Scales",
  "Shores",
  "Slices",
  "Spades",
  "Stamps",
  "Stores",
  "Towers",
];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();

// console.log(wordToGuess);

let messageArea = document.querySelector(".message");

// manage hints
document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintsButton = document.querySelector(".hint");
getHintsButton.addEventListener("click", getHint);

function generateInput() {
  const inputsContainer = document.querySelector(".inputs");
  for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;
    if (i !== 1) {
      tryDiv.classList.add("disabled-input");
    }
    for (let j = 1; j <= numberOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }

    inputsContainer.appendChild(tryDiv);
  }
  inputsContainer.children[0].children[1].focus();

  //  disable all inputs ecaeopt ffirst one
  const inputsInDisabledDiv = document.querySelectorAll(
    ".disabled-input input"
  );
  inputsInDisabledDiv.forEach((input) => (input.disabled = true));
  const inputs = document.querySelectorAll("input");

  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    });
    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target);
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) {
          inputs[nextInput].focus();
        }
      }
      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput < inputs.length) {
          inputs[prevInput].focus();
        }
      }
    });
  });
}
const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);
function handleGuesses() {
  let successGuess = true;
  for (i = 1; i <= numberOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];
    if (letter === actualLetter) {
      inputField.classList.add("in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("no");
      successGuess = false;
    }
  }
  //  check if user win or lose
  if (successGuess) {
    messageArea.innerHTML = `You Win The Word Is <span> ${wordToGuess} </span>`;
    if (numberOfHints === 2) {
      messageArea.innerHTML = `<p>Congratulation You Did't Use Hints</p>`;
    }

    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-input"));
    guessButton.disabled = true;
    getHintsButton.disabled = true;
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-input");
    const currenttryInput = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    currenttryInput.forEach((input) => (input.disabled = true));
    currentTry++;

    const nextTryInput = document.querySelectorAll(`.try-${currentTry} input`);
    nextTryInput.forEach((input) => (input.disabled = false));

    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-input");
      el.children[1].focus();
    } else {
      messageArea.innerHTML = `You Lose The Word Is <span> ${wordToGuess} </span>`;
      guessButton.disabled = true;
      getHintsButton.disabled = true;
    }
  }
}

function getHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;
  }
  if (numberOfHints === 0) {
    getHintsButton.disabled = true;
  }
  const enabledInputs = document.querySelectorAll("input:not([disabled])");
  const emptyenabledInputs = Array.from(enabledInputs).filter(
    (input) => input.value === ""
  );
  if (emptyenabledInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyenabledInputs.length);
    const randomInput = emptyenabledInputs[randomIndex];
    const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
    if (indexToFill !== -1) {
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
  }
}

function handleBackspace(event) {
  if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);
    if (currentIndex > 0) {
      const currentInput = inputs[currentIndex];
      const prevInput = inputs[currentIndex - 1];
      currentInput.value = "";
      prevInput.focus();
      prevInput.value = "";
    }
  }
}

document.addEventListener("keydown", handleBackspace);

window.onload = function () {
  generateInput();
};
