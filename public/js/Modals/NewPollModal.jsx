// /login/twitter

import React from 'react';
import {render} from 'react-dom';

import ResponseOption from './NewPollModal/ResponseOption.jsx';

class NewPollModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            newPoll: {
                responseOptions: []
            },
            meetings: props.meetings
        }
    }

    componentWillMount(){
        jQuery(document).ready(function() {
            jQuery('.modal').modal();
            jQuery('select').material_select();
        });
        
        //this._getMeeting();
    }

    componentWillReceiveProps(newProps){
        console.log("Component will Receive props fired");
        if(newProps.meetings != this.state.meetings ){
            console.log("there was a change");
            this.setState({meetings: newProps.meetings});
            console.log(this.state.meetings);
            
        }
    }

    _objectifyForm(formArray) {//serialize data function
        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    };

    _sendUserMessage(newStateDiff) {
        //this.sendUserMessageToDB(newStateDiff);
        // 2. put diffs onto the websocket
        this.postToSocket(newStateDiff);
    }

    postToSocket(newStateDiff) {
        console.log("Post to Socket");
        socket.emit('new state', newStateDiff);
    }

    sendUserMessageToDB(newStateDiff) {
        jQuery.ajax({
            type: "POST",
            url: "/api/users/messages",
            data: JSON.stringify( newStateDiff ),
            success: function(){
                console.log("message sent to db");
            },
            dataType: "text",
            contentType : "application/json"
        });        

        console.log(newStateDiff);
        console.log("Save to DB called");
    }
    //End _sendUserMessage

    _submitClicked(){
        console.log("Submit Clicked");

        let _this = this;

        
        var formDataSerializedArray = jQuery("#NewPollForm").serializeArray();
        var formDataObject = this._objectifyForm(formDataSerializedArray);
        formDataObject.responseOptions = [];
        
        if (formDataObject.meeting == null){
            delete formDataObject.meeting
        }
        

        jQuery("#pollname")
                .add("#question")
                .add("#password")
                .val("");
        
        this.state.newPoll.responseOptions.map((responseOption) =>{
            formDataObject.responseOptions.push(responseOption);
        });

        //console.log(formDataObject);
        
        //console.log(JSON.stringify( formDataObject ));
        jQuery.ajax({
            type: "POST",
            url: "/api/poll",
            data: JSON.stringify(formDataObject ),
            success: function(){
                console.log("Success");

            },
            dataType: "text",
            contentType : "application/json"
        });
    }

    /*
    _getMeeting(){
        var _this = this;
        jQuery.ajax({
            method: 'GET',
            url:"/api/meeting",
            success: (meetings)=>{
                var meetingsArray = JSON.parse(meetings);
                console.log(meetingsArray);
                if(meetingsArray.length == 0 ){
                    meetings = {
                        name:"New Meeting",
                        _id: null
                    }
                }
                _this.setState({meetings: meetingsArray });
            }
        });
    }
    */

    _addResponseOption(){ 
        let newPoll = Object.assign( this.state.newPoll);
        console.log('New Response Option Clicked')
        let newResponseOption = this.newResponseOption.value;
        console.log("new Response Option: "+ newResponseOption);
        newPoll.responseOptions.push(newResponseOption);
        this.newResponseOption.value = "";
        //this.forceUpdate();
        this.setState({newPoll: newPoll})
    }

    _removeResponseOption(i){
        let newPoll = Object.assign(this.state.newPoll);
        newPoll.responseOptions.splice(i,1);
        {console.log(newPoll)}
        this.setState({newPoll: newPoll});
        //this.forceUpdate();
    }


    _editMeeting(event){
        console.log("Edit Meeting fired");
        let newPoll     = Object.assign( this.state.newPoll);
        newPoll.meeting = this.meeting.value;
        console.log("edit Meeting: " + newPoll.meeting);
        this.setState({newPoll:newPoll});
    }



    render(){
        return(
            <div id="new-poll-modal" className="modal">
                <form id="NewPollForm"   >
                <div className="modal-content">
                    <h4>New poll</h4>



                   <b>Meeting</b>
                        <div>

                            <select name="meeting" className="input-field" onChange={  this._editMeeting.bind(this)   }
                            ref={(input)=> this.meeting = input } 
                            >
                                <optgroup label="No Meeting">

                                    <option value="none">No Meeting</option>

                                </optgroup>
                                <optgroup label="Existing Meetings">

                                    {this.state.meetings.map((meeting, i) => 
                                        <option key={i} value={meeting._id}>{meeting.name}</option> 
                                    )}

                                </optgroup>

                            </select>
                        </div>


                        <div className="input-field">
                            <input type="text" name="question" id="question" required/>
                            <label htmlFor="question">Question </label>
                        </div>

                        {(this.state.newPoll.responseOptions.length >0) &&
                        <div className="row">
                            <div className="col s12">
                            <b>Existing Response Options</b>
                                <ul>
                                    <div className="row">
                                    {this.state.newPoll.responseOptions.map((responseOption, i) =>  
                                    <span key={i} >
                                        {/*<i className="material-icons prefix"> </i>*/}
                                        <ResponseOption responseOption={responseOption} onClick={() => this._removeResponseOption(i) } />
                                    </span>
                                    ) }
                                    </div>
                                </ul>
                            </div>
                        </div>
                        }


                        <div className="row">
                            <div className="input-field col s8">
                                <input type="text"      id="newResponseOption"      ref={(input) => this.newResponseOption = input }></input>
                                <label htmlFor="newResponseOption" >New Response Option</label>
                            </div>
                                <button type="button"   className="btn btn-info s2" onClick={this._addResponseOption.bind(this)}>+</button>
                        </div>



                </div>
                <div className="modal-footer">
                <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this._submitClicked.bind(this)}>Submit</a>
                <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
                </div>
                </form>
            </div>
        )
    }
}




export default NewPollModal;
