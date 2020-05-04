import React from 'react';

import {ICalculateResult} from '../controllers/CalculatorController';

interface IProps {
  calculateResult: ICalculateResult;
}

const ResultItem = (props: IProps) => {
  const { calculateResult } = props;
  return (
    <div className='result-item'>
      <p>{`Problem: ${calculateResult.input}`}</p>
      <p>{`Steps`}</p>
      {calculateResult.steps.map((step, index) => {
        return <p key={index}>{step}</p>;
      })}
      {!!calculateResult.output && <p>{`Result: ${calculateResult.output}`}</p>}
      {!!calculateResult.error && <p>{`Error: ${calculateResult.error}`}</p>}
    </div>
  );
}

export default ResultItem;
