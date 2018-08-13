"use strict";
/**
 * Button for a single simulation
 */
const bttns1 = document.getElementById("s1");

/**
 * Button for 10 simulations
 */
const bttns10 = document.getElementById("s10");

/**
 * Button for 100 simulations
 */
const bttns100 = document.getElementById("s100");

/**
 * Global variables to display information about simulations made.
 */
const global = {
	throws: 0,
	yahtzees: 0,
	results: []
};

/**
 * Updates the contents of the html with the resuls of a single simulation.
 * @param {Number} throws the amount of throws made in the last simulation.
 * @param {Number} dice the last dice value in the last simulation.
 */
function updateHist(throws, dice) {
	if (throws !== 0) {
		const history = document.getElementsByClassName("his")[0];
		history.innerHTML += `<p>${global.yahtzees}. total rolls: ${throws},`+
			` value of last dice: ${dice}</p>`;
	}
}

/**
 * Updates the div with the average values and the information on it.
 */
function updateAver() {
	const average = document.getElementsByClassName("aver")[0];
	const expected = Math.trunc(10000000 * (1 / 1296)) / 10000000;

	let aver;
	if (global.throws === 0) {
		aver = 0;
	} else {
		aver = Math.trunc(10000000 * (global.yahtzees / global.throws)) / 10000000;
	}

	average.innerHTML = "<p>The total average at the moment is:" +
		` ${global.yahtzees}/${global.throws} = ${Math.trunc(aver * 100000)/1000}% = ${aver}</p>`;

	average.innerHTML += "<p>The expected average is: 1/1296 = " +
		`${Math.trunc(expected * 100000)/1000}% = ${expected}</p>`;
}

/**
 * Simulates the throw of a single dice.
 */
function dice() {
	let random = Math.random();
	let dice = 1 + random * 6;

	return Math.trunc(dice);
}

/**
 * checks if all the dice are equal to each other
 * 
 * @param {Number} d1 the value of the first dice
 * @param {Number} d1 the value of the first dice
 * @param {Number} d2 the value of the second dice
 * @param {Number} d3 the value of the third dice
 * @param {Number} d4 the value of the forth dice
 * @param {Number} d5 the value of the fifth dice
 */
function equalD(d1, d2, d3, d4, d5) {
	return (d1 === d2 &&
		d1 === d3 &&
		d1 === d4 &&
		d1 === d5);
}

/**
 * Executes a simulation, generating 5 dice everytime and then
 * checking if they have the same value. If they do the 
 * simulation stops and it will return the amount of throws made
 */
function simulation() {
	let numberOfSimulations = 0;
	let dice1, dice2, dice3, dice4, dice5;

	do {
		numberOfSimulations++;

		dice1 = dice();
		dice2 = dice();
		dice3 = dice();
		dice4 = dice();
		dice5 = dice();

	} while (!equalD(dice1, dice2, dice3, dice4, dice5));

	return { throws: numberOfSimulations, dic: dice1 };
}

/**
 * Creates a timeout that will execute a simulation without blocking the
 * main thread, or at least will chain simulations in a way that won't block
 * the thread too much :/
 * 
 * @param {Number} amount
 */
function createSimulations(amount) {

	for (let index = 0; index < amount; index++) {
		setTimeout(() => {
			let { throws, dic } = simulation();
			global.throws += throws;
			global.yahtzees++;
			global.results.push(throws);

			updateHist(throws, dic);
			updateAver();
		}, 1);
	}
}

/**
 * Generates a single simulation of the dice throws
 */
function s1Click() {
	createSimulations(1);
}

/**
 * Generates 10 simulations of the dice throws
 */
function s10Click() {
	setTimeout(() => {
		createSimulations(10);
	}, 1);
}

/**
 * Generates 100 simulations of the dice throws
 */
function s100Click() {
	setTimeout(() => {
		createSimulations(100);
	}, 1);
}

/**
 * When document loads it will add the event triggers to the buttons.
 */
onload = () => {
	bttns1.onclick = s1Click;
	bttns10.onclick = s10Click;
	bttns100.onclick = s100Click;
};