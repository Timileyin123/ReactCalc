import React, {useState} from 'react';
import './App.css';
import Header from './components/Header/Header';
import Screen from './components/Screen/Screen';
import ButtonBox from './components/ButtonBox/ButtonBox';
import Button from './components/Button/Button';
// import * as math from 'mathjs';

 const btnValues=[
      ["AC", "Del","+-","/"],
      ["7", 8, 9,"*"],
      [4, 5, 6,"+"],
      [1, 2, 3,"-"],
      [0, ".", "="],
    ];

const toLocaleString = (num) =>
   String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

 const removeSpaces = (num) => num.toString().replace(/\s/g, "");

function App(){

    let [calc, setCalc] = useState({
      sign: "",
      num: 0,
      res: 0,
    });

     const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 36) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const dotClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "*"
          ? a * b
          : a / b;

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    });
  };

  const deleteClickHandler = () => {
    
      //let num = calc.num ? toLocaleString(removeSpaces(-calc.num )) : 0;
       //let res = calc.res ? toLocaleString(removeSpaces(-calc.res)) : 0;

      
    let numString = calc.num.toString()
    console.log(calc.num);
    
    //   setCalc({
    //    ...calc,
    //     num: (num = (0, -1)),
    //      res: (res = (0, -1)),
    //    sign: "",
    //  });
    }
    
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };


  return (
    <div className="App">
       <Header />
       <div className='form'>
         <Screen  value={calc.num ? calc.num : calc.res}/>
         <ButtonBox>
           {

             btnValues.flat().map((btn,i)=>{
               return(
                 <>
                <Button key={i} className={btn === "=" ? "equal" : "" || btn === "AC" ? "reset" : ""} value={btn} onClick={
                   btn === "AC"
                  ? resetClickHandler
                  : btn === "del"
                  ? deleteClickHandler
                  : btn === "+-"
                  ? invertClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "/" || btn === "*" || btn === "-" || btn === "+"
                  ? signClickHandler
                  : btn === "."
                  ? dotClickHandler
                  : numClickHandler
                } />
                </>
               );
             })
           }
         </ButtonBox>
       </div>
       <div>
           
       </div>
       
    </div>
  );
}

export default App;
