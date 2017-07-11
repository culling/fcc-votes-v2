'use strict';

import React from 'react';
import {render} from 'react-dom';

class SharePanel extends React.Component{
    constructor(props){
        super(props);
        
    };

    render(){
        return(
            <div className="share-panel">
            {/*Share It*/}
            
                <div className="button-bar ">
                    <a href={"https://twitter.com/intent/tweet?url=" + 
                        "http://" + window.location.host +
                        "/?pollId="+this.props.poll._id + 
                        "&amp;text=" + this.props.poll.question 
                        } className="btn btn-block">
                        
                        <i className="fa fa-twitter"></i> 
                        Share on Twitter
                    </a>
                </div>
                
            </div>
        )
    }
}

export default SharePanel