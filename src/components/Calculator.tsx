import React from 'react';

import { ICalculatorController, ICalculateResult } from '../controllers/CalculatorController';
import ResultsList from './ResultsList';
import Header from './Header';
import InputSection from './InputSection';

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

const equationBank = [
  '((-2 + 10) + 20 * -2 -2) / -2 + 30 + (-14--11)',
  '((-3+12)+(2 * -2 -2)) / -6 + 30 + (-2--11)',
  '(1+ 20)/3 * 2 - 16',
  '1 + 20 / 2 * 5 - 2',
  '(3 - 1)^2*(3)',
  '.50 / (.5 +-1.5)^2',
  '(0.5 + 0.5)^10+(12-6)/6',
  '10^0.5+(10+1)-10*(0)',
]

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

  handleTryMe = () => {
    const randomIndex = Math.floor(Math.random() * equationBank.length);
    const input = equationBank[randomIndex];
    this.setState(() => ({ input }));
  }

  render () {
    return (
      <div className='calculator-app'>
        <Header />
        <div className='container'>
          <InputSection
            inputRef={this.inputRef}
            input={this.state.input}
            error={
              (this.state.calculateResults[0] &&
                this.state.calculateResults[0].error) ||
                ''
            }
            handleInputChange={this.handleInputChange}
            handleCalcSubmit={this.handleCalcSubmit}
            handleKeyPress={this.handleKeyPress}
            handleTryMe={this.handleTryMe}
          />
          {!!this.state.calculateResults.length &&
            <ResultsList calculateResults={this.state.calculateResults} />}
        </div>
      </div>
    );
  }
}

export default Calculator;
