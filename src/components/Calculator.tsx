import React, { createRef } from 'react';

import { ICalculatorController, ICalculateResult } from '../controllers/CalculatorController';
import ResultsList from './ResultsList';

interface IProps {
  CalculatorController: ICalculatorController;
}

interface IState {
  input: string;
  calculateResults: ICalculateResult[];
}

const initialState = {
  input: '',
  calculateResults: [],
}

class Calculator extends React.PureComponent<IProps, IState> {
  state: Readonly<IState> = initialState;
  inputRef = React.createRef<HTMLInputElement>()

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    this.setState(() => ({ input }));
  }

  handleCalcSubmit = () => {
    const calculateResult = this.props.CalculatorController.calculate(this.state.input);
    this.setState((prevState) => ({
      calculateResults: [calculateResult, ...prevState.calculateResults],
      input: calculateResult.error ? prevState.input : '',
    }));
    this.inputRef.current?.focus();
  }

  handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13 && this.state.input){
      this.handleCalcSubmit();    
    }
  }

  render () {
    return (
      <div className='calculator-app'>
        <h1 className='title'>Calculator</h1>
        { !!this.state.calculateResults[0] &&
          !!this.state.calculateResults[0].error &&
          <div className='error-message'>{this.state.calculateResults[0].error}</div>}
        <div>
          <input 
            type='text'
            placeholder='Enter your equation!'
            value={this.state.input}
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
            autoFocus
            ref={this.inputRef}
          />
          <button
            onClick={this.handleCalcSubmit}
            disabled={!this.state.input}
          >Calculate!</button>
        </div>
        {<ResultsList calculateResults={this.state.calculateResults} />}
      </div>
    );
  }
}

export default Calculator;
