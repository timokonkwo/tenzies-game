import { useState } from "react";
import "./style.css";
import Die from "./Die";
import { nanoid } from "nanoid";

function App() {
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

	const diceElements = dice.map((die) => (
		<Die key={die.id} value={props.value} isHeld={die.isHeld} />
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

export default App;
