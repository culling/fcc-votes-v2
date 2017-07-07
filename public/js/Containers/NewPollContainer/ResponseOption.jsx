import React from 'react';
import {render} from 'react-dom';

class ResponseOption extends React.Component{
    render(){
        return (
            <div className="input-field">
                <input type="text" disabled="disabled" className="col s10 m4" value={this.props.responseOption} ></input>
                <span className="input-group-btn col s2 m2">
                    <button type="button" onClick={this.props.onClick} className="btn btn-info">-</button> 
                </span>
            </div>
        )
    }
}

export default ResponseOption;