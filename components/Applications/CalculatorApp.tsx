
import React, { useState } from 'react';

const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleDigitClick = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const handleOperatorClick = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (currentValue === null) {
      setCurrentValue(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplay(String(result));
      setCurrentValue(result);
    }
    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = (): number => {
    const inputValue = parseFloat(display);
    if (currentValue === null || operator === null) return inputValue;

    switch (operator) {
      case '+': return currentValue + inputValue;
      case '-': return currentValue - inputValue;
      case '*': return currentValue * inputValue;
      case '/': return currentValue / inputValue;
      default: return inputValue;
    }
  };

  const handleEqualsClick = () => {
    if (operator && currentValue !== null) {
      const result = performCalculation();
      setDisplay(String(result));
      setCurrentValue(null); // Reset for new calculation sequence
      setOperator(null);
      setWaitingForOperand(false);
    }
  };

  const handleClearClick = () => {
    setDisplay('0');
    setCurrentValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ];

  return (
    <div className="flex flex-col h-full bg-gray-200 p-2 space-y-2">
      <input
        type="text"
        value={display}
        readOnly
        className="w-full p-2 text-right text-2xl font-mono y2k-sunken bg-white mb-2"
      />
      <button onClick={handleClearClick} className="w-full y2k-button bg-red-400 hover:bg-red-500 text-white">Clear</button>
      <div className="grid grid-cols-4 gap-1 flex-grow">
        {buttons.flat().map((btn) => (
          <button
            key={btn}
            onClick={() => {
              if (btn === '=') handleEqualsClick();
              else if (['+', '-', '*', '/'].includes(btn)) handleOperatorClick(btn);
              else handleDigitClick(btn);
            }}
            className={`y2k-button text-lg p-2 ${btn === '=' ? 'col-span-1 bg-green-400 hover:bg-green-500' : ''} ${['+', '-', '*', '/'].includes(btn) ? 'bg-blue-400 hover:bg-blue-500' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CalculatorApp;
