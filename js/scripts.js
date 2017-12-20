// // // Back end // // //
// Global Variables
var userName;
var deckOfCards = [];
var playCards = [];
var previousGameScores = [];
var amountOfTopScores = 10;
var topScores = [];
var round = 1;
var lives = 0;
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
  ticker();
}

// Ticker Output
function ticker() {
  $('.ticker').empty();
  var i = 1;
  $('.ticker').append('<span class="ticker-item">Top Scores: </span>');
  topScores.map(function(topScore) {
    $('.ticker').append('<span class="ticker-item">#' + i + ': "' + topScore.name + '" '+ topScore.score + '</span>');
    i++;
  });
}

// Game Play Functions-------------INCOMPLETE
//Toggle Level Visibility
function toggleLevel(_round) {
  if (_round === 1) {
    $('#level-' + _round).css('display', 'block');
    $('#new-game').css('display', 'none');
  } else if ((_round > 1) && (_round <= 5)) {
    $('#level-' + _round).css('display', 'block');
    $('#level-' + (_round - 1)).css('display', 'none');
  }
}

// Start Game Function
function newRound() {
  playCards = [];
  if (round > 5) {
    gameEnd("win");
  } else if (round <= 5) {
    cardOutput(round);
    toggleLevel(round);
    lives = round;
    numOfMatchedCards = 0;
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

// Card Click Listener
function cardClick() {
  $('.memory-card').off('click').on('click', function() {
    cardFlip($(this).find('div').attr('class'));
  });
}

// Card Output
function cardOutput(_round) {
  var i = 1;
  findPlayCards(_round).map(function(card) {
    $('#level-' + _round + ' .memory-card.card-' + i).append('<div class="' + card.name + '"<div>' + card.svg + '</div></div>');
    i++;
  });
  cardClick();
}

// Turn Play Functions ---------- INCOMPLETE
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
      lives -= 1;
      // Output new number of 1ups to screen, maybe error message?
      // TOGGLE ERROR ANIMATION
      // FLIP CARDS BACK
    }
    flippedCard = "";
  };
  turnEnd();
}

function turnEnd() {
  if (lives === 0) {
    console.log("game over")
    gameEnd("lose");
  } else if (lives > 0) {
    if (numOfMatchedCards >= playCards.length) {
      newRound();
      console.log("new round")
    } else if (numOfMatchedCards < playCards.length) {
      console.log("take another turn")
    }
  }
}

// End Game Function
function gameEnd(winOrLose) {
  if (winOrLose === "win") {
    previousGameScores.push(new ScoreStore(userName, gameScore));
    topScore(previousGameScores);
  };
  winnerLoserScreen(winOrLose);
}

// Winner/Loser screen
function winnerLoserScreen(didWinOrLose) {
  $('.game-board').css('display', 'none');
  if (didWinOrLose === "win") {
    alert('"Winner winner, chicken dinner!" - Guy Fieri');
    $('#winner-screen').css('display', 'flex');
  } else if (didWinOrLose === "lose") {
    alert('you idiot! You can\'t remember shit!');
    $('#loser-screen').css('display', 'flex');
  }
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
    gameEnd(userName, gameScore);
    // output top scores --------------INCOMPLETE
  });

// Quit Game
})
