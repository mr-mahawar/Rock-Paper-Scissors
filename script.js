const SCORE_THEME = {
	tie: {
		result: {
			text: 'Tie!',
			color: 'white',
		},
		header: {
			color: 'rgb(40, 40, 40)',
			bgColor: 'white',
			shadowColor: 'rgba(255, 255, 255, 0.5)',
		}
	},
	lost: {
		result: {
			text: 'Lost!',
			color: 'rgb(255, 0, 76)',
		},
		header: {
			color: 'white',
			bgColor: 'rgb(255, 0, 76)',
			shadowColor: 'rgba(255, 0, 76, 0.5)',
		}
	},
	win: {
		result: {
			text: 'Won!',
			color: 'dodgerblue',
		},
		header: {
			color: 'white',
			bgColor: 'dodgerblue',
			shadowColor: 'rgba(30, 143, 255, 0.5)',
		}
	}
}

const playerScore = document.getElementById('player-score');
const playerChoiceEl = document.getElementById('player-choice');
const computerScore = document.getElementById('computer-score');
const computerChoiceEl = document.getElementById('computer-choice');
const resultText = document.getElementById('result-text');
const header = document.querySelector('.header');
const resetIcon = document.querySelector('.reset-icon');

const playerRock = document.getElementById('player-rock');
const playerPaper = document.getElementById('player-paper');
const playerScissors = document.getElementById('player-scissors');
const playerFire = document.getElementById('player-fire');
const playerWaterBaloon = document.getElementById('player-water-baloon');

const computerRock = document.getElementById('computer-rock');
const computerPaper = document.getElementById('computer-paper');
const computerScissors = document.getElementById('computer-scissors');
const computerFire = document.getElementById('computer-fire');
const computerWaterBaloon = document.getElementById('computer-water-baloon');

const allIcons =  document.querySelectorAll('.far');

const confettiEl = document.getElementById('confetti');

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'waterBaloon'] },
  paper: { name: 'Paper', defeats: ['rock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'waterBaloon'] },
  fire: { name: 'Fire', defeats: ['paper', 'scissors', 'rock'] },
  waterBaloon: { name: 'Water Baloon', defeats: ['paper', 'fire'] },
};

let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoice = '';
let confettiTimeoutId = 0;

// Toggle Confetti
function toggleConfetti(visible) {
	clearTimeout(confettiTimeoutId);
	if (!visible) {
		confettiEl.style.opacity = 0;
		return;
	}
	confettiEl.style.opacity = 1;
	confettiTimeoutId = setTimeout(() => {
		confettiEl.style.opacity = 0;
	}, 2000);
}

// Reset all '.selected' Icons
function resetSelected() {
  allIcons.forEach((icon) => {
    icon.classList.remove('selected');
  })
}

// Reset Score, Player Choice & Computer Choice
function resetAll() {
  resetIcon.classList.add = 'rotate';
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  playerScore.textContent = playerScoreNumber;
  computerScore.textContent = computerScoreNumber;
  playerChoiceEl.textContent = '';
  computerChoiceEl.textContent = '';
  resultText.textContent = 'Result';
  resultText.style.color = 'white';
  header.style.backgroundColor = 'white';
  header.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.5)';
  header.style.color = 'rgb(40, 40, 40)';
  resetSelected();
	toggleConfetti(false);
}

// Random Computer Choice
function randomComputerChoice() {
  const computerChoiceNumber = Math.round((Math.random()*4));
  switch(computerChoiceNumber) {
    case 0:
      computerChoice = 'rock';
      break;
    case 1:
      computerChoice = 'paper';
      break;
    case 2:
      computerChoice = 'scissors';
      break;
    case 3:
      computerChoice = 'fire';
      break;
    case 4:
      computerChoice = 'waterBaloon';
      break;
    default:
      break;
  }
}

// Passing computer Selection Value & Styling Icons
function displayComputerChoice(computerChoice) {
  // Add '.selected' Class & computer Choice
  switch (computerChoice) {
    case 'rock': 
        computerRock.classList.add('selected');
        computerChoiceEl.textContent = ' --- Rock';
        break;

      case 'paper': 
        computerPaper.classList.add('selected');
        computerChoiceEl.textContent = ' --- Paper';
        break;

      case 'scissors': 
        computerScissors.classList.add('selected');
        computerChoiceEl.textContent = ' --- Scissors';
        break;

      case 'fire': 
        computerFire.classList.add('selected');
        computerChoiceEl.textContent = ' --- Fire';
        break;

      case 'waterBaloon': 
        computerWaterBaloon.classList.add('selected');
        computerChoiceEl.textContent = ' --- Water Baloon';
        break;

      default: 
        break;
  }
}

// Check Result, Increase Scores, Update Result Text
function updateScore(playerChoice) {
	let selectedScoreTheme = SCORE_THEME.win;
  if (playerChoice === computerChoice) {
		selectedScoreTheme = SCORE_THEME.tie;
  } else {
		const choice = choices[playerChoice];
		if (choice.defeats.indexOf(computerChoice) === -1) {
			selectedScoreTheme = SCORE_THEME.lost;
			computerScoreNumber++;
			computerScore.textContent = computerScoreNumber;
		} else {
			toggleConfetti(true);
			playerScoreNumber++;
			playerScore.textContent = playerScoreNumber;
		}
	}
	resultText.textContent = selectedScoreTheme.result.text;
	resultText.style.color = selectedScoreTheme.result.color;
	header.style.backgroundColor = selectedScoreTheme.header.bgColor;
	header.style.boxShadow = `0 0 8px ${selectedScoreTheme.header.shadowColor}`;
	header.style.color = selectedScoreTheme.header.color;
}

// Call functions to process turn
function checkResult(playerChoice) {
	toggleConfetti(false);
  resetSelected();
  randomComputerChoice();
  displayComputerChoice(computerChoice);
  updateScore(playerChoice);
}

// Passing Player Selection Value & Styling Icons
function select(playerChoice) {
  checkResult(playerChoice);
  // Add '.selected' Class & Player Choice
  switch (playerChoice) {
    case 'rock': 
        playerRock.classList.add('selected');
        playerChoiceEl.textContent = ' --- Rock';
        break;

		case 'paper': 
			playerPaper.classList.add('selected');
			playerChoiceEl.textContent = ' --- Paper';
			break;

		case 'scissors': 
			playerScissors.classList.add('selected');
			playerChoiceEl.textContent = ' --- Scissors';
			break;

		case 'fire': 
			playerFire.classList.add('selected');
			playerChoiceEl.textContent = ' --- Fire';
			break;

		case 'waterBaloon': 
			playerWaterBaloon.classList.add('selected');
			playerChoiceEl.textContent = ' --- Water Baloon';
			break;

		default: 
			break;
  }
}