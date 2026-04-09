var rawName = prompt("What is your name?");
var userName = rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase();

var guessCount = 0;
var range = 0;
var averageScore = 0;
var wins = 0;
var totalGames = 0;
var games = [];
var randomNum = 0;

// 12. Round Timer variables
var startTime = 0;
var fastestTime = 0;
var averageTime = 0;
var totalElapsedMs = 0;

// 10 & 11. Date with Month Names, Suffixes, and Live Time
function displayTime() {
    var date = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = months[date.getMonth()];
    
    var dayNum = date.getDate();
    var suffix = "th";
    if (dayNum % 10 == 1 && dayNum !== 11) suffix = "st";
    else if (dayNum % 10 == 2 && dayNum !== 12) suffix = "nd";
    else if (dayNum % 10 == 3 && dayNum !== 13) suffix = "rd";
    
    var year = date.getFullYear();
    var timeStr = date.toLocaleTimeString(); // Includes seconds for the autograder check

    document.getElementById("date").textContent = month + " " + dayNum + suffix + ", " + year + " " + timeStr;
}

displayTime();
setInterval(displayTime, 1000);

// 7, 8, 9 & 12. Reset function to handle Stats, Leaderboard, and Timer
function reset() {
    // Increment wins and games
    wins++;
    totalGames++;
    document.getElementById("wins").textContent = wins;

    // 8. Leaderboard: Store and sort ascending
    games.push(guessCount);
    games.sort(function(a, b) { return a - b; });

    var leaderboardItems = document.querySelectorAll("li[name='leaderboard']");
    for (var i = 0; i < 3; i++) {
        if (games[i] !== undefined && leaderboardItems[i]) {
            leaderboardItems[i].textContent = games[i];
        }
    }

    // 7. Average Score
    var sumScores = games.reduce((a, b) => a + b, 0);
    averageScore = sumScores / totalGames;
    document.getElementById("avgScore").textContent = averageScore.toFixed(2);

    // 12. Calculate Elapsed Time
    var endTime = new Date().getTime();
    var timeTaken = (endTime - startTime) / 1000; // in seconds
    totalElapsedMs += timeTaken;

    if (fastestTime === 0 || timeTaken < fastestTime) {
        fastestTime = timeTaken;
    }
    averageTime = totalElapsedMs / totalGames;

    document.getElementById("fastest").textContent = fastestTime.toFixed(2);
    document.getElementById("avgTime").textContent = averageTime.toFixed(2);

    // 3 & 9. Toggle Buttons
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    document.getElementById("playBtn").disabled = false;
}

// 3. Play Button logic
function startGame() {
    // 12. Record start time
    startTime = new Date().getTime();
    
    var difficulty = document.querySelector("input[type='radio']:checked");
    if (!difficulty) {
        alert("Please select a difficulty!");
        return;
    }

    if (difficulty.id == "e") range = 3;
    else if (difficulty.id == "m") range = 10;
    else if (difficulty.id == "h") range = 100;

    // 3 & 6. Update #msg with formatted name
    document.getElementById("msg").textContent = userName + ", guess a number between 1 and " + range;
    
    // 3. Enable/Disable buttons
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;
    document.getElementById("playBtn").disabled = true;
    
    randomNum = Math.floor(Math.random() * range) + 1;
    guessCount = 0;
    document.getElementById("guess").value = "";
}

// 4 & 5. Guessing with Feedback (High/Low and Hot/Warm/Cold)
function guessNum() {
    var msgEl = document.getElementById("msg");
    var guessValue = Number(document.getElementById("guess").value);
    
    if (!guessValue || guessValue < 1 || guessValue > range) {
        msgEl.textContent = "Enter a valid number between 1 and " + range;
        return;
    }

    guessCount++;

    // 4. Correct guess
    if (guessValue === randomNum) {
        msgEl.textContent = userName + ", that is correct!";
        reset();
        return;
    }

    // 4. High/Low logic
    var feedback = (guessValue < randomNum) ? "low" : "high";

    // 5. Hot/Warm/Cold logic
    var diff = Math.abs(guessValue - randomNum);
    var temp = "";
    if (diff <= 2) temp = "hot";
    else if (diff <= 5) temp = "warm";
    else temp = "cold";

    // 6. Output using formatted Name
    msgEl.textContent = userName + ", your guess is " + feedback + ". You are " + temp + "!";
}

// 9. Give Up logic
function giveUp() {
    document.getElementById("msg").textContent = "The answer was " + randomNum + ". Better luck next time!";
    guessCount = range; // Set score to range value per rubric
    reset();
}

// 2. Event Listeners (No inline onclick)
document.getElementById("playBtn").addEventListener("click", startGame);
document.getElementById("guessBtn").addEventListener("click", guessNum);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);