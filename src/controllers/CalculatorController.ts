export interface ICalculatorController {
  calculate: (input: string) => void;
}

class CalculatorController implements ICalculatorController {
  private operations = {
    '+': null,
    '-': null,
    '*': null,
    '/': null,
    '(': null,
    ')': null,
    '^': null,
  };

  private parseString = (string: string): string[] => {
    const cleanString = string.replace(/ /g, '');
    const resultArr = []
    let start = 0;
    let end = 1;
    
    while (end <= cleanString.length) {
      if (!isNaN(cleanString[start] as any) || cleanString[start] === '.') {
        let decimalcount = 0;
        if (cleanString[start] === '.') decimalcount++;
        while (!isNaN(cleanString[end] as any) || cleanString[end] === '.') {
          if (cleanString[end] === '.') decimalcount++;
          if (decimalcount > 1) throw new Error('Too many "." in a single value');
          end++;        
        }
        resultArr.push(cleanString.substring(start, end));
        start = end++;
      } else if (this.operations.hasOwnProperty(cleanString[start])) {
        resultArr.push(cleanString[start])
        start++;
        end++;
      } else {
        throw new Error('Input contains invalid characters')
      }
    }

    let pos = 0;
    while (pos < resultArr.length) {
      const currentValue = resultArr[pos];
      if (
        currentValue === '-' &&
        (pos === 0 || this.operations.hasOwnProperty(resultArr[pos - 1])) &&
        !isNaN(resultArr[pos + 1] as any)
      ) {
        resultArr.splice(pos, 2, '-' + resultArr[pos + 1])
      } else if (currentValue === ')' && resultArr[pos + 1] === '(') {
        resultArr.splice(pos + 1, 0, '*');
      }
      pos++;
    }
    
    return resultArr;
  }

  private calcSingleExpression = (params: { x: string, y: string, operation: string }): number => {
    const { x, y, operation } = params;
    const xNum = Number.parseFloat(x);
    const yNum = Number.parseFloat(y);

    if (!xNum || !yNum || !operation) throw new Error('Input has an arithmatic error')
    let result = null;
    if (operation === '^') {
      result = Math.pow(xNum, yNum);
    } else if (operation === '+') {
      result = xNum + yNum;
    } else if (operation === '-') {
      result = xNum - yNum;
    } else if (operation === '*') {
      result = xNum * yNum;
    } else if (operation === '/') {
      result = xNum / yNum;
      if (result === Infinity || result === -Infinity) throw new Error('You cannot divide by 0.');
    }
    if (result === null || isNaN(result)) throw new Error('Input has an arithmatic error')
    return result;
  }

  private calcWholeExpression = (initialArray: string[]): number => {
    const resultArray: any[] = initialArray;
    // Exponents loop
    while (true) {
      const nextE = resultArray.findIndex((ele: string) => ele === '^');
      if (nextE < 0) break;
      const expResult = this.calcSingleExpression({
        x: resultArray[nextE - 1],
        y: resultArray[nextE + 1],
        operation: '^',
      });
      resultArray.splice(nextE - 1, 3, expResult);
    }

    // Multiply/Divide Loop
    while (true) {
      const nextMD = resultArray.findIndex(ele => ele === '*' || ele === '/');
      if (nextMD < 0) break;
      const expResult = this.calcSingleExpression({
        x: resultArray[nextMD - 1],
        y: resultArray[nextMD + 1],
        operation: resultArray[nextMD],
      })
      resultArray.splice(nextMD - 1, 3, expResult);
    }

    // Add/Subtract Loop
    while (resultArray.length !== 1) {
      const nextAS = resultArray.findIndex(ele => ele === '+' || ele === '-');
      if (nextAS < 0) throw new Error('Input has an arithmatic error');
      const expResult = this.calcSingleExpression({
        x: resultArray[nextAS - 1],
        y: resultArray[nextAS + 1],
        operation: resultArray[nextAS],
      })
      resultArray.splice(nextAS - 1, 3, expResult);
    }

    return resultArray[0];
  }

  private processParens = (initialArray: string[]) => {
    const resultArray: any[] = initialArray; 
    while (true) {
      let open = resultArray.lastIndexOf('(');
      if (open < 0) break;
      let close = null;
      if (open >= 0) {
        for (let i = open + 1; i < resultArray.length; i++) {
          if (resultArray[i] === ')') {
            close = i;
            break;
          }
        }
      }
      if (close === null) throw new Error('Input has too many "("')
      console.log(resultArray.join(' '))
      resultArray.splice(open, close - open + 1, this.calcWholeExpression(resultArray.slice(open + 1, close)))
    }
    if (resultArray.lastIndexOf(')') > 0) throw new Error('Input has too many ")"')
    console.log(resultArray.join(' '))
    return this.calcWholeExpression(resultArray);
  } 

  calculate = (input: string) => {
    console.log('==========================================');
    console.log();
    console.log(`Problem: ${input}`);
    try {
      const parsedArray = this.parseString(input)
      const answer = this.processParens(parsedArray)

      console.log(`Result: ${answer}`)
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
    console.log();
  }
}

export default CalculatorController;
