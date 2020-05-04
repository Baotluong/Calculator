import React from 'react';

import ResultItem from './ResultItem';

import {ICalculateResult} from '../controllers/CalculatorController';

interface IProps {
  calculateResults: ICalculateResult[];
}

const ResultsList = (props: IProps) => {
  return (
    <div>
      {props.calculateResults.map((calculateResult, index) => {
        console.log();
        return <ResultItem key={index} calculateResult={calculateResult} />
      })}
    </div>
  );
}

export default ResultsList;
