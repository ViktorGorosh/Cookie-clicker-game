"use strict";

// Style guide: элементы, начинающиеся с # - типа Node
let $start = document.getElementById('start');
let $game = document.getElementById('game');
let score = 0;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);

function startGame() {
	$start.classList.add('hide');
	$game.style.backgroundColor = '#fff';
	renderBox();
}

function renderBox() {
	$game.innerHTML = '';
	
	let box = document.createElement('div');
	
	box.style.width = box.style.height = '50px';
	box.style.position = 'absolute';
	box.style.top = '70px';
	box.style.left = '70px';
	box.style.backgroundColor = '#000';
	box.setAttribute('data-box', 'true');
	
	$game.append(box);
}

function handleBoxClick(event) {
	if (!event.target.dataset.box) return;
	score++;
	renderBox();
}