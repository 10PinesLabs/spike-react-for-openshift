import React, {Component} from 'react';
import Refresh from './components/Refresh'
import Properties from './components/Properties'

export default class ShowContent extends Component {
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