/* Array of highlighted button colors */
var highlightColor = ["#00ff00", "#ff0000", "#ffff00", "#0066ff"]
/* Array of un-pressed button colors */
var regularColor = ["#00cc00", "#cc0000", "#cccc00", "#0000b3"];
/* Array of button IDs */
var locationID = ["#TL", "#TR", "#BL", "#BR"];
/* Array of audio clips */
var audioArr = [new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'), new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'), new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'), new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')]
/* Initializatin of arrays and variables essential to the operation of this game */
var ID = 4;
var switchButton = 1;
var patternArr = [];
var playerArr = [];
var time = 500;
var computer = true;
var counter = 0;
var cycle = 1;
var difficulty = 1;

/* This function adds a random play to the game and then calls computerPlay() */
function main () {
  patternArr.push(Math.floor((Math.random() * 4)))
  computerPlay();
}

/* This function serves as a timer to play through the computer turns at a reasonable pace */
function computerPlay() {
  setTimeout( function () {colorHighlight(patternArr[counter])}, time);
  $("#plays").html(patternArr.length);
}

/* This function changes the color back to original after it has been highlighted, then calls stepper() to continue the game */
function colorChangeBack(place){
  $(locationID[place]).css("background", regularColor[place]);
  stepper();
}

/* This function highlights the button and plays the appropriate sound.. it also triggers a timer to change the color back to original */
function colorHighlight(place){
  $(locationID[place]).css("background", highlightColor[place]);
  audioArr[place].play();
  setTimeout(function () {colorChangeBack(place)}, 300);
}

/* This function steps through the random array of computer plays that has been generated... it also cycles back to the computer if the player has completed the turn correctly... or finishes the game if 20 plays has been completed successfully */
function stepper() {
  if (computer === true){
    counter++;
    if (counter >= patternArr.length){
      counter = 0;
      cycleButtons();
    } else if (counter < patternArr.length) {
      computerPlay();
    }
  } else if (computer === false){
    if(playerArr.length === patternArr.length) {
      playerArr = [];
      cycleButtons();
      if (patternArr.length === 20) {
        alert ("You won!!! Congratulations, go buy a cookie.")
        patternArr = [];
        counter = 0;
        main();
      } else if (patternArr.length < 20) {
        main();
      }
    }
  }
}

/* Checks to verify the player pattern is matching the randomized computer pattern... if it doesn't match it operates via strict mode or not, giving the player an alert... upon successful completion of each step it operates the sound clip and color change of the button */
function playerCheck() {
  playerArr.push(ID)
  if(playerArr[playerArr.length-1] === patternArr[playerArr.length-1]) {
    if (playerArr.length <= patternArr.length) {
      colorHighlight(ID);
    }
  } else if (playerArr[playerArr.length-1] !== patternArr[playerArr.length-1]) {
    if (difficulty === 1 ) {
      alert("Aww drats! Try the pattern again, amigo.")
      playerArr=[];
      cycleButtons();
      computerPlay();
    } else if (difficulty === 2) {
      alert("You're in strict mode... start over dude.")
      patternArr = [];
      playerArr = [];
      counter = 0;
      cycleButtons();
      main();
    }
  }
}

/* Toggles click functionality of the game buttons based on whether the computer or player is "playing"... called from various functions throughout */
function cycleButtons() {
  if (computer === true) {
  $("#TL").css("pointer-events", "auto")

  $("#TR").css("pointer-events", "auto")

  $("#BL").css("pointer-events", "auto")

  $("#BR").css("pointer-events", "auto")
    computer = false;
  } else if (computer === false) {
  $("#TL").css("pointer-events", "none")

  $("#TR").css("pointer-events", "none")

  $("#BL").css("pointer-events", "none")

  $("#BR").css("pointer-events", "none")
    computer = true;
  }
}

/* Toggles power/on/off via player input from power/on/off button */
$("#onOffSwitch").on("click", function() {
  if (switchButton === 1) {
    $("#onOffLight").css("background", "red")
    $("#plays").css("color", "red")
    switchButton = 2;
    /*Start game */
    main();
    
    
  } else if (switchButton === 2) {
    $("#onOffLight").css("background", "black")
    $("#plays").css("color", "black")
    /* End game and set everything back to default to prepare for a new game*/
    playerArr = [];
    patternArr = [];
    counter = 0;
    $("#plays").html(patternArr.length);
    if(computer === false) {
      cycleButtons();
    }    
    switchButton = 1;
    $("#strictLight").css("background-color", "black")
    difficulty = 1;
    
  }
});

/* Toggles strict mode based on player input */
$("#strictButton").on("click", function() {
  if (difficulty === 1) {
    $("#strictLight").css("background", "red")
    difficulty = 2;
  } else if (difficulty === 2) {
    $("#strictLight").css("background-color", "black")
    difficulty = 1;
  }
}); 


/* When player clicks a button, this calls playerCheck() with the proper button ID set */
$("#TL").on("click", function() {
  ID = 0;
  playerCheck();
});

$("#TR").on("click", function() {
  ID = 1;
  playerCheck();
});

$("#BL").on("click", function() {
  ID = 2;
  playerCheck();
});

$("#BR").on("click", function() {
  ID = 3;
  playerCheck();
});


/* Test */