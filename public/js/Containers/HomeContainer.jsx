// References and useful pages
//https://stackoverflow.com/questions/41216948/this-setstate-is-not-a-function-when-trying-to-save-response-on-state

import React from 'react';
import {render} from 'react-dom';



class HomeContainer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            activeContainer: "#home-container"
        }

    };

    componentWillMount(){

   }

   componentDidMount(){   
        socket.on('new state', function(newState) {
            console.log("new state found");
            //this.setState(newState);

        }.bind(this));
   }

   componentWillUnmount(){
        socket.removeListener('new state');
   }

    render(){
        return(
            <div id="home-container" className="home-container">
                {(this.props.user && (this.props.user.type == "user")) &&
                <div id="welcome-message">
                    
                    Welcome {this.props.user.username} 
                    
                </div>
                }
                <div className="home-logo-div container">
                    <h3 className="home-text" >Vote Tracker</h3>
                <h5 className="home-text" >Free Code Camp - Build a Voting Application<span className="fa fa-th-list prefix"></span></h5>
                </div>
            </div>
        )
    }
}


export default HomeContainer;