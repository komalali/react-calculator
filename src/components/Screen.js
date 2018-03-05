import React from 'react';
import { Segment } from 'semantic-ui-react';

import ScreenRow from './ScreenRow';

const Screen = (props) => {
  return (
    <Segment.Group className="screen" style={{background: "white"}}>
      <ScreenRow type="total" total={props.total}
                 style={{fontFamily: 'Open Sans', fontSize: "30px", padding: "10px 0", overflow: "hidden"}}/>
      <ScreenRow type="input" input={props.inputString}
                 style={{fontFamily: 'Open Sans', fontSize: "20px", padding: "10px 0"}}/>
    </Segment.Group>
  );
};

export default Screen;
