import React from 'react';

function Display(props){
    return(
      <div id="display">
        <h3>{props.input}</h3>
      </div>
    );
  }

export default Display;