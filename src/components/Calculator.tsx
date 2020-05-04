import React from 'react';

import { ICalculatorController } from '../controllers/CalculatorController';

interface IProps {
  CalculatorController: ICalculatorController;
}

interface IState {
  input: string;
  output: number;
  error: string;
}

const initialState = {
  input: '',
  output: 0,
  error: '',
}

class Calculator extends React.PureComponent<IProps, IState> {
  state: Readonly<IState> = initialState;

  constructor (props: IProps) {
    super(props);
  }
  
  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    this.setState(() => ({ input }));
  }

  onCalculateClick = () => {
    const output = this.props.CalculatorController.calculate(this.state.input);
    if (typeof output === 'number') {
      this.setState(() => ({ output, input: '' }));
    } else {
      this.setState(() => ({ error: output }));
    }
  }

  render () {
    return (
      <div className='calculator-app'>
        <div className='title'>Calculator</div>
        { !!this.state.error &&
          <div className='error-message'>{this.state.error}</div>}
        <div>
          <input 
            type='text'
            placeholder='Enter your equation!'
            value={this.state.input}
            onChange={this.onInputChange}
          />
          <button
            onClick={this.onCalculateClick}
          >Calculate!</button>
        </div>
        { !!this.state.output &&
          <div className='answer'>The Answer is: {this.state.output}</div> }
      </div>
    );
  }
}

export default Calculator;
