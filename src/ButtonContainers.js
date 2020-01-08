import React from 'react';
import Button from './Button';

function ButtonContainers(props){
    const buttons = props.buttonsData.map(data => (<Button handleClick={props.handleClick} key={data.id} id={data.id} value={data.value}/>));
    return(
      <div id="button-container">     
        {buttons}
      </div>
    );
  }

export default ButtonContainers;