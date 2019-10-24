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
          // file={ipynb}
          file="https://raw.githubusercontent.com/fastai/course-v3/master/nbs/dl1/00_notebook_tutorial.ipynb"
        />
      </div>
    )
  }
}


export default App;
