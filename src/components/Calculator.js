// Calculator.js
import React, {Component} from 'react';
import _ from 'lodash';
import {
  Button,
  Container,
  Grid,
  Segment
} from 'semantic-ui-react';

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
              style={{fontFamily: "Open Sans", fontSize:"20px", fontWeight: "regular", margin: "0", padding: "10px 0"}}>
        {props.value}
      </Button>
    </Grid.Column>
  )
};

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

const ScreenRow = (props) => {
  return (
    <Segment className={props.type} vertical style={props.style}>
      {props[props.type]}
    </Segment>
  )
};

const Screen = (props) => {
  return (
    <Segment.Group className="screen" style={{background: "white"}}>
      <ScreenRow type="total" total={props.total} style={{fontFamily: 'Open Sans', fontSize: "30px", padding: "10px 0"}}/>
      <ScreenRow type="input" input={props.inputString} style={{fontFamily: 'Open Sans', fontSize: "20px", padding: "10px 0"}}/>
    </Segment.Group>
  );
};

export default class Calculator extends Component {
  static initialState = () => ({
    inputNumbers: [],
    inputActions: [],
    inputString: '',
    total: '0',
    internalTotal: 0,
  });

  actionKeys = ['+', '-', '/', '*'];

  state = Calculator.initialState();

  add = (priorTotal, number) => priorTotal + number;

  subtract = (priorTotal, number) => priorTotal - number;

  multiply = (priorTotal, number) => priorTotal * number;

  divide = (priorTotal, number) => priorTotal / number;

  keyClick = (clickedKey) => {
    switch (clickedKey) {
      case "=":
        this.processInput();
        break;
      case "clear":
        this.clearInput();
        break;
      default:
        this.updateInput(clickedKey);
        break;
    }
  };

  clearInput = () => {
    console.log('clear');
    this.setState(Calculator.initialState)
  };

  processInput = () => {
    console.log('process');
    this.setState(prevState => {
      const {inputActions, inputNumbers, internalTotal} = prevState;
      if (internalTotal === 0) {
        let calculation;
        switch (inputActions[0]) {
          case "+":
            calculation = 'add';
            break;
          case "-":
            calculation = 'subtract';
            break;
          case "/":
            calculation = 'divide';
            break;
          case "*":
            calculation = 'multiply';
            break;
          default:
            break;
        }
        const updatedTotal = this[calculation](inputNumbers[0], inputNumbers[1])
        return {
          internalTotal: updatedTotal,
          total: `${updatedTotal}`
        }
      }
    })
  };

  updateInput = (clickedKey) => {
    console.log('update');

    this.setState(prevState => {
      const { inputActions, inputString, internalTotal, total } = prevState;
      if (this.actionKeys.includes(clickedKey)) {
        if (total === '0' && this.actionKeys.includes(inputString[inputString.length -1])) {
          return {
            inputActions: inputActions.slice(0, inputActions.length - 1).concat(clickedKey),
            inputString: `${inputString.substring(0, inputString.length - 1)}${clickedKey}`,
          }
        } else {
          return {
            inputNumbers: prevState.inputNumbers.concat(Number(total)),
            inputActions: prevState.inputActions.concat(clickedKey),
            inputString: `${prevState.inputString} ${total} ${clickedKey}`,
            total: `${internalTotal}`,
          }
        }
      } else {
        if (total === '0') {
          switch (clickedKey) {
            case '0':
            case '00':
              break;
            case '.':
              return {total: `${prevState.total}${clickedKey}`};
            default:
              return {total: clickedKey}
          }
        } else if (total.includes('.')) {
          switch (clickedKey) {
            case '.':
              break;
            default:
              return {total: `${prevState.total}${clickedKey}`};
          }
        } else {
          return {total: `${prevState.total}${clickedKey}`}
        }
      }
    });

    if (this.actionKeys.includes(clickedKey) && this.state.inputActions.length > 0) {
      this.processInput()
    }
  };

  render() {
    return (
      <Container className="calculator" style={{marginTop: "25%", alignText: "middle"}} text>
        <Segment raised={true} padded="very" style={{background: "whiteSmoke"}}>
          <Screen inputString={this.state.inputString} total={this.state.total}/>
          <KeyPad keyClick={this.keyClick}/>
        </Segment>
      </Container>
    )
  }
}