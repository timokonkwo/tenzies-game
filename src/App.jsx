import "./style.css";
import Die from "./Die";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

function App() {
	const allNewDice = () => {
		const elements = Array.from({ length: 10 }, () =>
			Math.ceil(Math.random() * 6)
		).map((number) => ({ value: number, isHeld: false, id: nanoid() }));

		return elements;
	};

	const [diceValues, setDiceValues] = useState(allNewDice());
	const [game, setGame] = useState({ numbers: [], win: false });
	const [win, setWin] = useState(false);

	useEffect(() => {
		checkWin();
	}, [game]);

	const selectDie = (id) => {
		setDiceValues((items) => {
			const newDice = [];

			for (let i = 0; i < diceValues.length; i++) {
				const currentDie = items[i];
				if (currentDie.id === id) {
					newDice.push({
						...currentDie,
						isHeld: !currentDie.isHeld,
					});
				} else {
					newDice.push(currentDie);
				}
			}

			const held = newDice.filter((item) => item.isHeld);

			setGame(() => ({
				...game,
				numbers: held.map((item) => item.value),
			}));

			return newDice;
		});
	};

	const checkWin = () => {
		let total;
		game.numbers.length > 0
			? (total = game.numbers.reduce((total, current) => total + current))
			: "";

		total / 10 === game.numbers[1] ? setWin(true) : null;
	};

	const rollDice = (dice) => {
		const newDiceElements = [];

		for (let i = 0; i < dice.length; i++) {
			if (dice[i].isHeld) {
				newDiceElements.push(dice[i]);
				// heldItems.push(dice[i].value)
			} else {
				newDiceElements.push({
					value: Math.ceil(Math.random() * 6),
					isHeld: false,
					id: nanoid(),
				});
			}
		}

		setDiceValues(newDiceElements);
	};

  const resetGame = () => {
    setDiceValues(allNewDice())
    setGame({ numbers: [], win: false })
    setWin(false)
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

					{win ? (
						<button
							className="roll__button"
							onClick={resetGame}
						>
							reset
						</button>
					) : (
						<button
							className="roll__button"
							onClick={() => rollDice(diceValues)}
						>
							roll
						</button>
					)}
				</section>
			</div>
		</main>
	);
}

export default App;
