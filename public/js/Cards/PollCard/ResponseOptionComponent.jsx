import React from 'react';
import {render} from 'react-dom';



class ResponseOptionComponent extends React.Component{
    render(){
        return(
            <div className="response-option">

                { (this.props.poll.votingOpen == true) && 
                        <a href="#" className="response-option" onClick={this.props.onClick } > {this.props.responseOption} </a>
                }
            </div>
        )
    }
}

export default ResponseOptionComponent;