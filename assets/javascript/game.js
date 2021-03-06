
//VARIABLES
var words = ["raees", "dabangg", "dangal", "race", "rockstar", "ittefaq", "toilet"]

//Empty variables to store values later
var randomWord = "";
var lettersOfWord = []
var blanks = 0;
var blanksAndCorrect = [];
var wrongGuess = [];

//Counter Variables
var wins = 0;
var losses = 0;
var guessesRemaining = 8;



// ALL FUNCTIONS
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


//__________________________________________________________
//GAME START FUNCTION
//__________________________________________________________
function Game() {
    //computer generates random word from words array
    randomWord = words[Math.floor(Math.random() * words.length)];

    // split the individual word into separate arrays, and store in new array 
    lettersOfWord = randomWord.split("");

    //store length of word in blanks, for later use
    blanks = lettersOfWord.length;

    //creating a loop to generate "_" for each letter in array stored in blanks
    for (var i = 0; i < blanks; i++) {
        blanksAndCorrect.push("_");
    }

    //showing the "_" within HTML
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join("  ");

    //console logging 
    console.log(randomWord);
    console.log(lettersOfWord)
    console.log(blanks)
    console.log(blanksAndCorrect)
}


//__________________________________________________________
//AUDIO FUNCTION
//__________________________________________________________

//variables for audio function
var raees = document.getElementById("raees");
var dabangg = document.getElementById("dabangg");
var dangal = document.getElementById("dangal");
var race = document.getElementById("race");
var rockstar = document.getElementById("rockstar");
var ittefaq = document.getElementById("ittefaq");
var toilet = document.getElementById("toilet");


function aud() {
    //Arthur Audio & Image
    //---------------------------
    if (randomWord === words[0]) {
        toilet.pause();
        ittefaq.pause();
        rockstar.pause();
        race.pause();
        dangal.pause();
        dabangg.pause();
        raees.play();
        document.getElementById("image").src = "./assets/images/raees.jpg";
    }
    //Rugrats Audio & Image
    //---------------------------
    else if (randomWord === words[1]) {
        toilet.pause();
        ittefaq.pause();
        rockstar.pause();
        race.pause();
        dangal.pause();
        dabangg.play();
        raees.pause();
        document.getElementById("image").src = "./assets/images/dabangg.jpg";
    }
    //Simpsons Audio & Image
    //---------------------------
    else if (randomWord === words[2]) {
        toilet.pause();
        ittefaq.pause();
        rockstar.pause();
        race.pause();
        dangal.play();
        dabangg.pause();
        raees.pause();
        document.getElementById("image").src = "./assets/images/dangal.jpg";
    }
    //Scooby-doo Audio & Image
    //---------------------------
    else if (randomWord === words[3]) {
        toilet.pause();
        ittefaq.pause();
        rockstar.pause();
        race.play();
        dangal.pause();
        dabangg.pause();
        raees.pause();
        document.getElementById("image").src = "./assets/images/race.jpg";
    }
    //Spongebob Audio & Image
    //---------------------------
    else if (randomWord === words[4]) {
        toilet.pause();
        ittefaq.pause();
        rockstar.play();
        race.pause();
        dangal.pause();
        dabangg.pause();
        raees.pause();
        document.getElementById("image").src = "./assets/images/rockstar.jpg";
    }
    //Danny Audio & Image
    //---------------------------
    else if (randomWord === words[5]) {
        toilet.pause();
        ittefaq.play();
        rockstar.pause();
        race.pause();
        dangal.pause();
        dabangg.pause();
        raees.pause();
        document.getElementById("image").src = "./assets/images/ittefaq.jpg";
    }
    //Teen Titans Audio & Image
    //---------------------------
    else if (randomWord === words[6]) {
        toilet.play();
        ittefaq.pause();
        rockstar.pause();
        race.pause();
        dangal.pause();
        dabangg.pause();
        raees.pause();
        document.getElementById("image").src = "./assets/images/toilet.jpg";
    }
};

//__________________________________________________________
//RESET FUNCTION
//__________________________________________________________
function reset() {
    guessesRemaining = 9;
    wrongGuess = [];
    blanksAndCorrect = [];
    Game()
}

//__________________________________________________________
//CHECK LETTERS/COMPARE FUNCTION
//__________________________________________________________

//If/Else, to see if letter selected matches random word
function checkLetters(letter) {
    var letterInWord = false;
    //if the generated randomword is equal to the letter entered... then variable is true
    for (var i = 0; i < blanks; i++) {
        if (randomWord[i] == letter) {
            letterInWord = true;
        }
    }
    //if letterInWord (false)
    if (letterInWord) {
        //check each letter to see if it matches word
        for (var i = 0; i < blanks; i++) {
            if (randomWord[i] == letter) {
                blanksAndCorrect[i] = letter;
            }
        }
    }
    //otherwise, push the incorrect guess in the wrong guesses section, and reduce remaining guesses
    else {
        wrongGuess.push(letter);
        guessesRemaining--;
    }
    console.log(blanksAndCorrect);
}

//__________________________________________________________
//FINAL COMPLETE FUNCTION
//__________________________________________________________

//check to see if player won...
function complete() {
    console.log("wins:" + wins + "| losses:" + losses + "| guesses left:" + guessesRemaining)

    //if WON...then alert, play audio, display image and reset new round
    if (lettersOfWord.toString() == blanksAndCorrect.toString()) {
        wins++;
        aud()
        reset()
        //display wins on screen
        document.getElementById("winstracker").innerHTML = " " + wins;

        //if LOST...then alert and reset new round
    } else if (guessesRemaining === 0) {
        losses++;
        reset()
        document.getElementById("image").src = "./assets/images/try-again.png"
        document.getElementById("losstracker").innerHTML = " " + losses;
    }
    //display losses on screen && guesses remaining countdown
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join(" ");
    document.getElementById("guessesremaining").innerHTML = " " + guessesRemaining;
}


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//_____________________________________________________
// EXECUTE CODE 
//_____________________________________________________

//call start game function
Game()

//check for keyup, and convert to lowercase then store in guesses
document.onkeyup = function (event) {
    var guesses = String.fromCharCode(event.keyCode).toLowerCase();
    //check to see if guess entered matches value of random word
    checkLetters(guesses);
    //process wins/loss 
    complete();
    //store player guess in console for reference 
    console.log(guesses);

    //display/store incorrect letters on screen
    document.getElementById("playerguesses").innerHTML = "  " + wrongGuess.join(" ");
}

