import React, {Component} from 'react';
import logo from './iconoMiClaro.svg';
import './App.css';

class Properties extends Component {
  render() {
    return (
        <div className="properties">
          <p>Los valores de las configuraciones son:</p>
          <Property title="Value1" value={this.props.value1}/>
          <Property title="Value2" value={this.props.value2}/>
        </div>
    );
  }
}

class Property extends Component {
  render() {
    return (
        <div className="property">
          <span className="title">{this.props.title}: </span>
          <span className="value">{this.props.value}</span>
        </div>
    );
  }
}

class Refresh extends Component {
  render() {
    return (
        <div className="refresh">
          <a className="refresh-btn" onClick={() => this.props.onClick()}>Refrescar configuracion</a>
          <p>Actualizamos <span className="title">{this.props.timesRefreshed}</span> veces</p>
        </div>
    );
  }
}

class ShowContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {
        "value1": "Hardcodeado desde el front",
        "value2": "Click en refrescar para probar"
      },
      timesRefreshed: 0
    }
  }

  handleClick() {
      console.log(this.props.urlBackend);
      fetch(this.props.urlBackend)
        .then(
            results => {
              return results.json()
            }
        ).then(
        results => {
          this.setState({response: results, timesRefreshed: this.state.timesRefreshed + 1});
          console.log("fetched: ", results)
        }
    ).catch((error) => {
      console.log("Error buscando datos", error);
      this.setState({
        response: {
          "value1": "Fallo miserablemente",
          "value2": "Detalles en la consola"
        }
      });

    });
  }

  render() {
    return (
        <div className="content center">
          <Properties value1={this.state.response.value1} value2={this.state.response.value2}/>
          <Refresh onClick={() => this.handleClick()} timesRefreshed={this.state.timesRefreshed}/>
        </div>
    );
  }


}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            urlBackend : process.env.REACT_APP_SERVER_URL
        };
    }

    componentDidMount(){
        fetch("/config").then(
            results => {
                return results.json();
            })
            .then( json => {
                let serverUrl = json.propertySources[0].source.server_url;
                console.log("url: ", serverUrl);
                if(serverUrl && typeof  serverUrl !== 'undefined'){
                    console.log("URL del server: ", serverUrl);
                    this.setState({urlBackend: serverUrl});
                }
            }
        ).catch((error) => {
            console.log("No se encontró la configuración, se va a usar el default", this.state.urlBackend);
            console.log(error);
        });
    }



    render() {
        return (
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">Prueba de Concepto con React</h1>
              </header>
              <p className="App-intro">
                Esto solamente es una aplicación de ejemplo que funciona en conjunto con las demas apps.
              </p>
              <ShowContent urlBackend={this.state.urlBackend}/>
            </div>
        );
  }
}
export default App;
