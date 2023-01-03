import "./style.css"
import Die from "./Die"
import { useState } from "react"

function App(){

  

  const allNewDice = () => Array.from({length: 10}, () => Math.ceil(Math.random() * 6))

  const [diceValues, setDiceValues] = useState(allNewDice())

  const dice = diceValues.map(value => <Die number={value}/>)

  return (
    <main>
      <div className="container">
        <section className="game__board">
          <header>
            <h1 className="game__title">Tenzies</h1>
            <p className="game__description">
              Roll until all dice are the same. Click each die to freeze it at its current value between rolls
            </p>
          </header>

          <div className="game">
            {dice}
          </div>

          <button className="roll__button">Roll</button>
        </section>
      </div>
    </main>
  )
}


export default App
