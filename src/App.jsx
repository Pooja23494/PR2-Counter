import React, { useEffect, useRef, useState } from 'react'

const App = () => {

  const [count, setCount] = useState(0);
  const [value, setValue] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    let oldCount = JSON.parse(localStorage.getItem('count')) || 0;
    let oldValue = JSON.parse(localStorage.getItem('value')) || null;
    setCount(oldCount);
    setValue(oldValue);
  }, []);

  const handleIncrement = () => {
    let newCount = count + (value || 1);
    setCount(newCount);
    localStorage.setItem('count', newCount);
  }

  const handleDecrement = () => {
    let newCount = count - (value || 1);
    setCount(newCount);
    localStorage.setItem('count', newCount);
  }

  const handleSave = (e) => {
    e.preventDefault();
    let newValue = Number(inputRef.current.value);
    setValue(newValue);
    localStorage.setItem('value', newValue);
    inputRef.current.value = '';
  }

  const handleReset = () => {
    let newCount = 0;
    let newValue = null;
    setCount(newCount);
    setValue(newValue);
    localStorage.setItem('count', newCount);
    localStorage.setItem('value', newValue);
  }

  return (
    <div className="container">
      <h2>Counter</h2>
      <div className="counter-wrapper">
        <div className="counter-info">
          <h1>{count}</h1>
          {value ? <span>Count By : {value}</span> : null}
        </div>

        <div className="counter-controls">
          <form method='post' onSubmit={handleSave}>
            <input type="number" min={1} max={20} placeholder='Enter count by value' ref={inputRef} />
            <button type="submit" className="btn-outline">Save</button>
          </form>

          <div className="btn-group">
            <button className="btn-outline" onClick={handleIncrement}>
              Increment
            </button>
            <button className="btn-outline" onClick={handleDecrement}>
              Decrement
            </button>
          </div>

          <button className="btn-danger" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );

}

export default App
