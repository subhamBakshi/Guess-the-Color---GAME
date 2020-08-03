let score = 0;
let colors = generateRandomColors(6);
let squares = document.querySelectorAll(".square");
let pickedColor = colors[6]; //choosing our answer color
let colorDisplay = document.getElementById("colorDisplay"); //choosing the span
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let startBtn = true;
let scoreDisplay = document.querySelector("#scoreDisplay")

sessionStorage.setItem("scoreDisplay", 00)

//Pop-up Window(to start the game)
function PopUp() {
    document.getElementById('popupWindow').style.display = "none";
    document.getElementById("clickEffect").play()
}

function playAudio() {
    document.getElementById("rightGuess").play()
}

function newColors() {
    colors = generateRandomColors(6);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i]
    }
    h1.style.background = "orange";
}
newColors();

//Setting the clicking event on the squares to generate a response(i.e, correct or incorrect/try again!)
colorDisplay.textContent = pickedColor;
for (let i = 0; i < squares.length; i++) { //...(1)[add initial colors to squares]
    squares[i].style.backgroundColor = colors[i] //add initial colors to square

    squares[i].addEventListener("click", function () { //setting the click event
        let clickedColor = this.style.backgroundColor; //grab color of clicked square

        if (clickedColor === pickedColor) { //compare color to pickedColor
            messageDisplay.textContent = "Correct!";
            score += 20;
            scoreDisplay.textContent = score;
            newColors();
            if (score >= 100) {
                window.location.href = "Fillers/Win2.html"
            }
        } else {
            this.style.backgroundColor = "whitesmoke";
            messageDisplay.textContent = "Try Again!";
            score -= 5;
            scoreDisplay.textContent = score;
        }
        sessionStorage.setItem("scoreDisplay", score)
    });
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    let arr = []
    for (let i = 0; i < num; i++) {
        arr.push(randomColor()) //get random color and push into array
    }
    return arr;
}

function randomColor() {
    let r = Math.floor(Math.random() * 256); //pick a "red" from 0-255
    let g = Math.floor(Math.random() * 256); //pick a "green" from 0-255
    let b = Math.floor(Math.random() * 256); //pick a "blue" from 0-255
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

//Setting the timer function
document.addEventListener('DOMContentLoaded', () => {
    const timeLeftDisplay = document.querySelector("#timer")
    const startBtn = document.querySelector("#timerBtn")
    let timeLeft = 49

    function countdown() {
        setInterval(function () {
            if (timeLeft <= 0) {
                clearInterval(timeLeft = 0)
                window.location.href = "Fillers/LostMedium.html";
            }
            timeLeftDisplay.innerHTML = timeLeft
            timeLeft -= 1;
            sessionStorage.setItem("timer", 50 - timeLeft)
        }, 1000)
    }
    startBtn.addEventListener('click', countdown)
})


//Hint display POP-UP
var modal = document.getElementById("myModal");
document.getElementById("hint").onclick = function () {
    modal.style.display = "block";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
