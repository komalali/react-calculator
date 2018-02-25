import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';
import '../node_modules/semantic-ui-css/semantic.min.css';

const ActionKey = (props) => {
  return (
    <div className="key column">
      <button className="fluid ui orange button">{props.value}</button>
    </div>
  )
};

const NumberKey = (props) => {
  return (
    <div className="key column">
      <button className="fluid ui blue button">{props.value}</button>
    </div>
  )
};

const KeyPad = () => {
  return (
    <div className="keypad row">
      <div className="numberPad three wide column">
        <div className="ui three column grid container">
          <div className="numberPad-row row">
            <NumberKey value="1" />
            <NumberKey value="2" />
            <NumberKey value="3" />
          </div>
          <div className="numberPad-row row">
            <NumberKey value="4" />
            <NumberKey value="5" />
            <NumberKey value="6" />
          </div>
          <div className="numberPad-row row">
            <NumberKey value="7" />
            <NumberKey value="8" />
            <NumberKey value="9" />
          </div>
          <div className="numberPad-row row">
            <NumberKey value="0" />
            <NumberKey value="00" />
            <NumberKey value="." />
          </div>
        </div>
      </div>
      <div className="actionPad three wide column">
        <div className="ui two column grid container">
          <ActionKey value="+"/>
          <ActionKey value="-"/>
        </div>
        <div className="ui two column grid container">
          <ActionKey value="/"/>
          <ActionKey value="*"/>
        </div>
      </div>
    </div>
  );
};

const ScreenRow = (props) => {
  return (
    <div className={`${props.type} six wide column`}>
      <div className="" style={{textAlign: "right"}}>
        {props[props.type]}
      </div>
    </div>
  )
};

const Screen = (props) => {
  return (
    <div className="screen row ui segment">
      <ScreenRow type="total" total={props.total} />
      <ScreenRow type="input" input={props.input} />
    </div>
  );
};

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      input: ' ',
      total: 0,
    };
  }

  render() {
    return (
      <div className="calculator ui raised very padded container segment">
        <Screen input={this.state.input} total={this.state.total}/>
        <KeyPad/>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Calculator />
      </div>
    );
  }
}

export default App;
