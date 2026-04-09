// add javascript here
// add javascript here

let now = new Date();

let guesses = 0;

let wins = 0;

let leaderboard = [];

let goofy_name = prompt("Gimme your name and personal information: ");

let casedName = goofy_name.charAt(0).toUpperCase() + goofy_name.slice(1).toLowerCase();



var difficulty = null;

var range = null;

var number = null;

var average_score = 0;



function startGame() {

   

    difficulty = document.querySelector("input[type='radio']:checked").value;

    range = parseInt(difficulty);

    number = Math.floor(Math.random() * range) + 1;

    guesses = 0; // Reset guesses for the new round



    document.getElementById("msg").textContent = "Hi, " + casedName + "! Guess the number between 1 and " + range;

    document.getElementById("guessBtn").disabled = false;

    document.getElementById("playBtn").disabled = true;

    document.getElementById("giveUpBtn").disabled = false;

    document.getElementById("e").disabled = true;

    document.getElementById("m").disabled = true;

    document.getElementById("h").disabled = true;

}



function checkGuess() {

    var guess = document.getElementById("guess").value;

   

    if (guess == "" || isNaN(guess) || guess < 1 || guess > range) {

        document.getElementById("msg").textContent = "Do not be a bum and guess the number within the correct range..";

        return;

    }



    guesses++; // Increment guesses on every valid attempt



    if (guess < number) {

        let feedback = "Too low!";

        let diff = Math.abs(guess - number);

        if (diff <= 2) feedback += " but you are hot";

        else if (diff <= 5) feedback += " but you are warm";

        else feedback += ", you are cold";

        document.getElementById("msg").textContent = feedback;

    }

    else if (guess > number) {

        let feedback = "Too high!";

        let diff = Math.abs(guess - number);

        if (diff <= 2) feedback += " but you are hot";

        else if (diff <= 5) feedback += " but you are warm";

        else feedback += ", you are cold";

        document.getElementById("msg").textContent = feedback;

    }

    else {

       

        wins++;

        average_score = (guesses / wins).toFixed(2); // guesses are tracked per total win

       

        document.getElementById("msg").textContent = "You got it!";

        document.getElementById("wins").textContent = "Total wins: " + wins;

        document.getElementById("avgScore").textContent = "Average score: " + average_score;

       

        // Add to leaderboard array

        leaderboard.push(casedName + ": " + guesses + " guesses");

        updateLeaderboardUI();

        resetUI();

    }

}



function cooked() {

    document.getElementById("msg").textContent = "The number was " + number;

    guesses = range;

   

}



function resetUI() {

    document.getElementById("playBtn").disabled = false;

    document.getElementById("guessBtn").disabled = true;

    document.getElementById("giveUpBtn").disabled = true;

    document.getElementById("e").disabled = false;

    document.getElementById("m").disabled = false;

    document.getElementById("h").disabled = false;

}



// Logic to actually update the <li> elements

function updateLeaderboardUI() {

    sorted = leaderboard.sort(function(a, b){return a- b}); //sort by score

    var leaderboardItems = document.querySelectorAll("li[name='leaderboard']");

    // Only show the last 3 entries or top scores

    for (let i = 0; i < sorted.length; i++) {

        if (sorted[i]) {

            leaderboardItems[i].textContent = sorted[i];

        }

    }

}



document.getElementById("playBtn").addEventListener("click", startGame);

document.getElementById("guessBtn").addEventListener("click", checkGuess);

document.getElementById("giveUpBtn").addEventListener("click", cooked);