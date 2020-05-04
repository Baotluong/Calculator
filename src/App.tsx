import React from 'react';
import './App.css';

import Calculator from './components/Calculator';
import CalculatorController from './controllers/CalculatorController';

function App() {
  const _calculatorController = new CalculatorController();
  _calculatorController.calculate('((-2 + 10) + 20 * -2 -2) / -2 + 30 + (-14--11)');
  _calculatorController.calculate('((-2 + 10)) + 20 * -2 -2) / -2 + 30'); // Too many (
  _calculatorController.calculate('(1+ 20)/3 * 2 - 16');
  _calculatorController.calculate('(1+ 20/3 * 2 - 16'); // Not enough )
  _calculatorController.calculate('1 + 20 / 2 * 5 - 2');
  _calculatorController.calculate('1 + 20 / 2 *p 5 - 2'); // Wtf is a p
  _calculatorController.calculate('(3 - 1)^2*(3)');
  _calculatorController.calculate('(^3 - 1)(3)'); // Arithmatic Error
  _calculatorController.calculate('(3 - 1)^2(3)'); // Arithmatic Error
  _calculatorController.calculate('.50 / (.5 +-1.5)^2');
  _calculatorController.calculate('(.5 / 0.5.0 + 10)^2'); // Invalid .
  return (
    <div className="App">
      <Calculator CalculatorController={_calculatorController} />
    </div>
  );
}

export default App;
