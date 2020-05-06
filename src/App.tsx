import React from 'react';
import './App.css';

import Calculator from './components/Calculator';
import CalculatorController from './controllers/CalculatorController';

const _calculatorController = new CalculatorController();

function App() {
  return (
    <div className="App">
      <Calculator CalculatorController={_calculatorController} />
    </div>
  );
}

export default App;
