import "./style.css"
import Die from "./Die"

function App(){

  const allNewDice = () => Array.from({length: 10}, () => Math.floor(Math.random() * (6 - 1 + 1)) + 1)

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
            <Die number={4}/>
            <Die number={1}/>
            <Die number={2}/>
            <Die number={6}/>
            <Die number={3}/>
            <Die number={1}/>
            <Die number={5}/>
            <Die number={3}/>
            <Die number={5}/>
            <Die number={4}/>
          </div>

          <button className="roll__button">Roll</button>
        </section>
      </div>
    </main>
  )
}


export default App
