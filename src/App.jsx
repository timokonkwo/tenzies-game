import "./style.css";
import Die from "./Die";
import { useState } from "react";
import { nanoid } from "nanoid";

function App() {
	const allNewDice = (dice) => {

		const elements = Array.from({ length: 10 }, () =>
			Math.ceil(Math.random() * 6)
		).map((number) => ({ value: number, isHeld: false, id: nanoid() }));

		return elements;
	};

	const [diceValues, setDiceValues] = useState(allNewDice());

	const selectDie = (id) => {
		setDiceValues((items) => {
			const newDice = [];

			for (let i = 0; i < diceValues.length; i++) {
				const currentDie = items[i];
				if (currentDie.id === id) {
					newDice.push({
						...currentDie,
						isHeld: !currentDie.isHeld,
					});3
				} else {
					newDice.push(currentDie);
				}
			}

			return newDice;
		});
	};

  const rollDice = (dice) => {

    const newDiceElements = [];

    for (let i = 0; i < dice.length; i++){
      dice[i].isHeld ? newDiceElements.push(dice[i]) : newDiceElements.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false, 
        id: nanoid() 
      })
    }
    setDiceValues(newDiceElements)
  }

	const dice = diceValues.map((item) => (
		<Die
			key={item.id}
			id={item.id}
			isHeld={item.isHeld}
			number={item.value}
			select={selectDie}
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

					<div className="game">{dice}</div>

					<button
						className="roll__button"
						onClick={() => rollDice(diceValues)}
					>
						Roll
					</button>
				</section>
			</div>
		</main>
	);
}

export default App;
