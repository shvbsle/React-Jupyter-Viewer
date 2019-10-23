import React from 'react';
import logo from './logo.svg';
import './App.css';
import JupViewer from './JupViewer'

const ipynb = require('./BenchmarkNotebook.ipynb')


class App extends React.Component {
  render() {
    console.log(ipynb)
    return (
      <div className="App">
        <JupViewer
          file={ipynb}
        />
      </div>
    )
  }
}


export default App;
