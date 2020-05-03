// node calculator.js anyInt 'anyPrimaryOpertaion' anyInt
// '1 + 10'
// End product
// Should be able to do
// calculate('1 + 20 / 2 * 5 - 2'); // 49

// Bonus
// calculate('(1+ 20)/3 * 2 - 16'); // -2
// TODO: handle decimals
'use strict';

const operations = new Map();
operations.set('+')
operations.set('-')
operations.set('*')
operations.set('/')
operations.set('^')
operations.set('(')
operations.set(')')

const parseString = (string) => {
  const cleanString = string.replace(/ /g, '');
  const resultArr = []
  let start = 0;
  let end = 1;
  
  while (end <= cleanString.length) {
    if (!isNaN(cleanString[start]) || cleanString[start] === '.') {
      let decimalcount = 0;
      if (cleanString[start] === '.') decimalcount++;
      while (!isNaN(cleanString[end]) || cleanString[end] === '.') {
        if (cleanString[end] === '.') decimalcount++;
        if (decimalcount > 1) throw new Error('Too many "." in a single value');
        end++;        
      }
      resultArr.push(Number.parseFloat(cleanString.substring(start, end)));
      start = end++;
    } else if (operations.has(cleanString[start])) {
      resultArr.push(cleanString[start])
      start++, end++;
    } else {
      throw new Error('Input contains invalid characters')
    }
  }

  let pos = 0;
  while (pos < resultArr.length) {
    const currentValue = resultArr[pos];
    if (
      currentValue === '-' &&
      (pos === 0 || operations.has(resultArr[pos - 1])) &&
      !isNaN(resultArr[pos + 1])
    ) {
      resultArr.splice(pos, 2, -resultArr[pos + 1])
    } 
    // else if (currentValue === '.') {
    //   if (isNaN(resultArr[pos + 1])) throw new Error('Input has invalid "."');
    //   if (pos === 0 || operations.has(resultArr[pos - 1])) {
    //     resultArr.splice(pos, 2, Number.parseFloat('.' + resultArr[pos + 1]));
    //   } else if (!isNaN(resultArr[pos - 1])) {
    //     resultArr.splice(pos - 1, 3, Number.parseFloat(resultArr[pos - 1] + '.' + resultArr[pos + 1]));
    //   }
    // }
    else if (currentValue === ')' && resultArr[pos + 1] === '(') {
      resultArr.splice(pos + 1, 0, '*');
    }
    pos++;
  }
  
  return resultArr;
}

const calcSingleExpression = ({ x, y, operation }) => {
  if (!x || !y || !operation) throw new Error('Input has an arithmatic error')
  let result;
  if (operation === '^') {
    result = Math.pow(x, y);
  } else if (operation === '+') {
    result = x + y;
  } else if (operation === '-') {
    result = x - y;
  } else if (operation === '*') {
    result = x * y;
  } else if (operation === '/') {
    result = y === 0 ? 'cannot divide by 0' : x / y;
  }
  if (Number.isNaN(result)) throw new Error('Input has an arithmatic error')
  return result;
}

const calcWholeExpression = (parsedArray) => {
  // Exponents loop
  while (true) {
    const nextE = parsedArray.findIndex(ele => ele === '^');
    if (nextE < 0) break;
    const expResult = calcSingleExpression({
      x: parsedArray[nextE - 1],
      y: parsedArray[nextE + 1],
      operation: '^',
    });
    parsedArray.splice(nextE - 1, 3, expResult);
  }

  // Multiply/Divide Loop
  while (true) {
    const nextMD = parsedArray.findIndex(ele => ele === '*' || ele === '/');
    if (nextMD < 0) break;
    const expResult = calcSingleExpression({
      x: parsedArray[nextMD - 1],
      y: parsedArray[nextMD + 1],
      operation: parsedArray[nextMD],
    })
    parsedArray.splice(nextMD - 1, 3, expResult);
  }

  // Add/Subtract Loop
  while (parsedArray.length !== 1) {
    const nextAS = parsedArray.findIndex(ele => ele === '+' || ele === '-');
    if (nextAS < 0) throw new Error('Input has an arithmatic error');
    const expResult = calcSingleExpression({
      x: parsedArray[nextAS - 1],
      y: parsedArray[nextAS + 1],
      operation: parsedArray[nextAS],
    })
    parsedArray.splice(nextAS - 1, 3, expResult);
  }
  return parsedArray[0]
}

const processParens = (array) => {
  while (true) {
    let open = array.lastIndexOf('(');
    if (open < 0) break;
    let close = null;
    if (open >= 0) {
      for (let i = open + 1; i < array.length; i++) {
        if (array[i] === ')') {
          close = i;
          break;
        }
      }
    }
    if (close === null) throw new Error('Input has too many "("')
    console.log(array.join(' '))
    array.splice(open, close - open + 1, calcWholeExpression(array.slice(open + 1, close)))
  }
  if (array.lastIndexOf(')') > 0) throw new Error('Input has too many ")"')
  console.log(array.join(' '))
  return calcWholeExpression(array);
} 

const calculate = (input) => {
  console.log('==========================================');
  console.log();
  console.log(`Problem: ${input}`);
  try {
    const parsedArray = parseString(input)
    const answer = processParens(parsedArray)

    console.log(`Result: ${answer}`)
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
  console.log();
}

// calculate('((-2 + 10) + 20 * -2 -2) / -2 + 30 + (-14--11)');
// calculate('((-2 + 10)) + 20 * -2 -2) / -2 + 30'); // Too many (
// calculate('(1+ 20)/3 * 2 - 16');
// calculate('(1+ 20/3 * 2 - 16'); // Not enough )
// calculate('1 + 20 / 2 * 5 - 2');
// calculate('1 + 20 / 2 *p 5 - 2'); // Wtf is a p
// calculate('(3 - 1)^2*(3)');
// calculate('(^3 - 1)(3)'); // Arithmatic Error
// calculate('(3 - 1)^2(3)'); // Arithmatic Error
calculate('.50 / (.5 +-1.5)^2');
calculate('(.5 / 0.5.0 + 10)^2'); // Invalid .
