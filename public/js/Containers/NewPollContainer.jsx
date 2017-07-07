// /login/twitter

import React from 'react';
import {render} from 'react-dom';

import ResponseOption from './NewPollContainer/ResponseOption.jsx';

class NewPollContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            newPoll: {
                responseOptions: []
            }
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
        
        var formDataSerializedArray = jQuery("#NewPollForm").serializeArray();
        var formDataObject = this._objectifyForm(formDataSerializedArray);
        formDataObject.responseOptions = [];
        //formDataObject.owner = this.props.user._id;
        jQuery("#pollname")
                .add("#question")
                .add("#password")
                .val("");
        
        //console.log(this.state.newPoll);

        this.state.newPoll.responseOptions.map((responseOption) =>{
            formDataObject.responseOptions.push(responseOption);
        } );
        
        //console.log(JSON.stringify( formDataObject ));
        jQuery.ajax({
            type: "POST",
            url: "/api/poll",
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




    render(){
        return(
            <div id="newPoll-container" >
                <form id="NewPollForm">
                <div className="modal-content">
                    <h4>New poll</h4>



                        <div className="input-field">
                            <i className="material-icons prefix"> </i>
                            <input type="text" name="question" id="question" required/>
                            <label htmlFor="question">Question </label>
                        </div>

                        <div className="row">
                            <div className="col s12">
                            <b>Existing Response Options</b>
                                <ul>
                                    <div className="row">
                                    {this.state.newPoll.responseOptions.map((responseOption, i) =>  
                                    <div key={i} >
                                        {/*<i className="material-icons prefix"> </i>*/}
                                        <ResponseOption responseOption={responseOption} onClick={() => this._removeResponseOption(i) } />
                                    </div>
                                    ) }
                                    </div>
                                </ul>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s8">
                                <i className="material-icons prefix"> </i>
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




export default NewPollContainer;
