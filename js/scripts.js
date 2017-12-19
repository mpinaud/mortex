// // // Back end // // //
// Global Variables
var userName;
var deckOfCards = [];
var playCards = [];
var previousGameScores = [];
var amountOfTopScores = 10;
var topScores = [];
var round = 1;
var gameScore = 0;
var flippedCard = "";
var numOfMatchedCards = 0;

// Stored Scores Constructor
function ScoreStore(name, score) {
  this.name = name;
  this.score = score;
}

// Card Constructor
function Card(name, color, background, svg) {
  this.name = name;
  this.color = color;
  this.background = background;
  this.svg = svg;
}

// Cards
deckOfCards.push(new Card('bacteria', 'red', 'white', '<img src="img/svg/bacteria.svg" alt="Memory card image">'));
deckOfCards.push(new Card('beaks', 'red', 'white', '<img src="img/svg/beaks.svg" alt="Memory card image">'));
deckOfCards.push(new Card('blink', 'red', 'white', '<img src="img/svg/blink.svg" alt="Memory card image">'));
deckOfCards.push(new Card('bug', 'red', 'white', '<img src="img/svg/bug.svg" alt="Memory card image">'));
deckOfCards.push(new Card('diamond', 'red', 'white', '<img src="img/svg/diamond-catcher.svg" alt="Memory card image">'));
deckOfCards.push(new Card('eye', 'red', 'white', '<img src="img/svg/eye-diamond.svg" alt="Memory card image">'));
deckOfCards.push(new Card('flower', 'red', 'white', '<img src="img/svg/flower.svg" alt="Memory card image">'));
deckOfCards.push(new Card('foureyes', 'red', 'white', '<img src="img/svg/four-eyes.svg" alt="Memory card image">'));
deckOfCards.push(new Card('qbert', 'red', 'white', '<img src="img/svg/q-bert.svg" alt="Memory card image">'));
deckOfCards.push(new Card('rain', 'red', 'white', '<img src="img/svg/rain.svg" alt="Memory card image">'));
deckOfCards.push(new Card('space', 'red', 'white', '<img src="img/svg/space-station.svg" alt="Memory card image">'));
deckOfCards.push(new Card('square', 'red', 'white', '<img src="img/svg/square-vortex.svg" alt="Memory card image">'));
deckOfCards.push(new Card('sunray', 'red', 'white', '<img src="img/svg/sunray.svg" alt="Memory card image">'));
deckOfCards.push(new Card('tongue', 'red', 'white', '<img src="img/svg/tongue.svg" alt="Memory card image">'));
deckOfCards.push(new Card('triangle', 'red', 'white', '<img src="img/svg/triangle-.svg" alt="Memory card image">'));
deckOfCards.push(new Card('wave', 'red', 'white', '<img src="img/svg/wave.svg" alt="Memory card image">'));

// Default Previous Scores
previousGameScores.push(new ScoreStore('Jerry', 1000));
previousGameScores.push(new ScoreStore('Terry', 900));
previousGameScores.push(new ScoreStore('Larry', 800));
previousGameScores.push(new ScoreStore('Perry', 700));
previousGameScores.push(new ScoreStore('Barry', 600));
previousGameScores.push(new ScoreStore('Harry', 500));
previousGameScores.push(new ScoreStore('Shari', 400));
previousGameScores.push(new ScoreStore('Mary', 300));
previousGameScores.push(new ScoreStore('Gary', 200));
previousGameScores.push(new ScoreStore('Carrie', 100));

// // // Game functions // // //

// Scoring Functions -----------------INCOMPLETE
// Sort Scores Array (from high to low)
function sortScores(scoreArray) {
  scoreArray.sort(function(a, b) {
    return b.score - a.score;
  });
}

// Top Scores
function topScore(scoreArray) {
  topScores = [];
  sortScores(previousGameScores);
  for (i = 0; i < amountOfTopScores; i++) {
    topScores.push(previousGameScores[i]);
  };
  //------------Output to top ten-------------INCOMPLETE
}


// Game Play Functions-------------INCOMPLETE
// Start Game Function
function newRound() {
  playCards = [];
  if (round > 5) {
    endGame(userName, gameScore);
  } else if (round <= 5) {
    cardOutput(round);
    round++;
  }
}

// Shuffle Cards
function shuffleDeck(deck) {
  for (var i = deck.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}

// Find Cards To Play
function findPlayCards(_round) {
  shuffleDeck(deckOfCards);
  for (i = 0; i < (Math.pow(2, (_round - 1))); i++) {
    playCards.push(deckOfCards[i], deckOfCards[i]);
  }
  shuffleDeck(playCards);
  return playCards;
}

// Card Output
function cardOutput(_round) {
  var i = 1;
  findPlayCards(_round).map(function(card) {
    $('#level-' + _round + ' .memory-card.card-' + i).append('<i>' + card.svg + '</i>').addClass(card.name);
    i++;
  });
}

// Turn Play Function ---------- INCOMPLETE
function cardFlip(cardName) {
  if (!flippedCard) {
    // TOGGLE CARD FLIP ANIMATION
    flippedCard = cardName;
  } else if (flippedCard) {
    if (cardName === flippedCard) {
      // TOGGLE CARD VISIBILITY BY CLASS
      gameScore += 7;
      numOfMatchedCards += 2;
    } else if (cardName !== flippedCard) {
      // TOGGLE ERROR ANIMATION
      // FLIP CARDS BACK
    }
    flippedCard = "";
  };

  if (numOfMatchedCards < playCards) {
    flippedCard = "";
  } else if (numOfMatchedCards >= playCards) {
    newRound();
  }
}

// End Game Function
function endGame(name, score) {
  previousGameScores.push(new ScoreStore(name, score));
  topScore(previousGameScores);
}

// // // Front end logic // // //
$(function() {
// Local Storage for score
  if (localStorage.previousScores) {
  previousGameScores = JSON.parse(localStorage.previousScores);
}
// New Game
  $('#new-game-start').submit(function(event) {
    event.preventDefault();
    userName = $('#player-name').val();
    gameScore = 0;
    newRound();
  });
// Play Another Game
  $('#play-again').click(function() {
    endGame(userName, gameScore);
    // output top scores --------------INCOMPLETE
  });

// Quit Game

})
