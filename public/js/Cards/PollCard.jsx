import React from 'react';
import {render} from 'react-dom';

//D3
import * as d3 from 'd3';

//Components
import ResponseOptionComponent from './PollCard/ResponseOptionComponent.jsx';
import VoteGraph from './PollCard/VoteGraph.jsx';

class PollCard extends React.Component{
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

    _deletePoll(){
        let poll     = Object.assign( this.props.poll);
        jQuery.ajax({
            type: 'DELETE',
            dataType: 'json',
            url:("/api/poll/" + this.props.poll._id),
            data: JSON.stringify({ poll }),
            success:(
                //window.location="/"
                console.log("success - deleted")
            )
        });
    }

    _voteNow (responseOption, username){
        var poll = Object.assign(this.props.poll); 
        
        poll.votes = poll.votes.filter(function(vote){
            return vote.username != username
        });

        poll.votes.push({username:username, voteChoice: responseOption.responseOption});
        this.setState({poll: poll});

        jQuery.ajax({
            type: 'POST',  
            dataType: "text",
            contentType : "application/json",
            url:"/api/poll/update",
            data: JSON.stringify( poll ),
            success: function(){
                console.log("voted successfully");
            }
        });
    }

    _newResponseOption(){
        let poll     = Object.assign( this.props.poll);
        poll.responseOptions.push(this.newResponseOption.value);
        jQuery.ajax({
            type: 'POST',  
            dataType: "text",
            contentType : "application/json",
            url:"/api/poll/update",
            data: JSON.stringify( poll ),
            success:(
                    this.newResponseOption.value = ""
            )
        });
        this.forceUpdate();
    }



    render(){
        return(
            <div className="poll-card">
                <div className="card-part" id="my-graph">
                    {/* Graph */}
                    {this.props.poll.votes.length > 0 && 
                        <VoteGraph poll={this.props.poll}  />
                    }
                    <br />
                    <span className="card-title" style={{color: "black"}}>
                        {this.props.poll.meeting &&
                         this.props.poll.meeting +" - "+ this.props.poll.question} 

                        {(this.props.poll.meeting != true) &&
                        this.props.poll.question} 
                    </span>
                </div>


                {/* Vote Options */}
                <div className="card-part">
                    <ul>
                        <div> {this.props.poll.responseOptions.map( (responseOption, i)=> 
                            <ResponseOptionComponent key={i} 
                            responseOption={responseOption}
                            onClick = { ()=> this._voteNow({responseOption}, this.props.user.username )}
                            poll={this.props.poll} /> )} 
                        </div>


                        {/*New Response Option*/}
                        {this.props.user &&
                        <div>
                            {/*<label className="new-response">New Response Option</label>*/}
                            <div className="input-group">                        
                                <input type="text" name="newResponseOption" className="form-control" defaultValue="" placeholder="New Response Option" 
                                ref={(input)=> this.newResponseOption = input} 
                                ></input>
                                <span className="input-group-btn">
                                    <button className="btn btn-block btn-primary" onClick={this._newResponseOption.bind(this)}>Save</button>
                                </span>
                            </div>
                        </div>
                        }
                    </ul>
                </div>


                {/* Warning for No Votes */}
                {this.props.poll.votes.length == 0 && 
                    <b> No votes taken yet </b>
                }


                {/* Votes History */}
                {/*((this.props.poll.votes.length > 0) && this.props.user._id ) &&*/ 
                <div className="card-part">
                    <h4> Votes </h4>
                    <ul> {d3.nest()
                        .key(function(d) { return d.voteChoice; })
                        .rollup(function(v) { return v.length; })
                        .entries(this.props.poll.votes).map( (voteTotal, i ) => 
                        <li key={i }>
                            {voteTotal.key} : {voteTotal.value} 
                        </li>) }
                    </ul>

                </div>
                }






                <div className="card-part">
                    {/*Details Button*/}
                    <button className="vote-question btn btn-block" onClick={this._showDetailsPane.bind(this)}> 
                        {this.props.poll.meeting &&
                         this.props.poll.meeting +" - "+ this.props.poll.question} 

                        {(this.props.poll.meeting != true) &&
                        this.props.poll.question} 
                    </button>

                    <div className={this.state.detailsState}>
                        <div>Question ID: {this.props.poll._id} </div>
                        <div>Meeting: {this.props.poll.meeting} </div>
                        <div>Poll Created On: {this.props.poll.created} </div>
                        <div>Poll Created By: {this.props.poll.owner} </div>
                        {(this.props.user.username == this.props.poll.owner) &&
                            <button className="btn btn-danger" onClick={this._deletePoll.bind(this)}> DELETE THE POLL </button>
                        }
                    </div>
                </div> 


                
            </div>
        )
    }

};




export default PollCard;