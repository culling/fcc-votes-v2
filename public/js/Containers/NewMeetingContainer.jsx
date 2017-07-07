import React from 'react';
import {render} from 'react-dom';

class NewMeetingContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }

    }

    componentWillMount(){
        jQuery( document ).ready(function(){
            jQuery('.modal').modal();
        });
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
        var userMessage = {user:  this.props.user,
            message: "New user created"
        };
        
        var formDataSerializedArray = jQuery("#NewMeetingForm").serializeArray();
        var formDataObject = this._objectifyForm(formDataSerializedArray);
        formDataObject.responseOptions = [];
        //formDataObject.owner = this.props.user._id;
        jQuery("#name")
            .val("");
        
        //console.log(this.state.newMeeting);

        
        //console.log(JSON.stringify( formDataObject ));
        jQuery.ajax({
            type: "POST",
            url: "/api/meeting",
            data: JSON.stringify(formDataObject ),
            success: function(){
                console.log("Success");
                //_this._getUser();
                //_this._sendUserMessage(userMessage);
            },
            dataType: "text",
            contentType : "application/json"
        });
    }





    render(){
        return(
            <div id="newMeeting-container" >
                <form id="NewMeetingForm">
                <div className="modal-content">
                    <h4>New meeting</h4>



                        <div className="input-field">
                            <i className="material-icons prefix"> </i>
                            <input type="text" name="name" id="name" required/>
                            <label htmlFor="name">Name</label>
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




export default NewMeetingContainer;
