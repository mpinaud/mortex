// // // Back end // // //
// Global Variables
var deckOfCards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var userName;
var round = 0;
var userScore = 0;
var previousGameScores = [];
var topTenScores = [];

// Previous Scores constructor
function ScoreStore(name, score) {
  this.name = name;
  this.score = score;
}

// Card constructor ------------INCOMPLETE
function Card(glyph, glyphColor, bgColor) {
  this.glyph = glyph;
  this.glyphColor = glyphColor;
  this.bgColor = bgColor;
}

// // // New Cards ------------INCOMPLETE
// cardArray.push(new Card([glyph], [glyphColor], [bgColor]));

// Placeholder Previous Scores
previousGameScores.push(new ScoreStore('Harry', 500));
previousGameScores.push(new ScoreStore('Perry', 700));
previousGameScores.push(new ScoreStore('Larry', 800));
previousGameScores.push(new ScoreStore('Terry', 900));
previousGameScores.push(new ScoreStore('Mary', 300));
previousGameScores.push(new ScoreStore('Barry', 600));
previousGameScores.push(new ScoreStore('Shari', 400));
previousGameScores.push(new ScoreStore('Jerry', 1000));
previousGameScores.push(new ScoreStore('Gary', 200));
previousGameScores.push(new ScoreStore('Carrie', 100));

// // // Front end functions // // //

// Sort Game Scores Array
function sortScores(scoreArray) {
  scoreArray.sort(function(a, b) {
    return b.score - a.score;
  });
}

// Top Ten
function topTen(array, name, score) {
  topTenScores = [];
  array.push(new ScoreStore(name, score));
  sortScores(array);
  for (i = 0; i < 10; i++) {
    topTenScores.push(array[i]);
  }
}

// Shuffle Deck of Cards
function shuffleDeck(deck) {
  for (var i = deck.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}

// Card Output -----------INCOMPLETE
function cardOutput(gameRound) {
  var numOfCards = Math.pow(2, gameRound);

}

// Game Start
function gameStart() {
  round = 1;

  // Clear/remove game start form -------- INCOMPLETE

}

// // // Front end logic // // //
$(function() {
// Game variables
// New Game
  $('#new-game-start').submit(function(event) {
    event.preventDefault();
    userName = $('#player-name').val();
    gameStart();
  });
  //
  // $('#play-again').click(function() {
  //   previousGameScores.
  // });
})
