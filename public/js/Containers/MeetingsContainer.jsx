// References and useful pages
//https://stackoverflow.com/questions/41216948/this-setstate-is-not-a-function-when-trying-to-save-response-on-state

import React from 'react';
import {render} from 'react-dom';

//Cards
import MeetingCard from './../Cards/MeetingCard.jsx';

class MeetingsContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            meetings: []
        }
    };


    componentWillMount(){
        console.log("meetings container");
        //Meetings
        jQuery.ajax({
            method: 'GET',
            url:"/api/meeting",
            success: (meetings)=>{
                this.setState({ meetings: meetings });
                console.log(meetings);
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
            <div id="meetings-container" className="meetings-container">
                <b>Meetings </b>
                {(this.state.meetings.length > 0) &&
                <div>
                    {this.state.meetings.map((meeting, i)=> {
                        return(
                            <MeetingCard key={i} meeting={meeting} user={this.props.user}  detailsState="details-div-visible"/>
                        )
                    } )}
                </div>
                }
            </div>
        )
    }
}


export default MeetingsContainer;