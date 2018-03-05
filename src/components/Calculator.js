// Calculator.js
import React, { Component } from 'react';
import _ from 'lodash';
import {
  Container,
  Segment
} from 'semantic-ui-react';

import KeyPad from './KeyPad';
import Screen from './Screen';

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
        this.clear();
        break;
      default:
        this.update(clickedKey);
        break;
    }
  };

  clear = () => {
    console.log('clear');
    this.setState(Calculator.initialState)
  };

  pushToInputNumbers = () => {
    this.setState(prevState => ({ inputNumbers: prevState.inputNumbers.concat(Number(prevState.total)) }));
  };

  pushToInputActions = (value) => {
    this.setState(prevState => ({ inputActions: prevState.inputActions.concat(value) }));
  };

  replaceLastInputAction = (value) => {
    this.setState(prevState => ({
      inputActions: prevState.inputActions.slice(0, prevState.inputActions.length - 1).concat(value)
    }));
  };

  removeLastInputAction = () => {
    this.setState(prevState => ({ inputActions: prevState.inputActions.slice(0, prevState.inputActions.length - 1)}))
  };

  updateLastClicked = (value) => this.setState({ lastClicked: value });

  addNumberToInputString = () => {
    this.setState(prevState => ({ inputString: `${prevState.inputString} ${Number(prevState.total)}`}))
  };

  addNumberAndActionToInputString = (value) => {
    this.setState(prevState => ({ inputString: `${prevState.inputString} ${Number(prevState.total)} ${value}`}))
  };

  addActionToInputString = (value) => {
    this.setState(prevState => ({ inputString: `${prevState.inputString} ${value}`}))
  };

  replaceLastInputStringAction = (value) => {
    this.setState(prevState => ({
      inputString: `${prevState.inputString.substring(0, prevState.inputString.length - 1)}${value}`
    }));
  };

  removeLastInputStringAction = () => {
    this.setState(prevState => ({
      inputString: `${prevState.inputString.substring(0, prevState.inputString.length - 1)}`
    }));
  };

  appendToTotal = (value) => this.setState(prevState => ({total: `${prevState.total}${value}`}));

  resetTotal = () => this.setState({total: '0'});

  setTotal = (value) => this.setState({total: value});

  showCalculatedTotal = (updatedTotal) => this.setState({
    internalTotal: updatedTotal,
    total: `${updatedTotal}`
  });

  update = (clickedKey) => {
    console.log('update');
    const {
      inputActions,
      inputNumbers,
      inputString,
      internalTotal,
      lastClicked,
      total
    } = this.state;

    switch (clickedKey) {
      case "+":
      case "-":
      case "*":
      case "/":
        if (this.actionKeys.includes(lastClicked)) {
          if (lastClicked === '=') {
            this.pushToInputActions(clickedKey);
            this.addActionToInputString(clickedKey);
          } else {
            if (inputString.length > 1) {
              this.replaceLastInputAction(clickedKey);
              this.replaceLastInputStringAction(clickedKey);
            }
          }
        }
        if (this.numberKeys.includes(lastClicked)) {
          this.pushToInputActions(clickedKey);
          this.pushToInputNumbers();
          this.addNumberAndActionToInputString(clickedKey);
          if (inputNumbers.length === 1) {
            const updatedTotal = this.calculate(inputActions[0], inputNumbers[0], Number(total));
            this.showCalculatedTotal(updatedTotal);
          } else if (inputNumbers.length > 1) {
            const updatedTotal = this.calculate(inputActions[inputActions.length - 1], internalTotal, Number(total));
            this.showCalculatedTotal(updatedTotal);
          }
        }
        if (lastClicked === '.') {
          this.pushToInputActions(clickedKey);
          this.pushToInputNumbers();
          this.addNumberAndActionToInputString(clickedKey);
          if (inputNumbers.length === 1) {
            const updatedTotal = this.calculate(inputActions[0], inputNumbers[0], Number(total));
            this.showCalculatedTotal(updatedTotal);
          } else if (inputNumbers.length > 1) {
            const updatedTotal = this.calculate(inputActions[inputActions.length - 1], internalTotal, Number(total));
            this.showCalculatedTotal(updatedTotal);
          }
        }
        break;
      case "=":
        if (this.actionKeys.includes(lastClicked)) {
          if (lastClicked !== "=") {
            this.removeLastInputAction();
            this.removeLastInputStringAction();
          }
        }
        if (this.numberKeys.includes(lastClicked)) {
          this.pushToInputNumbers();
          this.addNumberToInputString();
          if (inputNumbers.length === 1) {
            const updatedTotal = this.calculate(inputActions[0], inputNumbers[0], Number(total));
            this.showCalculatedTotal(updatedTotal);
          } else if (inputNumbers.length > 1) {
            const updatedTotal = this.calculate(inputActions[inputActions.length - 1], internalTotal, Number(total));
            this.showCalculatedTotal(updatedTotal);
          }
        }
        if (lastClicked === '.') {
          this.pushToInputNumbers();
          this.addNumberToInputString();
          if (inputNumbers.length === 1) {
            const updatedTotal = this.calculate(inputActions[0], inputNumbers[0], Number(total));
            this.showCalculatedTotal(updatedTotal);
          } else if (inputNumbers.length > 1) {
            const updatedTotal = this.calculate(inputActions[inputActions.length - 1], internalTotal, Number(total));
            this.showCalculatedTotal(updatedTotal);
          }
        }
        break;
      case ".":
        if (_.isUndefined(lastClicked)) {
          this.appendToTotal(clickedKey);
        } else if (this.actionKeys.includes(lastClicked)) {
          if (lastClicked === '=') {
            this.setState(Calculator.initialState());
            this.appendToTotal(clickedKey);
          } else {
            this.resetTotal();
            this.appendToTotal(clickedKey);
          }
        } else if (this.numberKeys.includes(lastClicked)) {
          if (!total.includes(clickedKey)) {
            this.appendToTotal(clickedKey);
          }
        }
        break;
      case "0":
      case "00":
        if (this.actionKeys.includes(lastClicked)) {
          if (lastClicked === '=') {
            this.setState(Calculator.initialState());
          } else {
            this.resetTotal();
          }
        } else if (this.numberKeys.includes(lastClicked)) {
          this.appendToTotal(clickedKey);
        } else if (lastClicked === '.') {
          this.appendToTotal(clickedKey);
        }
        break;
      default:
        if (total === '0') {
          this.setTotal(clickedKey);
        } else if (this.actionKeys.includes(lastClicked)) {
          if (lastClicked === '=') {
            this.setState(Calculator.initialState());
            this.setTotal(clickedKey);
          } else {
            this.setTotal(clickedKey);
          }
        } else if (this.numberKeys.includes(lastClicked)) {
          this.appendToTotal(clickedKey);
        } else if (lastClicked === ".") {
          this.appendToTotal(clickedKey);
        }
    }
    this.updateLastClicked(clickedKey);
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