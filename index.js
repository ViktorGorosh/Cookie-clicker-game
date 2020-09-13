"use strict";

// Style guide: элементы, начинающиеся с $ - типа Node
let $start = document.getElementById('start');
let $game = document.getElementById('game');
let $time = document.getElementById('time');
let $timeHeader = document.getElementById('time-header');
let $resultHeader = document.getElementById('result-header');
let $result = document.getElementById('result');
let $gameTime = document.getElementById('game-time');

let isGameStarted = false;
let score;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);

function hide($el) {
	$el.classList.add('hide');
}

function show($el) {
	$el.classList.remove('hide');
}

function startGame() {
	score = 0;
	isGameStarted = true;
	$gameTime.setAttribute('disabled', 'true');
	setGameTime();
	
	hide($start);
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
	$gameTime.removeAttribute('disabled');
	setGameScore();
	
	show($resultHeader);
	show($start);
	hide($timeHeader);
	$game.style.backgroundColor = '#ccc';
	$game.innerHTML = '';
}

function setGameScore() {
	$result.textContent = score.toString();
}

function setGameTime() {
	let time = +$gameTime.value;
	$time.textContent = time.toFixed(1);
	hide($resultHeader);
	show($timeHeader);
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