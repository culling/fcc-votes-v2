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
            polls: [],
            defaultDisplayState: "display-panel-hidden"
        }
    };

    componentWillMount(){
        var _this = this;
        //Polls
        /*
        jQuery.urlParam = function(name){
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (results==null){
            return null;
            }
            else{
            return decodeURI(results[1]) || 0;
            }
        }
        var pollId = jQuery.urlParam('pollId') || undefined;
        */



        jQuery.ajax({
            method: 'GET',
            url:"/api/poll",
            success: (polls)=>{
                var filteredPolls = polls.filter((poll)=>{
                    if (this.props.pollId != undefined ){
                        _this.setState({defaultDisplayState: "display-panel-visible"});
                        return (poll._id == this.props.pollId);
                    };

                    if(_this.props.filterUser.username == null){
                        return true;
                    };

                    if(poll.owner && (poll.owner.username == _this.props.user.username)){
                        return true;
                    };
                    
                });
                this.setState({ polls: filteredPolls });
                console.log(filteredPolls);
                
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
                                <PollCard key={i} poll={poll} user={this.props.user}  detailsState="details-div-hidden" displayState={this.state.defaultDisplayState}/>
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