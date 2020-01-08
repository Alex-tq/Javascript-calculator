import React from 'react';

function Button(props){
    return(
      <button onClick={props.handleClick} id={props.id}>{props.value}</button>
    )
  }

export default Button;