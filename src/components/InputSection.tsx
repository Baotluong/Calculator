import React from 'react';

interface IProps {
  error: string;
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleCalcSubmit: () => void;
  handleTryMe: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const InputSection = (props: IProps) => {
  return (
    <div className='input-section'>
      { !!props.error &&
        <div className='error-section'>
          <p className='error-message'>{props.error}</p>
        </div>}
      <input
        type='text'
        placeholder='Enter Your Equation'
        value={props.input}
        onChange={props.handleInputChange}
        onKeyPress={props.handleKeyPress}
        autoFocus
        ref={props.inputRef}
      />
      <button
        onClick={props.handleCalcSubmit}
        disabled={!props.input}
      >
        Calculate!
      </button>
      <button
        onClick={props.handleTryMe}
      >
        Try Me!
      </button>
    </div>
  );
}

export default InputSection;