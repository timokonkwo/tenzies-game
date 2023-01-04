import { useState } from "react";
import "./style.css";
import Die from "./Die";
import { nanoid } from "nanoid";

export default function App() {
	const [dice, setDice] = useState(allNewDice());

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

	function rollDice() {
		setDice(allNewDice());
	}

	function holdDice(id) {
		console.log(id);
	}

	const diceElements = dice.map((die) => (
		<Die
			key={die.id}
			id={die.id}
			value={die.value}
			sHeld={die.isHeld}
			oldDice={holdDice}
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
