import React, {Component} from 'react';

export default class Property extends Component {
    render() {
        return (
            <div className="property">
                <span className="title">{this.props.title}: </span>
                <span className="value">{this.props.value}</span>
            </div>
        );
    }
}