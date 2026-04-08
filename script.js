// add javascript here
let wins = 0;
let name = prompt("Gimme your name and personal information: ")
let casedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(); 
var difficulty = null
var range = null;
var number = null;
function startGame() {
    var difficulty = document.querySelector("input[type='radio']:checked").value
    range = parseInt(difficulty);
    number = Math.floor(Math.random() * range) + 1;
    document.getElementById("msg").textContent = "Hi, " + casedName + "! Guess the number between 1 and " + range;
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("playBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = false;
    document.getElementById("e").disabled = true;
    document.getElementById("m").disabled = true;
    document.getElementById("h").disabled = true;

   
}

document.getElementById("playBtn").addEventListener("click", startGame);

 function checkGuess() {
    var difficulty = document.querySelector("input[type='radio']:checked").value
    var range = parseInt(difficulty);
    var guess = document.getElementById("guess").value
    if (guess == "" || isNaN(guess) || guess < 1 || guess > range) {
        document.getElementById("msg").textContent = "Do not be a bum and guess the number within the correct range.."
    }
    else if (guess < number) {
        document.getElementById("msg").textContent = "Too low!"
        if (Math.abs(guess - number) <= 2) {
            document.getElementById("msg").textContent += " but you are hot"
        }
        else if (Math.abs(guess - number) <= 5) {
            document.getElementById("msg").textContent += " but you are warm"
        }
        else if (Math.abs(guess - number) > 5) {
            document.getElementById("msg").textContent += ", you are cold"
        }
    }
    else if (guess > number) {
        document.getElementById("msg").textContent = "Too high!"
        if (Math.abs(guess - number) <= 2) {
            document.getElementById("msg").textContent += " but you are hot"
        }
        else if (Math.abs(guess - number) <= 5) {
            document.getElementById("msg").textContent += " but you are warm"
        }
        else if (Math.abs(guess - number) > 5) {
            document.getElementById("msg").textContent += ", you are cold"
        }
    }
    else if (guess == number) {
        document.getElementById("msg").textContent = "You got it!"
        wins++;
        document.getElementById("wins").textContent = "Total wins: " + wins;
        document.getElementById("playBtn").disabled = false;
        document.getElementById("guessBtn").disabled = true;
        document.getElementById("giveUpBtn").disabled = true;
        document.getElementById("e").disabled = false;
        document.getElementById("m").disabled = false;
        document.getElementById("h").disabled = false;
    }
    
    
    }  
    function cooked() {
        document.getElementById("msg").textContent = "The number was " + number;
        document.getElementById("playBtn").disabled = false;
        document.getElementById("guessBtn").disabled = true;
        document.getElementById("giveUpBtn").disabled = true;
        document.getElementById("e").disabled = false;
        document.getElementById("m").disabled = false;
        document.getElementById("h").disabled = false;
    }


document.getElementById("guessBtn").addEventListener("click", checkGuess);
document.getElementById("giveUpBtn").addEventListener("click", cooked);
