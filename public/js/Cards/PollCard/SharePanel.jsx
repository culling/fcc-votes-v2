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
                <a href={"/?pollId=" + this.props.poll._id }>Direct Link</a>

            </div>
        )
    }
}

export default SharePanel