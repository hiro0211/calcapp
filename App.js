import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [calc, setCalc] = useState({
    current: '0',
    total: 0,
    isInitial: true,
    preOperation: ''
  });

  const handleNumber = (value) => {
    let newValue = value;
    if (!calc.isInitial) {
      newValue = calc.current + value;
    }
    setCalc({ ...calc, current: newValue, isInitial: false });
  };

  const handleOperator = (value) => {
    const total = calc.isInitial ? calc.total : calculate();
    setCalc({ ...calc, isInitial: true, total: total, preOperation: value, current: formatNumber(total) });
  };

  const calculate = () => {
    const current = parseFloat(calc.current);
    const total = parseFloat(calc.total);
    switch (calc.preOperation) {
      case '+':
        return total + current;
      case '-':
        return total - current;
      case '*':
        return total * current;
      case '/':
        return current !== 0 ? total / current : 'Error';
      default:
        return current;
    }
  };

  const handleEqual = () => {
    const total = calculate();
    setCalc({ ...calc, current: formatNumber(total), isInitial: true, total: total });
  };

  const handleClear = () => {
    setCalc({ current: '0', total: 0, isInitial: true, preOperation: '' });
  };

  const handleBackspace = () => {
    if (calc.current.length === 1) {
      setCalc({ ...calc, current: '0', isInitial: true });
    } else {
      setCalc({ ...calc, current: calc.current.slice(0, -1) });
    }
  };

  const handleDot = () => {
    if (!calc.current.includes('.')) {
      setCalc({ ...calc, current: calc.current + '.', isInitial: false });
    }
  };

  const handlePercent = () => {
    const currentValue = parseFloat(calc.current);
    setCalc({ ...calc, current: formatNumber(currentValue / 100), isInitial: false });
  };

  const handleToggleSign = () => {
    setCalc({ ...calc, current: formatNumber(parseFloat(calc.current) * -1) });
  };

  const formatNumber = (num) => {
    if (num === 'Error') return num;
    const formatted = parseFloat(parseFloat(num).toPrecision(12)).toString();
    return formatted.length > 10 ? num.toExponential(5) : formatted;
  };

  return (
    <div className="calculator">
      <div className="display">{calc.current}</div>
      <div className="buttons">
        <button onClick={handleClear} className="top-row">C</button>
        <button onClick={handlePercent} className="top-row">%</button>
        <button onClick={handleToggleSign} className="top-row">+/-</button>
        <button onClick={() => handleOperator('/')} className="operator">÷</button>
        <button onClick={() => handleNumber('7')}>7</button>
        <button onClick={() => handleNumber('8')}>8</button>
        <button onClick={() => handleNumber('9')}>9</button>
        <button onClick={() => handleOperator('*')} className="operator">×</button>
        <button onClick={() => handleNumber('4')}>4</button>
        <button onClick={() => handleNumber('5')}>5</button>
        <button onClick={() => handleNumber('6')}>6</button>
        <button onClick={() => handleOperator('-')} className="operator">-</button>
        <button onClick={() => handleNumber('1')}>1</button>
        <button onClick={() => handleNumber('2')}>2</button>
        <button onClick={() => handleNumber('3')}>3</button>
        <button onClick={() => handleOperator('+')} className="operator">+</button>
        <button onClick={() => handleNumber('0')} className="zero">0</button>
        <button onClick={handleDot}>.</button>
        <button onClick={handleEqual} className="operator">=</button>
      </div>
    </div>
  );
};

export default App;