import React, { useState } from "react";
import "./App.css";

function App() {
  const [lowerGuesses, setLowerGuesses] = useState([]);
  const [higherGuesses, setHigherGuesses] = useState([]);
  const [count, setCount] = useState(1);
  const [current, setCurrent] = useState(new Date());
  const [higher, setHigher] = useState(current);
  const [lower, setLower] = useState(new Date(0, 0, 1));

  const formatDateString = (date) => date.toString().substring(4, 15);

  const handleLower = () => {
    setHigher(current);
    setHigherGuesses((curr) => [...curr, current]);
    calulate();
  };

  const handleHigher = () => {
    setLower(current);
    setLowerGuesses((curr) => [...curr, current]);
    calulate();
  };

  const calulate = () => {
    if (count >= 30) return;

    const delta = higher.getTime() - lower.getTime();
    const err = delta * (Math.random() / 2 - 0.25);
    const guess = lower.getTime() + delta / 2 + err;
    setCurrent(new Date(guess));
    setCount((currentCount) => currentCount + 1);
  };

  return (
    <>
      <h1 className="title">qwerty</h1>
      <div className="dates">
        <div className="left">
          <button className="btn" onClick={handleHigher}>
            Earlier
          </button>
        </div>

        <div className="date-guess">{formatDateString(current)}</div>

        <div className="right">
          <button className="btn" onClick={handleLower}>
            Later
          </button>
        </div>
      </div>

      <div className="guesses">
        {count} Guess{count > 1 ? "es" : ""}
      </div>

      <div className="guess-container">
        <div className="later">
          {higherGuesses &&
            higherGuesses.map((h) => {
              return (
                <div key={`${count + Math.random()}`}>
                  {formatDateString(h)}
                </div>
              );
            })}
        </div>

        <div className="earlier">
          {lowerGuesses &&
            lowerGuesses.map((l) => {
              return (
                <div key={`${count + Math.random()}`}>
                  {formatDateString(l)}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
