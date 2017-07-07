import React from 'react';
import {render} from 'react-dom';


class MeetingCard extends React.Component{
    constructor (props){
        super(props);
        this.state = ({
            detailsState: props.detailsState
        });
    };

    _showDetailsPane(){
        let detailsState = ((this.state.detailsState === "details-div-visible" )? "details-div-hidden": "details-div-visible");
        this.setState({detailsState: detailsState });
    }

    _deleteMeeting(){
        let meeting     = Object.assign( this.props.meeting);
        jQuery.ajax({
            type: 'DELETE',
            dataType: 'json',
            url:("/api/meeting/" + this.props.meeting._id),
            data: JSON.stringify({ meeting }),
            success:(
                //window.location="/"
                console.log("success - deleted")
            )
        });
    }



    render(){
        return(
            <div className="meeting-card card">

                <div className="card-part">
                    {/*Details Button*/}
                    <button className="vote-question btn btn-block" onClick={this._showDetailsPane.bind(this)}> 
                        {this.props.meeting.name &&
                         this.props.meeting.name} 
                    </button>

                    <div className={this.state.detailsState}>
                        <div>Meeting ID: {this.props.meeting._id} </div>
                        <div>Meeting: {this.props.meeting.name} </div>
                        <div>Meeting Created On: {this.props.meeting.created} </div>
                        <div>Meeting Created By: {this.props.meeting.owner} </div>
                        {(this.props.user.username == this.props.meeting.owner) &&
                            <button className="btn btn-danger" onClick={this._deleteMeeting.bind(this)}> DELETE THE POLL </button>
                        }
                    </div>
                </div> 


                
            </div>
        )
    }

};




export default MeetingCard;