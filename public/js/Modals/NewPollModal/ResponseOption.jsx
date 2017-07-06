import React from 'react';
import {render} from 'react-dom';

class ResponseOption extends React.Component{
    render(){
        return (
            <div className="row input-group">
                
                <input type="text" disabled="disabled" className="form-control" value={this.props.responseOption} ></input>
                    <span className="input-group-btn">
                        <button type="button" onClick={this.props.onClick} className="btn btn-info">-</button> 
                    </span>
            </div>
        )
    }
}

export default ResponseOption;