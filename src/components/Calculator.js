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
      <ScreenRow type="total" total={props.total}
                 style={{fontFamily: 'Open Sans', fontSize: "30px", padding: "10px 0", overflow: "hidden"}}/>
      <ScreenRow type="input" input={props.inputString}
                 style={{fontFamily: 'Open Sans', fontSize: "20px", padding: "10px 0"}}/>
    </Segment.Group>
  );
};

export default class Calculator extends Component {
  static initialState = () => ({
    inputNumbers: [],
    inputActions: [],
    inputString: '',
    internalTotal: 0,
    lastClicked: undefined,
    total: '0',
  });

  actionKeys = ['+', '-', '/', '*', '='];
  numberKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '00'];

  state = Calculator.initialState();

  add = (priorTotal, number) => priorTotal + number;

  subtract = (priorTotal, number) => priorTotal - number;

  multiply = (priorTotal, number) => priorTotal * number;

  divide = (priorTotal, number) => priorTotal / number;

  calculate = (inputAction, inputNumber1, inputNumber2) => {
    let calculation;
    switch (inputAction) {
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
    return this[calculation](inputNumber1, inputNumber2)
  };

  keyClick = (clickedKey) => {
    switch (clickedKey) {
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

  updateInput = (clickedKey) => {
    console.log('update');
    switch (clickedKey) {
      case "+":
      case "-":
      case "*":
      case "/":
        this.setState(({ inputActions, inputNumbers, inputString, internalTotal, lastClicked, total }) => {
          if (this.actionKeys.includes(lastClicked)) {
            if (lastClicked === '=') {
              return {
                inputActions: inputActions.concat(clickedKey),
                inputString: `${inputString} ${clickedKey}`,
                lastClicked: clickedKey,
              }
            }
            return {
              inputActions: inputActions.slice(0, inputActions.length - 1).concat(clickedKey),
              inputString: `${inputString.substring(0, inputString.length - 1)}${clickedKey}`,
              lastClicked: clickedKey,
            };
          }
          if (this.numberKeys.includes(lastClicked)) {
            if (inputNumbers.length === 1) {
              const updatedTotal = this.calculate(inputActions[0], inputNumbers[0], Number(total));
              return {
                inputActions: inputActions.concat(clickedKey),
                inputNumbers: inputNumbers.concat(Number(total)),
                inputString: `${inputString} ${total} ${clickedKey}`,
                internalTotal: updatedTotal,
                lastClicked: clickedKey,
                total: `${updatedTotal}`,
              }
            }
            if (inputNumbers.length > 1) {
              const updatedTotal = this.calculate(
                inputActions[inputActions.length - 1],
                internalTotal,
                Number(total),
              );
              return {
                inputActions: inputActions.concat(clickedKey),
                inputNumbers: inputNumbers.concat(Number(total)),
                inputString: `${inputString} ${total} ${clickedKey}`,
                internalTotal: updatedTotal,
                lastClicked: clickedKey,
                total: `${updatedTotal}`
              }
            }
            return {
              inputActions: inputActions.concat(clickedKey),
              inputNumbers: inputNumbers.concat(Number(total)),
              inputString: `${inputString} ${total} ${clickedKey}`,
              lastClicked: clickedKey,
            }
          }
          if (lastClicked === '.') {
            if (inputNumbers.length === 1) {
              const updatedTotal = this.calculate(inputActions[0], inputNumbers[0], Number(total));
              return {
                inputActions: inputActions.concat(clickedKey),
                inputNumbers: inputNumbers.concat(Number(total)),
                inputString: `${inputString} ${total.substring(0, total.length - 1)} ${clickedKey}`,
                internalTotal: updatedTotal,
                lastClicked: clickedKey,
                total: `${updatedTotal}`,
              }
            }
            if (inputNumbers.length > 1) {
              const updatedTotal = this.calculate(
                inputActions[inputActions.length - 1],
                internalTotal,
                Number(total),
              );
              return {
                inputActions: inputActions.concat(clickedKey),
                inputNumbers: inputNumbers.concat(Number(total)),
                inputString: `${inputString} ${total.substring(0, total.length - 1)} ${clickedKey}`,
                internalTotal: updatedTotal,
                lastClicked: clickedKey,
                total: `${updatedTotal}`
              }
            }
            return {
              inputActions: inputActions.concat(clickedKey),
              inputNumbers: inputNumbers.concat(Number(total)),
              inputString: `${inputString} ${total.substring(0, total.length - 1)} ${clickedKey}`,
              lastClicked: clickedKey,
            }
          }
        });
        break;
      case "=":
        this.setState(({ inputActions, inputNumbers, inputString, internalTotal, lastClicked, total }) => {
          if (this.actionKeys.includes(lastClicked)) {
            if (lastClicked === "=") {
              return;
            }
            return {
              inputActions: inputActions.slice(0, inputActions.length - 1),
              inputString: inputString.slice(0, inputString.length - 1),
              lastClicked: clickedKey,
            }
          }
          if (this.numberKeys.includes(lastClicked)) {
            if (inputNumbers.length === 1) {
              const updatedTotal = this.calculate(inputActions[0], inputNumbers[0], Number(total));
              return {
                inputActions: inputActions.concat(clickedKey),
                inputNumbers: inputNumbers.concat(Number(total)),
                inputString: `${inputString} ${total}`,
                internalTotal: updatedTotal,
                lastClicked: clickedKey,
                total: `${updatedTotal}`,
              }
            }
            if (inputNumbers.length > 1) {
              const updatedTotal = this.calculate(
                inputActions[inputActions.length - 1],
                internalTotal,
                Number(total),
              );
              return {
                inputActions: inputActions.concat(clickedKey),
                inputNumbers: inputNumbers.concat(Number(total)),
                inputString: `${inputString} ${total}`,
                internalTotal: updatedTotal,
                lastClicked: clickedKey,
                total: `${updatedTotal}`
              }
            }
            return {
              inputNumbers: inputNumbers.concat(Number(total)),
              inputString: `${inputString} ${total}`,
              lastClicked: clickedKey,
            }
          }
          if (lastClicked === '.') {
            if (inputNumbers.length === 1) {
              const updatedTotal = this.calculate(inputActions[0], inputNumbers[0], Number(total));
              return {
                inputActions: inputActions.concat(clickedKey),
                inputNumbers: inputNumbers.concat(Number(total)),
                inputString: `${inputString} ${total.substring(0, total.length - 1)}`,
                internalTotal: updatedTotal,
                lastClicked: clickedKey,
                total: `${updatedTotal}`,
              }
            }
            if (inputNumbers.length > 1) {
              const updatedTotal = this.calculate(
                inputActions[inputActions.length - 1],
                internalTotal,
                Number(total),
              );
              return {
                inputActions: inputActions.concat(clickedKey),
                inputNumbers: inputNumbers.concat(Number(total)),
                inputString: `${inputString} ${total.substring(0, total.length - 1)}`,
                internalTotal: updatedTotal,
                lastClicked: clickedKey,
                total: `${updatedTotal}`
              }
            }
            return {
              inputNumbers: inputNumbers.concat(Number(total)),
              inputString: `${inputString} ${total.substring(0, total.length - 1)}`,
              lastClicked: clickedKey,
            }
          }
        });
        break;
      case ".":
        this.setState(({ lastClicked, total}) => {
          if (_.isUndefined(lastClicked)) {
            return {
              total: '0.',
              lastClicked: clickedKey,
            }
          }
          if (this.actionKeys.includes(lastClicked)) {
            if (lastClicked === '=') {
              const state = Calculator.initialState();
              state.total = '0.';
              state.lastClicked = clickedKey;
              return state;
            }
            return {
              total: '0.',
              lastClicked: clickedKey,
            }
          }
          if (this.numberKeys.includes(lastClicked)) {
            if (total.includes(clickedKey)) { return; }
            return {
              total: `${total}${clickedKey}`,
              lastClicked: clickedKey,
            }
          }
      });
        break;
      case "0":
      case "00":
        this.setState(({ lastClicked, total }) => {
          if (this.actionKeys.includes(lastClicked)) {
            if (lastClicked === '=') {
              return Calculator.initialState()
            }
            return {
              total: '0',
              lastClicked: clickedKey,
            }
          }
          if (this.numberKeys.includes(lastClicked)) {
            return {
              total: `${total}${clickedKey}`,
              lastClicked: clickedKey,
            }
          }
          if (lastClicked === '.') {
            return {
              total: `${total}${clickedKey}`,
              lastClicked: clickedKey,
            }
          }
        });
        break;
      default:
        this.setState(({ lastClicked, total }) => {
          if (total === '0') {
            return {
              total: clickedKey,
              lastClicked: clickedKey,
            }
          }
          if (this.actionKeys.includes(lastClicked)) {
            if (lastClicked === '=') {
              return Calculator.initialState()
            }
            return {
              total: clickedKey,
              lastClicked: clickedKey,
            }
          }
          if (this.numberKeys.includes(lastClicked)) {
            return {
              total: `${total}${clickedKey}`,
              lastClicked: clickedKey,
            }
          }
          if (lastClicked === ".") {
            return {
              total: `${total}${clickedKey}`,
              lastClicked: clickedKey,
            }
          }
        })
    }
  };

  render() {
    return (
      <Container className="calculator" style={{marginTop: "5%", alignText: "middle"}} text>
        <Segment raised={true} padded="very" style={{background: "lightgrey"}}>
          <Screen inputString={this.state.inputString} total={this.state.total}/>
          <KeyPad keyClick={this.keyClick}/>
        </Segment>
      </Container>
    )
  }
}