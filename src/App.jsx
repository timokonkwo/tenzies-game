import { useState } from "react";
import "./style.css";
import Die from "./Die";
import { nanoid } from "nanoid";

export default function App() {
	const [dice, setDice] = useState(allNewDice());

	// function to generate a random 10 dice
	function allNewDice() {
		const newDice = [];

		for (let i = 0; i < 10; i++) {
			newDice.push({
				id: nanoid(),
				value: Math.ceil(Math.random() * 6),
				isHeld: false,
			});
		}

		return newDice;
	}

	// Function to roll the dice not held and randomize them
	function rollDice() {
		setDice((oldDice) =>
			oldDice.map((die) => {
				return die.isHeld
					? { ...die }
					: {
						...die,
						id: nanoid(),
						value: Math.ceil(Math.random() * 6),
					  };
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
