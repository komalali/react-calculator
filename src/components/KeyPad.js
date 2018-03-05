import React from 'react';
import { Grid } from 'semantic-ui-react';

import Key from './Key';

const KeyPad = (props) => {
  const rowStyle = {
    padding: '5px 0'
  };

  return (
    <Grid columns={5} style={{marginTop: "10px"}}>
      <Grid.Row style={rowStyle}>
        <Key value="1" keyClick={props.keyClick}/>
        <Key value="2" keyClick={props.keyClick}/>
        <Key value="3" keyClick={props.keyClick}/>
        <Key value="+" keyClick={props.keyClick} color="teal"/>
        <Key value="/" keyClick={props.keyClick} color="teal"/>
      </Grid.Row>
      <Grid.Row style={rowStyle}>
        <Key value="4" keyClick={props.keyClick}/>
        <Key value="5" keyClick={props.keyClick}/>
        <Key value="6" keyClick={props.keyClick}/>
        <Key value="-" keyClick={props.keyClick} color="teal"/>
        <Key value="*" keyClick={props.keyClick} color="teal"/>
      </Grid.Row>
      <Grid.Row style={rowStyle}>
        <Key value="7" keyClick={props.keyClick}/>
        <Key value="8" keyClick={props.keyClick}/>
        <Key value="9" keyClick={props.keyClick}/>
      </Grid.Row>
      <Grid.Row style={rowStyle}>
        <Key value="0" keyClick={props.keyClick}/>
        <Key value="00" keyClick={props.keyClick}/>
        <Key value="." keyClick={props.keyClick}/>
        <Key value="clear" keyClick={props.keyClick} color="purple"/>
        <Key value="=" keyClick={props.keyClick} color="purple"/>
      </Grid.Row>
    </Grid>
  );
};

export default KeyPad;
