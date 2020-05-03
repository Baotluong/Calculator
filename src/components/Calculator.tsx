import React from 'react';

interface IState {
  input: string;
  output: number;
}

const initialState = {
  input: '',
  output: 0,
}

// type State = Readonly <typeof initialState>

class Calculator extends React.PureComponent<{}, IState> {
  state: Readonly<IState> = initialState;
  // constructor (props: IProps) {
  //   super(props);
  // }
  
  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    this.setState(() => ({ input }));
  }

  onCalculateClick = () => {
    console.log(this.state.input);
  }

  render () {
    return (
      <div className='calculator-app'>
        <p>Calculator</p>
        <p>
          <input 
            type='text'
            placeholder='Enter your equation!'
            value={this.state.input}
            onChange={this.onInputChange}
          />
          <button
            onClick={this.onCalculateClick}
          >Calculate!</button>
        </p>
        { !!this.state.output && <p>The Answer is: {this.state.output}</p> }
      </div>
    );
  }
}

export default Calculator;
