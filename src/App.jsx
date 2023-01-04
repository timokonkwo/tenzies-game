import { useState } from "react";
import "./style.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import Confetti from 'react-confetti'

export default function App() {
	const [dice, setDice] = useState(allNewDice());
	const [win, setWin] = useState(false);


	useEffect(() => {
		// Javascript .every() method returns true if all elements meets the condition applied to it.
		const allHeld = dice.every(die => die.isHeld);
		const allSame = dice.every(die => die.value === dice[0].value)

		allHeld && allSame ? setWin(true) : ""

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

		if (!win){
			setDice((oldDice) =>
			oldDice.map((die) => {
				return die.isHeld ? die : generateNewDie();
			})
		);
		} else {
			setDice(allNewDice())
			setWin(false)
		}
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
				{win && <Confetti/> }
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
						{win ? "New Game" : "Roll"}
					</button>
				</section>
			</div>
		</main>
	);
}
