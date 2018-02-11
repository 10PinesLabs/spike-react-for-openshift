import React, {Component} from 'react';

export default class Refresh extends Component {
    render() {
        return (
            <div className="refresh">
                <a className="refresh-btn" onClick={() => this.props.onClick()}>Obtener valores del Backend</a>
                <p>Actualizamos <span className="title">{this.props.timesRefreshed}</span> veces</p>
            </div>
        );
    }
}