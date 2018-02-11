import React, {Component} from 'react';
import Property from './Property'

export default class Properties extends Component {
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