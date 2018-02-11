import React, {Component} from 'react';
import logo from './iconoMiClaro.svg';
import './App.css';
import ShowContent from './ShowContent'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            urlBackend: 'NOT_FOUND'
        };
    }

    refreshBackendURL(){
        fetch("/config").then(
            results => {
                return results.json();
            })
            .then(json => {
                    let serverUrl = json.propertySources[0].source.server_url;
                    console.log("url: ", serverUrl);
                    if (serverUrl && typeof  serverUrl !== 'undefined') {
                        console.log("URL del server: ", serverUrl);
                        this.setState({urlBackend: serverUrl});
                    }
                }
            ).catch((error) => {
            console.log("No se encontró la configuración!");
            console.log(error);
        });
    }

    componentDidMount() {
        this.refreshBackendURL();
    }

    handleClick(){
        this.refreshBackendURL();
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

                <div className="content center">
                    <p>
                        Obtenemos la la URL del backend invocando /config
                        y el resultado es: <span><b>{this.state.urlBackend}</b></span>
                    </p>
                    <a className="refresh-btn" onClick={() => this.handleClick()}>Refrescar configuracion</a>
                </div>

                <ShowContent urlBackend={this.state.urlBackend}/>
            </div>
        );
    }
}
