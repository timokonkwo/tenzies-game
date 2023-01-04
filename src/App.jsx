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

	/**
	 * Challenge: Update the `holdDice` function to flip
	 * the `isHeld` property on the object in the array
	 * that was clicked, based on the `id` prop passed
	 * into the function.
	 *
	 * Hint: as usual, there's > 1 way to accomplish this.
	 * I'll be using `dice.map()` and checking for the `id`
	 * of the die to determine which one to flip `isHeld` on,
	 * but you can do whichever way makes the most sense to you.
	 */

	function holdDice(id) {
		const newDice = [];
		
		dice.map(die => {
			if (die.id === id){
				newDice.push({
					...die,
					isHeld: !die.isHeld
				})
			} else {
				newDice.push(die)
			}
		})

		setDice(newDice);
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
