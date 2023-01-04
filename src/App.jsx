import { useState } from "react";
import "./style.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import { useEffect } from "react";

export default function App() {
	const [dice, setDice] = useState(allNewDice());
	const [win, setWin] = useState(false);

	/**
	 * Challenge: Check the dice array for these winning conditions:
	 * 1. All dice are held, and
	 * 2. all dice have the same value
	 *
	 * If both conditions are true, set `tenzies` to true and log
	 * "You won!" to the console
	 */
	useEffect(() => {
		const checkDice = dice.map(die => die.isHeld ? die.value :null).filter(die => die != null)
		checkDice.length === 10 && checkDice.reduce((val, item) => val + item) === checkDice[0] * 10 ? setWin(true) : ""

	}, [dice]);

	function generateNewDie() {
		return {
			id: nanoid(),
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
		};
	}

	// function to generate a random 10 dice
	function allNewDice() {
		const newDice = [];

		for (let i = 0; i < 10; i++) {
			newDice.push(generateNewDie());
		}

		return newDice;
	}

	// Function to roll the dice not held and randomize them
	function rollDice() {
		setDice((oldDice) =>
			oldDice.map((die) => {
				return die.isHeld ? die : generateNewDie();
			})
		);
	}

	// Function to hold a dice
	function holdDice(id) {
		setDice((oldDice) =>
			oldDice.map((die) => {
				return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
			})
		);
	}

	const diceElements = dice.map((die) => (
		<Die
			key={die.id}
			value={die.value}
			isHeld={die.isHeld}
			holdDice={() => holdDice(die.id)}
		/>
	));

	return (
		<main>
			<div className="container">
				<section className="game__board">
					<header>
						<h1 className="game__title">Tenzies</h1>
						<p className="game__description">
							Roll until all dice are the same. Click each die to
							freeze it at its current value between rolls
						</p>
					</header>

					<div className="game">{diceElements}</div>

					<button className="roll__button" onClick={rollDice}>
						Roll
					</button>
				</section>
			</div>
		</main>
	);
}
