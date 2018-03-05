import React from 'react';
import { Segment } from 'semantic-ui-react';

const ScreenRow = (props) => {
  return (
    <Segment className={props.type} vertical style={props.style}>
      {props[props.type]}
    </Segment>
  )
};

export default ScreenRow;
