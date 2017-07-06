import React from 'react';
import {render} from 'react-dom';



class ResponseOptionComponent extends React.Component{
    render(){
        return(
            <div className="responseOption">

                { (this.props.poll.votingOpen == true) && 
                        <button type="button" className="btn btn-block btn-primary response-option" onClick={this.props.onClick } > {this.props.responseOption} </button>
                }
            </div>
        )
    }
}

export default ResponseOptionComponent;