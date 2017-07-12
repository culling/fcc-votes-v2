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
        let _this = this;
        let meeting     = Object.assign( this.props.meeting);
        let thisMeetingCardId = "#meeting-card-"+ this.props.meeting._id;
        console.log(thisMeetingCardId);
        jQuery.ajax({
            type: 'DELETE',
            url:("/api/meeting/" + this.props.meeting._id),
            data: JSON.stringify({ meeting }),
            success:function (){
                console.log("success - deleted");
                _this.props.getMeetings();
                jQuery(thisMeetingCardId)
                    .attr("class", "div-hidden");
            },
            dataType: "text",
            contentType : "application/json"
        });
    }



    render(){
        return(
            <div id={"meeting-card-" + this.props.meeting._id}>
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
                        {((this.props.meeting.owner)&& (this.props.meeting.owner.username)) &&
                            <div>Meeting Created By: {this.props.meeting.owner.username} </div>
                        }

                        {(this.props.user.username && this.props.meeting.owner && (this.props.user.username == this.props.meeting.owner.username) )&& 
                            <button className="btn btn-danger" onClick={this._deleteMeeting.bind(this)}> DELETE THE MEETING </button>
                        }
                    </div>
                </div> 


                
            </div>
            </div>
        )
    }

};




export default MeetingCard;