var userName = prompt("what is your name?").toLowerCase();
var guessCount = 0;
var range = 0;
var averageScore = 0;
var wins = 0;
var totalGames = 0;
var games = [];
var startTime = new Date();
var fastestTime = 0;
var averageTime = 0;

// asks for the user's name and capitalizes the first letter of their name
var randomNum = 0;
userName = userName.charAt(0).toUpperCase() + userName.slice(1);

//displays the date at the top of the page
function displayTime(){
    var date = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = months[date.getMonth()];
    var days = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th", "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th", "31st"];
    var day = days[date.getDate() - 1];
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if (hours < 10){
        hours = "0" + hours;
    }
    if (minutes < 10){
        minutes = "0" + minutes;
    }
    if (seconds < 10){
        seconds = "0" + seconds;
    }
    document.getElementById("date").textContent = month + " " + day + ", " + year + " " + hours + ":" + minutes + ":" + seconds;
    var hours = date.getHours();
}
//calls the display time function every second to update the time
displayTime();
setInterval(displayTime, 1000);

// funcion to reset the game and update the average score and leaderboard
function reset(){
    wins++;
    document.getElementById("wins").textContent = "Total wins: " + wins;
        msgEl.className = "msg-default";
    totalGames++;
    games.push(guessCount);
    // creates array in order of least guesses to most guesses
    games.sort(function(a, b){return a - b});
    // updates the average score and leaderboard
    var leaderboard = document.querySelectorAll("li[name='leaderboard']");
    if (games.length >= 1){
        leaderboard[0].textContent = games[0];
        if (games.length >= 2){
            leaderboard[1].textContent = games[1];
            if (games.length >= 3){
                leaderboard[2].textContent = games[2];
            }
        }
    }
    //calculates average score
    if (totalGames > 1){
        averageScore = (averageScore * (totalGames - 1) + guessCount) / totalGames;
    } else {
        averageScore = guessCount;
    }
    document.getElementById("avgScore").textContent = "Average Score: " + averageScore.toFixed(2);
    //records fastest time and updates it on the page
    var endTime = new Date();
    var timeTaken = (endTime - startTime) / 1000;
    if (fastestTime == 0 || timeTaken < fastestTime){
        fastestTime = timeTaken;
    }
    document.getElementById("fastest").textContent = "Fastest Game: " + fastestTime.toFixed(2) + " seconds";
    //calculates average time and updates it on the page
    if (totalGames > 1){
        averageTime = (averageTime * (totalGames - 1) + timeTaken) / totalGames;
    } else {
        averageTime = timeTaken;
    }
    document.getElementById("avgTime").textContent = "Average Time: " + averageTime.toFixed(2) + " seconds";
    // resets buttons
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    document.getElementById("playBtn").disabled = false;
}

// starts game when they click the play button and sets the range based on the difficulty they choose
function startGame(){
    startTime = new Date();
    var difficulty = document.querySelector("input[type='radio']:checked");
    if(difficulty.id == "e"){
        range = 3;
    } else if(difficulty.id == "m"){
        range = 10;
    } else if(difficulty.id == "h"){
        range = 100;
    }
    document.getElementById("msg").textContent = userName + " guess a number between 1 and " + range;
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;
    document.getElementById("playBtn").disabled = true;
    randomNum = Math.floor(Math.random() * range) + 1;
    guessCount = 0;
}
// function for when they click the guess button
function guessNum(){
    var msgEl = document.getElementById("msg");
    var guessValue = Number(document.getElementById("guess").value);
    if (guessValue < 1 || guessValue > range || Number.isNaN(guessValue)){
        msgEl.textContent = userName + " please enter a valid number between 1 and " + range;
        msgEl.className = "msg-invalid";
        return;
    }
    guessCount++;
    var guess = guessValue;
    //resest game if they guess correct
    if (guess == randomNum){
        msgEl.textContent = userName + " you are correct!";
        msgEl.className = "msg-correct";
        reset();
        return;
    }
    var output = userName + " ";
    // gives feedback on if the guess is too high or low and how close they are
    if (guess < randomNum){
        output += "too low";
    } else if (guess > randomNum){
        output += "too high";
    }
    output += " ";
    var difference = Math.abs(guess - randomNum);
    if (difference <= 2){
        output += "but you're hot!";
        msgEl.className = "msg-hot";
    }
    else if (difference <= 5){
        output += "but you're warm.";
        msgEl.className = "msg-warm";
    }
    else {
        output += "and you're cold.";
        msgEl.className = "msg-cold";
    }
    msgEl.textContent = output;
}

// resests game when they give up
function giveUp(){
    document.getElementById("msg").textContent = userName + " the correct number was " + randomNum;
    guessCount = range;
    reset();
}

// event listeners
document.getElementById("playBtn").addEventListener("click", startGame);
document.getElementById("guessBtn").addEventListener("click", guessNum);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);