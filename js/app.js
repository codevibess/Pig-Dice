var scores, roundScore, activePlayer, gameIsPlaying, previousDice, winningScore;

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gameIsPlaying = true;


    //Hide a dices when page is first loaded or reloaded 
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.second-dice').style.display = 'none';

    //Set zeros in field curent & player score 
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';


    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');


    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    winningScore = document.querySelector('.winning-score').value;
    if (winningScore != +winningScore || winningScore == '') {
        winningScore = 100;
    }
}

function switchPlayer() {

    switch (activePlayer) {
        case 0:
            activePlayer = 1
            break;
        case 1:
            activePlayer = 0;
            break;
    }

    //Swap  active  label  
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.second-dice').style.display = 'none';
}
function zeroCurrentField() {
    document.querySelector('#current-' + activePlayer).textContent = 0;
    roundScore = 0;

}

init();



/*Button New Game*/
document.querySelector('.btn-new').addEventListener('click', init);

/*Button Roll*/
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gameIsPlaying) {
        //1.Random number  
        var dice = Math.floor(Math.random() * 6) + 1;
        var secondDice = Math.floor(Math.random() * 6) + 1;
        //var dice = 6;

        //2.Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'https://raw.githubusercontent.com/codevibess/Pig-Dice/master/images/Dice-' + dice + '.png';

        var diceDOM = document.querySelector('.second-dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'https://raw.githubusercontent.com/codevibess/Pig-Dice/master/images/Dice-' + secondDice + '.png';

        if (dice == 1 || secondDice == 1 || (dice == 6 && secondDice == 6)) {

            zeroCurrentField();
            secondDice = 0;
            switchPlayer();


        } else {
            //Show in field #curent roundScore
            roundScore += dice + secondDice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

            previousDice = dice;
        }
    }
});

/*Button Hold*/
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gameIsPlaying) {
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        zeroCurrentField();
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gameIsPlaying = false;

        } else {

            switchPlayer();
        }
    }
});

