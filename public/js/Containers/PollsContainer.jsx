// References and useful pages
//https://stackoverflow.com/questions/41216948/this-setstate-is-not-a-function-when-trying-to-save-response-on-state

import React from 'react';
import {render} from 'react-dom';

//Cards
import PollCard from './../Cards/PollCard.jsx';

class PollsContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            polls: []
        }

    };

    componentWillMount(){
        //Polls
        jQuery.ajax({
            method: 'GET',
            url:"/api/poll",
            success: (polls)=>{
                this.setState({ polls: polls });
                console.log(polls);
            },
            contentType : "application/json",
            dataType: "JSON"
        });
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
            <div id="polls-container" className="polls-container">
                <b>Polls </b>
                {(this.state.polls.length > 0) &&
                <div>
                    {this.state.polls.map((poll, i)=> {
                        return(
                            <div key={i}>
                                <PollCard key={i} poll={poll} user={this.props.user}  detailsState="details-div-hidden"/>
                            </div>
                        )
                    } )}
                </div>
                }
            </div>
        )
    }
}


export default PollsContainer;