import React from 'react';
import './App.css';

import Calculator from './components/Calculator';
import CalculatorController from './controllers/CalculatorController';



function App() {
  const calc = new CalculatorController();
  debugger;
  calc.calculate('((-2 + 10) + 20 * -2 -2) / -2 + 30 + (-14--11)');
  calc.calculate('((-2 + 10)) + 20 * -2 -2) / -2 + 30'); // Too many (
  calc.calculate('(1+ 20)/3 * 2 - 16');
  calc.calculate('(1+ 20/3 * 2 - 16'); // Not enough )
  calc.calculate('1 + 20 / 2 * 5 - 2');
  calc.calculate('1 + 20 / 2 *p 5 - 2'); // Wtf is a p
  calc.calculate('(3 - 1)^2*(3)');
  calc.calculate('(^3 - 1)(3)'); // Arithmatic Error
  calc.calculate('(3 - 1)^2(3)'); // Arithmatic Error
  calc.calculate('.50 / (.5 +-1.5)^2');
  calc.calculate('(.5 / 0.5.0 + 10)^2'); // Invalid .
  return (
    <div className="App">
      <Calculator />
    </div>
  );
}

export default App;
