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
var hints = 5;

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

// Game Play Functions

// Start Game Function
function newRound() {
  playCards = [];
  if (round > 5) {
    gameEnd("win");
  } else if (round <= 5) {
    cardOutput(round);
    toggleLevel(round);
    lives = round;
    livesOutput();
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

// Turn Play Function ---------- INCOMPLETE
function cardFlip(cardMain, figure, flippingCard) {
  console.log(cardMain);
  console.log(figure);
  if (!flippedCard) {
    $(flippingCard).off('click').css('transform', 'rotatey(180deg)');
    flippedCard = figure;
  } else if (flippedCard) {
    if (figure === flippedCard) {
      cardClick('off');
      $(flippingCard).css('transform', 'rotatey(180deg)');
      setTimeout(function() {
        hideCards(figure);
        gameScore += 7;
        numOfMatchedCards += 2;
        scoreOutput();
        turnEnd();
        // cardClick('on');
      }, 300);
      flippedCard = "";
    } else if (figure !== flippedCard) {
      lives -= 1;
      cardClick('off');
      $(flippingCard).css('transform', 'rotatey(180deg)');
      setTimeout(function () {
        $('.card').css('animation', 'wiggle 0.3s');
        setTimeout(function () {
          $('.card').css('animation', 'none');
          $('.card').css('transform', 'rotatey(0deg)');
          setTimeout(function() {
            turnEnd();
          }, 300);
        }, 1000);
        livesOutput();
      }, 1000);
    }
    flippedCard = "";
    livesOutput();
  };
}

// End Of Turn Function
function turnEnd() {
  if (lives === 0) {
    gameEnd("lose");
  } else if (lives > 0) {
    if (numOfMatchedCards >= playCards.length) {
      newRound();
    } else if (numOfMatchedCards < playCards.length) {
      cardClick('on');
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

// // // Front End Functions // // //
//Toggle Level Visibility
function toggleLevel(_round) {
  if (_round === 1) {
    $('#level-' + _round).css('display', 'flex').addClass('animation-' + _round);
    $('#new-game').css('display', 'none');
  } else if ((_round > 1) && (_round <= 5)) {
    $('#level-' + _round).css('display', 'flex').addClass('animation-' + _round);
    $('#level-' + (_round - 1)).css('display', 'none').removeClass('animation-' + (_round - 1));
  }
}

// Ticker Output
function ticker() {
  var i = 1;
  $('.ticker').empty();
  $('.ticker').append('<span class="ticker-item">Top Scores: </span>');
  topScores.map(function(topScore) {
    $('.ticker').append('<span class="ticker-item"> - - - - ' + i + ': ' + topScore.name + ' - '+ topScore.score + '</span>');
    i++;
  });
}

// Card Click Listener
function cardClick(toggle) {
  if (toggle === 'on') {
    console.log("click on");
    $('.card').off('click').on('click', function() {
      cardFlip($(this).attr('class'), $(this).find('figure').attr('class'), this);
    });
  } else if (toggle === 'off') {
    console.log("click off");
    $('.card').off('click');
  }
}

// Card Output' + card.svg + '
function cardOutput(_round) {
  var i = 1;
  findPlayCards(_round).map(function(card) {
    $('#level-' + _round + ' .memory-card.card-' + i).append('<div class="card">' +
                                                                '<div>' + card.name + '</div>' +
                                                                '<figure class="' + card.name + '">' + card.svg + '</figure>'+
                                                              '</div>');
    i++;
  });

  setTimeout(function() {
    $('div.card').css('transform', 'rotateY(180deg)');
    setTimeout(function() {
      $('div.card').css('transform', 'rotateY(0deg)');
      setTimeout(function() {
        cardClick('on');
      }, 300);
    }, 3000);
  }, 500);

}

// Winner/Loser screen
function winnerLoserScreen(didWinOrLose) {
  $('#level-' + (round - 1)).css('display', 'none').removeClass('animation-' + (round - 1));
  if (didWinOrLose === "win") {
    $('#winner-screen').css('display', 'flex');
  } else if (didWinOrLose === "lose") {
    $('#loser-screen').css('display', 'flex').addClass('animation-loser');
  }
}

// Score output
function scoreOutput() {
  $('#score').html('<h3>Score: ' + gameScore + '</h3>');
}

// Lives output
function livesOutput() {
  $('#life').html('<h3>Lives: ' + lives + '</h3>');
}

// Hide Cards
function hideCards(card) {
  $('.' + card).parent().css('visibility', 'hidden');
}

// // // Front end logic // // //
$(function() {
// Local Storage for score
  if (localStorage.previousScores) {
  previousGameScores = JSON.parse(localStorage.previousScores);
  }

  topScore();
// New Game
  $('#new-game-start').submit(function(event) {
    event.preventDefault();
    userName = $('#player-name').val();
    $('#player').html('<h3>Player: ' + userName + '</h3>');
    gameScore = 0;
    newRound();
  });
// Play Another Game
  $('.reset-button').click(function() {
    gameEnd('win');
    location.reload();
  });
//Hint button
  $('button#hint-button').click(function() {
    if (hints === 0) {
      alert("you're out of hints");
    } else {
      hints += -1;
      $('.card').css('animation', 'rotatey 7000ms');
      setTimeout(function () {
        $('.card').css('animation', 'none');
      }, 7000);
    }
  });
// Quit Game
});
