import React, {Component} from 'react';
import Calculator from './components/Calculator';

import './App.css';
import '../node_modules/semantic-ui-css/semantic.min.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Calculator/>
      </div>
    );
  }
}

export default App;
