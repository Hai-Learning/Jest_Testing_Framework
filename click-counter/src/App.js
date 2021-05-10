import "./App.css";

function App() {
  return (
    <div className="App" data-test="component-app">
      <h1 data-test="counter-display">The counter is currently</h1>
      <button data-test="increment-button">Increment counter</button>
    </div>
  );
}

export default App;
