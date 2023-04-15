import React, { useEffect, useState } from 'react';
import Input from '../Input/Input';

const MultiInput = ({setFunction, values, firstInput, secondInput, thirdInput = ''}) => {

  const [ currentFirstInputValue, setCurrentFirstInputValue ] = useState('')
  const setCurrentFirstInputValueFn = (e) => {
    setCurrentFirstInputValue(e.target.value)
  }

  const [ currentSecondInputValue, setCurrentSecondInputValue ] = useState('')
  const setCurrentSecondInputValueFn = (e) => {
    setCurrentSecondInputValue(e.target.value)
  }

  // const [ currentThirdInputValue, setCurrentThirdInputValue ] = useState('')
  // const setCurrentThirdInputValueFn = (e) => {
  //   setCurrentThirdInputValue(e.target.value)
  // }
  const [typeOfInput, setTypeOfInput] = useState(null)
  
  useEffect(() => {
    if(firstInput==='ingredientName') {
      setTypeOfInput('ingredient')
    } else {
      setTypeOfInput('step')
    }
  }, [])

  return (
    <div>
      {values.map(value => {
        return <p key={value[firstInput]}>{firstInput==='ingredientName' ? `${value[secondInput]}g of ${value[firstInput]}` : value[firstInput]}</p>
      })}
      <Input 
        name={firstInput}
        onChange={setCurrentFirstInputValueFn}
        value={currentFirstInputValue}
        placeholder={firstInput==='ingredientName' ? 'Enter ingredient name...' : 'Enter step heading...'}
      />
      <Input 
        name={secondInput}
        onChange={setCurrentSecondInputValueFn}
        value={currentSecondInputValue}
        placeholder={secondInput==='ingredientAmount' ? `Enter ingredient amount in grams...` : 'Enter step text'}
      />
      {/* {thirdInput ? 
        <Input 
          name={thirdInput}
          onChange={setCurrentThirdInputValueFn}
          value={currentThirdInputValue}
          placeholder={secondInput==='ingredientAmount' ? `Enter ingredient amount in grams...` : null}
        />
      : null
      } */}
      <button className="btn btn-info" onClick={() => {
        setFunction({
          [firstInput]: currentFirstInputValue,
          [secondInput]: currentSecondInputValue
        })
        setCurrentFirstInputValue('')
        setCurrentSecondInputValue('')
        }} type='button'>
        Add
      </button>
    

    </div>
  );
};

export default MultiInput;