let game = {
		user: '',
		computer: '',
		currentPlayer: '',
		moves: 1,
};

const $grids = document.getElementsByClassName('tabla');
const $buttons = document.getElementsByClassName('swal-button');
const $t1 = document.getElementById('t1');
const $t2 = document.getElementById('t2');
const $t3 = document.getElementById('t3');
const $t4 = document.getElementById('t4');
const $t5 = document.getElementById('t5');
const $t6 = document.getElementById('t6');
const $t7 = document.getElementById('t7');
const $t8 = document.getElementById('t8');
const $t9 = document.getElementById('t9');
let gameWon = false;
const $winners = document.getElementsByClassName('win');

function welcome(){
	swal({
		title: "Hola !",
		text: "Elegí con que ficha vas a jugar...",
	  buttons: {
	    círculo: {
	      text: "O",
	      value: "O",
				className: 'círculo'
	    },
			symbolX: {
	      text: "X",
	      value: "X",
				className: 'cruz'
	    }
	  },
		closeOnClickOutside: false,
		closeOnEsc: false,
		icon: "success"
	})
		.then((value) => {
			swal({
				text: 'Tateti juega primero...',
				timer: 1000,
				buttons: false
			})
		})

	$buttons[0].addEventListener('click', () => setFig('O'));
	$buttons[1].addEventListener('click', () => setFig('X'));
}

function setFig(content) {
	if (content === 'X') {
		game.user = 'X';
		game.computer = 'O';
	} else if (content === 'O') {
		game.user = 'O';
		game.computer = 'X';
	}
	firstMove();
	setCurrPl('user');
}

function firstMove() {
	setTimeout(() => document.getElementById('t5').textContent = game.computer, 1100);
}

function setCurrPl(curr) {
	game.currentPlayer = curr;
}

function icon(id) {
	if(game.currentPlayer == 'user') {
		document.getElementById(id).textContent = game.user;
		status();
		setCurrPl('computer');
	} else if(game.currentPlayer == 'computer') {
		document.getElementById(id).textContent = game.computer;
		status();
		setCurrPl('user');
	}
	game.moves++;
	status();
	if (game.currentPlayer == 'computer') {
    setTimeout(() => comp(), 350);
  }
}

function comp() {
	switch(true) {
		case $t1.textContent === "":
			icon('t1');
			break;
		case $t2.textContent === "":
			icon('t2');
			break;
		case $t3.textContent === "":
			icon('t3');
			break;
		case $t4.textContent === "":
			icon('t4');
			break;
		case $t5.textContent === "":
			icon('t5');
			break;
		case $t6.textContent === "":
			icon('t6');
			break;
		case $t7.textContent === "":
			icon('t7');
			break;
		case $t8.textContent === "":
			icon('t8');
			break;
		case $t9.textContent === "":
			icon('t9');
			break;
	}
}

function status() {
	let currentPlayer;

	if(game.currentPlayer == 'user') {
		currentPlayer = game.user;
	} else if (game.currentPlayer == 'computer') {
		currentPlayer = game.computer;
	}

	switch (true) {
		case $t1.textContent === currentPlayer && $t2.textContent === currentPlayer && $t3.textContent === currentPlayer:
			winner($t1, $t2, $t3);
			gameWon = true;
			isWon();
			break;
		case $t4.textContent === currentPlayer && $t5.textContent === currentPlayer && $t6.textContent === currentPlayer:
			winner($t4, $t5, $t6);
			gameWon = true;
			isWon();
			break;
		case $t7.textContent === currentPlayer && $t8.textContent === currentPlayer && $t9.textContent === currentPlayer:
			winner($t7, $t8, $t9);
			gameWon = true;
			isWon();
			break;
		case $t1.textContent === currentPlayer && $t4.textContent === currentPlayer && $t7.textContent === currentPlayer:
			winner($t1, $t4, $t7);
			gameWon = true;
			isWon();
			break;
		case $t2.textContent === currentPlayer && $t5.textContent === currentPlayer && $t8.textContent === currentPlayer:
			winner($t2, $t5, $t8);
			gameWon = true;
			isWon();
			break;
		case $t3.textContent === currentPlayer && $t6.textContent === currentPlayer && $t9.textContent === currentPlayer:
			winner($t3, $t6, $t9);
			gameWon = true;
			isWon();
			break;
		case $t1.textContent === currentPlayer && $t5.textContent === currentPlayer && $t9.textContent === currentPlayer:
			winner($t1, $t5, $t9);
			gameWon = true;
			isWon();
			break;
		case $t7.textContent === currentPlayer && $t5.textContent === currentPlayer && $t3.textContent === currentPlayer:
			winner($t7, $t5, $t3);
			gameWon = true;
			isWon();
			break;
		default:		
	}
}

function winner(el1, el2, el3) {
	el1.classList.add("win");
	el2.classList.add("win");
	el3.classList.add("win");
}

function isDraw() {
	if (game.moves == 9 && gameWon == false) {
		swal("Empataron");
		setTimeout(playAgain, 500);
	}
}

function isWon() {
	if(gameWon) {
		if(game.currentPlayer == 'user') {
			swal('Ganaste !!!');
			setTimeout(playAgain, 500);
		} else {
			swal('Ganó Tateti :C');
			setTimeout(playAgain, 500);
		}
	}
}

function playAgain() {
	for(let i = 0; i < $grids.length; i++){
		$grids[i].textContent= "";
		$grids[i].classList.remove('win');
	}
	game.moves = 1;
	gameWon = false;
	setTimeout(firstMove, 500);
}

function user(i){
	if($grids[i].textContent !== game.computer) {
		icon($grids[i].id);
	}
}

function playGame() {
	for (let i = 0; i < $grids.length; i++) {
		$grids[i].addEventListener('click',() => user(i));
	}
}


welcome();
playGame();