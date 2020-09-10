"use strict";

// Style guide: элементы, начинающиеся с # - типа Node
let $start = document.getElementById('start');
let $game = document.getElementById('game');

$start.addEventListener('click', startGame);

function startGame() {
	$start.classList.add('hide');
	$game.style.backgroundColor = '#fff';
	renderBox();
}

function renderBox() {
	
}