import React from 'react';

import {ICalculateResult} from '../controllers/CalculatorController';

interface IProps {
  calculateResult: ICalculateResult;
}

const ResultItem = (props: IProps) => {
  const { calculateResult } = props;
  return (
    <div className='result-item'>
      <p className='result-bold'>Problem: {calculateResult.input}</p>
      {calculateResult.steps.map((step, index) => {
        return <p className='result-normal' key={index}>{step}</p>;
      })}
      {!!calculateResult.output &&
        <p className='result-bold'>{`Result: ${calculateResult.output}`}</p>}
      {!!calculateResult.error &&
        <p className='error-message'>{`Error: ${calculateResult.error}`}</p>}
    </div>
  );
}

export default ResultItem;
