import React from 'react';
import { Button } from 'semantic-ui-react';

const Key = (props) => {
  const keyColor = () => {
    switch (props.color) {
      case undefined:
        return "blue";
      default:
        return props.color;
    }
  };

  return (
    <Grid.Column className="key" style={{padding: "0 5px"}}>
      <Button color={keyColor()}
              compact
              fluid
              onClick={() => props.keyClick(props.value)}
              size="huge"
              style={{
                fontFamily: "Open Sans",
                fontSize: "20px",
                fontWeight: "regular",
                margin: "0",
                padding: "10px 0"
              }}>
        {props.value}
      </Button>
    </Grid.Column>
  )
};

export default Key;
