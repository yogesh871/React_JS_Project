import { useState } from "react";
import './Calculator.css'; 

const Calculator = () => {
  const [Buttons, setButtons] = useState([ 1, 2, 3, '+', 4, 5, 6,'-', 7, 8, 9,'*', 0,  '/' ,'(', ')',' .', '%' ,  ]);
  const [input, setInput] = useState('');

  
  const handleClick = (value) => {
    setInput(prev => prev + value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleButton = () => {
      const result = eval(input);
      setInput(result.toString());
  };

  
  return (
    <div className="calculator">
      <input placeholder="0" type="text" value={input} />
      <div className="button">
        {Buttons.map((item, index) => (
          <button class="btn" onClick={() => handleClick(item)} key={index}>
            {item}
          </button>
        ))}
        <button class="btn" onClick={handleButton}>=</button>
        <button class="btn" onClick={handleClear}>C</button>
      </div>


    </div>
  );
};

export default Calculator;
