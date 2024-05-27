function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const boxes = document.querySelectorAll("main > div");
const timeSpan = document.querySelector(".time");
const attemptsSpan = document.querySelector(".attempts");
const matchedPairsSpan = document.querySelector(".matched-pairs");
const winBanner = document.querySelector("section>div");

const attemptsSpanFinal = document.querySelector(".attempts-final");
const matchedPairsSpanFinal = document.querySelector(".matched-pairs-final");
const timeSpanFinal = document.querySelector(".time-final");
const playAgainButtons = document.querySelectorAll("button");
for (box of boxes) {
    box.style.rotate = Math.floor(Math.random()*30)-15 + 'deg';
}
winBanner.hidden = true;
let emojis = [
        "😁", "😎", "🤓", "🥷", "🧏", "🤫", "🐐", "🍎"
];

emojis = emojis.concat(emojis);
emojis = shuffle(emojis);

let selectedEmoji = null;
let selectedBox = null;
let isTimeoutActive = false;
let matchedEmojis = [];
let minutes = 0;
let seconds = 0;
let attempts = 0;

setInterval(() => {
    timeSpan.innerText = `${minutes < 10 ? 0 : ''}${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
    if (seconds < 59) seconds += 1;
    else { 
        minutes += 1;
        seconds = 0;
    }
}, 1000);

const boxCallback = (event) => {
    if (selectedBox === event.target || isTimeoutActive === true || matchedEmojis.includes(emojis[Number(event.target.getAttribute("index"))-1]))  {
        return;
    }
    box = event.target;
    boxId = Number(box.getAttribute("index"))-1;
    boxSpan = box.querySelector('span');
    boxEmoji = emojis[boxId];
    console.log(isTimeoutActive);
    
    box.classList.add("selected");
    boxSpan.innerText = boxEmoji;

    if (selectedEmoji === null) {
        selectedEmoji = boxId;
        selectedBox = box;
    } else {
        if (boxEmoji !== emojis[selectedEmoji]) {
            isTimeoutActive = true;
            setTimeout(() => {
                boxSpan.innerText = "";
                selectedBox.querySelector('span').innerText = "";
                selectedBox.classList.remove("selected");
                box.classList.remove("selected");
                console.log(selectedBox);
                selectedBox = null;
                isTimeoutActive = false;
	    }, 500)
        }
        else {
            matchedEmojis.push(boxEmoji);
            matchedPairsSpan.innerText = String(matchedEmojis.length)+"/8";
            if (emojis.every((emoji) => matchedEmojis.includes(emoji))) {
                console.log('wwygrales');
                winBanner.hidden = false;
                winBanner.classList.add("winner");
                timeSpanFinal.innerText = `${minutes < 10 ? 0 : ''}${minutes}:${seconds < 10 ? 0 : ''}${seconds}`; 
                attemptsSpanFinal.innerText = String(attempts);
                matchedPairsSpanFinal.innerText = String(matchedEmojis.length)+"/8";
            }
        }
        attempts += 1;
        attemptsSpan.innerText = String(attempts);
        selectedEmoji = null;
    }
}

const refresh = () => {
    location.reload();
}

boxes.forEach((box) => {
    box.addEventListener("click", boxCallback);
});
playAgainButtons.forEach((button) => {
    button.addEventListener("click", refresh);
})
