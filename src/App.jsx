import "./style.css"

function App(){

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
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>0</div>
          </div>

          <button className="roll__button">Roll</button>
        </section>
      </div>
    </main>
  )
}


export default App
