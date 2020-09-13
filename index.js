"use strict";

// Style guide: элементы, начинающиеся с $ - типа Node
let $start = document.getElementById('start');
let $game = document.getElementById('game');
let $time = document.getElementById('time');
let $timeHeader = document.getElementById('time-header');
let $resultHeader = document.getElementById('result-header');
let $result = document.getElementById('result');

let isGameStarted = false;
let score;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);

function startGame() {
	score = 0;
	isGameStarted = true;
	setGameStart();
	
	$start.classList.add('hide');
	$game.style.backgroundColor = '#fff';
	renderBox();
	
	let interval = setInterval(function () {
		let time = parseFloat($time.textContent);
		
		if (time <= 0) {
			clearInterval(interval);
			endGame();
		} else {
			$time.innerHTML = (time - 0.1).toFixed(1);
		}
	}, 100);
}

function endGame() {
	isGameStarted = false;
	setGameScore();
	
	$resultHeader.classList.remove('hide');
	$timeHeader.classList.add('hide');
	$start.classList.remove('hide');
	$game.style.backgroundColor = '#ccc';
	$game.innerHTML = '';
}

function setGameScore() {
	$result.textContent = score.toString();
}

function setGameStart() {
	let time = 5;
	$time.textContent = time.toFixed(1);
	$resultHeader.classList.add('hide');
	$timeHeader.classList.remove('hide');
}

function renderBox() {
	$game.innerHTML = '';
	
	let box = document.createElement('div');
	let boxSize = getRandom(30, 100);
	let gameSize = $game.getBoundingClientRect();
	let maxTop = gameSize.height - boxSize;
	let maxLeft = gameSize.width - boxSize;
	
	box.style.width = box.style.height = boxSize + 'px';
	box.style.position = 'absolute';
	box.style.top = getRandom(0, maxTop) + 'px';
	box.style.left = getRandom(0, maxLeft) + 'px';
	box.style.backgroundColor = '#000';
	box.setAttribute('data-box', 'true');
	
	$game.append(box);
}

function handleBoxClick(event) {
	if (!isGameStarted || !event.target.dataset.box) return;
	score++;
	renderBox();
}

function getRandom(min, max) {
	return Math.floor( min + Math.random() * (max - min) );
}
