import React from 'react';
import Display from './Display';
import ButtonContainer from './ButtonContainers';


class Calculator extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      input: '0',
      operatorsRegex: /[-x/+]/,
      mathExpressionRegex: /(?!(00))(-?\d+\.?\d*([\/x+-]-?(?!(00)))?)*/,
      buttonsData: [
        { id: 'clear', value: 'A/C'},
        { id: 'add', value: '+'},
        { id: 'subtract', value: '-'},
        { id: 'one', value: '1'},
        { id: 'two', value: '2'},
        { id: 'three', value: '3'},
        { id: 'multiply', value: 'x'},
        { id: 'four', value: '4'},
        { id: 'five', value: '5'},
        { id: 'six', value: '6'},
        { id: 'divide', value: '/'},
        { id: 'seven', value: '7'},
        { id: 'eight', value: '8'},
        { id: 'nine', value: '9'},
        { id: 'equals', value: '='},
        { id: 'decimal', value: '.'},
        { id: 'zero', value: '0'}   
      ]
    }
  }
  handleClick = (event) =>{
    const content = event.target.innerHTML;
    let nextInput = this.state.input + content;
    switch(event.target.innerHTML){
      case 'A/C': 
        this.setState({input: '0'})
        break;
      case '=':
        this.setState(state =>(this.calculate(state.input)))
        break;
      case '.':
        this.handleDecimal(nextInput, content)
        break;
      case '-':
        this.handleMinus(nextInput, content) 
        break;
       case 'x':
       case '/':
       case '+':
        this.handleOperators(nextInput, content) 
        break;
      default:
        this.handleDefault(nextInput, content) 
    } 
  }
  
  handleDefault = (nextInput, content) =>{
    let valuesArray = nextInput.split(this.state.operatorsRegex)
    let lastValueLength = valuesArray[valuesArray.length-1].length
    if(this.state.input.length===1 && this.state.input==='0'){
      this.setState(state =>{
        return ({input: content})
      })
    }
    else
    {
      if(nextInput.match(this.state.mathExpressionRegex)[0]===nextInput && lastValueLength < 20){
        this.setState(state =>{
          return ({input: state.input+content})
         })
      } 
    }
  }
  
  handleOperators = (nextInput, content) =>{
    
    if(this.state.operatorsRegex.test(nextInput.charAt(nextInput.length-2))){      
      if(this.state.operatorsRegex.test(nextInput.charAt(nextInput.length-3))){
        this.setState(state =>{
          let newInput = state.input.replace(/..$/, content)
          return ({input: newInput})
        })
      }
      else
      {
        this.setState(state =>{
          let newInput = state.input.replace(/.$/, content)
          return ({input: newInput})
        })
      }
          
    }
    else
    {
      if(nextInput.match(this.state.mathExpressionRegex)[0]===nextInput){
        this.setState(state =>{
          return ({input: state.input+content})
        })
      } 
    }
  }
  
  handleMinus = (nextInput, content) =>{ 
    if((this.state.input.length===1 && this.state.input==='0') || this.state.input.length === 0){
      this.setState(state =>{
        return ({input: content})
      })
    }
    else
    {
      if(nextInput.match(this.state.mathExpressionRegex)[0]===nextInput 
         || !(this.state.operatorsRegex.test(nextInput.charAt(nextInput.length-2)) 
         && this.state.operatorsRegex.test(nextInput.charAt(nextInput.length-1)))
         )
      {
        this.setState(state =>{
          return ({input: state.input+content})
        })
      }
    }
  }
  
  handleDecimal = (nextInput, content) =>{
    if(this.state.operatorsRegex.test(nextInput.charAt(nextInput.length-2)) && content==='.'){
      this.setState(state =>{
        return ({input: state.input+'0.'})
      })
    }
    else if(nextInput.match(this.state.mathExpressionRegex)[0]===nextInput){
      this.setState(state =>{
        return ({input: state.input+content})
      })
    }
  }
  
  calculate =(expression) =>{
    if(typeof expression === 'string' && (!this.state.operatorsRegex.test(expression.charAt(expression.length-1)))){
      
      const valuesRegex = /\d+\.?\d*/;     
      let values = expression.split(this.state.operatorsRegex);
      let operatorsArray = expression.split(valuesRegex);
      operatorsArray.shift()
      if(operatorsArray[operatorsArray.length-1]===''){ operatorsArray.pop() }
      let total;
      let operatorsAmount = operatorsArray.length;
      if(operatorsArray.length > 0 && values.length > 0){
        for(let i = 0; i < values.length; i++){
          if(values[i]===''){
            values[i+1]*=-1;
            values.splice(i, 1);
          }
        }
        for(let i = 0; i < operatorsAmount; i++){
          if(operatorsArray[i].length>1){
            operatorsArray[i]=operatorsArray[i][0];
          }
        }

        for(let i = 0; i < operatorsAmount; i++){
          let index = operatorsArray.findIndex(value => /[x/]/.test(value));
          if(index<0){index = operatorsArray.findIndex(value => /[-+]/.test(value));}
          switch(operatorsArray[index]){
            case 'x':
             total = Number(values[index])*Number(values[index+1])
             operatorsArray.splice(index, 1);
             values.splice(index, 2, total);
             break;
            case '/':
             total = Number(values[index])/Number(values[index+1])
             operatorsArray.splice(index, 1);
             values.splice(index, 2, total);
             break;
            case '-':
             total = Number(values[index])-Number(values[index+1])
             operatorsArray.splice(index, 1);
             values.splice(index, 2, total);
             break;
            case '+':
             total = Number(values[index])+Number(values[index+1])
             operatorsArray.splice(index, 1);
             values.splice(index, 2, total);
             break; 
          }
        }
        return({input: Number(total.toFixed(4))})
      }
    }
  }
  
  render(){
    const {input, buttonsData} = this.state
    return(
      <div id="calculator">
        <Display input={input}/>
        <ButtonContainer buttonsData={buttonsData} handleClick={this.handleClick}/>
      </div>
    )
  }
}

export default Calculator;