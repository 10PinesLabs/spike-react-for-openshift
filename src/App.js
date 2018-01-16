import React, { Component } from 'react';
import logo from './iconoMiClaro.svg';
import './App.css';

class Properties extends Component{
  render(){
    return (
        <div className="properties">
          <p>Los valores de las configuraciones son:</p>
          <Property title="Value1" value={this.props.value1} />
          <Property title="Value2" value={this.props.value2} />
        </div>
    );
  }
}

class Property extends Component{
  render() {
    return (
        <div className="property">
          <span className="title">{this.props.title}: </span>
          <span className="value">{this.props.value}</span>
        </div>
    );
  }
}

class Refresh extends Component{
  render(){
    return (
        <div className="refresh">
          <a className="refresh-btn" onClick={() => this.props.onClick()}>Refrescar configuracion</a>
        </div>
    );
  }

}
class ShowContent extends  Component{
  constructor(props) {
    super(props);
    this.state = { response: {
      "value1": "Default 1",
      "value2": "With the React App"
    }}
  }

  render() {
    return (
        <div className="center content">
          <Properties value1={this.state.response.value1} value2={this.state.response.value2} />
          <Refresh onClick={() => this.handleClick()}/>
        </div>
    );
  }


  handleClick(){
    this.setState({
      response : {
        "value1": "Refreshed 1",
        "value2": "So harcoded"
      }
    });
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Prueba de Concepto con React</h1>
        </header>
        <p className="App-intro">
          Esto solamente es una aplicación de ejemplo que funciona en conjunto con las demas apps.
        </p>
        <ShowContent />
      </div>
    );
  }
}

export default App;
