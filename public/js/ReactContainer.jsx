// References and useful pages
//https://stackoverflow.com/questions/41216948/this-setstate-is-not-a-function-when-trying-to-save-response-on-state

import React from 'react';
import {render} from 'react-dom';

//Navbars
import PrimaryNavbar    from './Navbars/PrimaryNavbar.jsx';

//Containers
import HomeContainer    from "./Containers/HomeContainer.jsx";
import ProfileContainer from "./Containers/ProfileContainer.jsx";
import PollsContainer   from "./Containers/PollsContainer.jsx";
import MeetingsContainer   from "./Containers/MeetingsContainer.jsx";
import NewMeetingContainer from "./Containers/NewMeetingContainer.jsx";


//Modals
import NewUserModal     from "./Modals/NewUserModal.jsx";
import LoginUserModal   from "./Modals/LoginUserModal.jsx";
import NewPollModal     from "./Modals/NewPollModal.jsx";

class ReactContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            activeContainer: "#home-container",
            containerIds:[
                "#home-container",
                "#profile-container",
                "#polls-container",
                "#newPoll-modal",
                "#meetings-container"
            ],
            meetings: []

        }
        //Binding to this for functions
        this._setActiveContainer = this._setActiveContainer.bind(this);
        this._getUser            = this._getUser.bind(this);
        this._getPolls          = this._getPolls.bind(this);
        this._getMeetings       = this._getMeetings.bind(this);
        
    };

    componentWillMount(){
        this._getUser.bind(this);
        this._getUser();

        this._getMeetings.bind(this);
        this._getMeetings();

        this._getPolls.bind(this);
        this._getPolls();
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

    _getUser(){
        //User
        jQuery.ajax({
            method: 'GET',
            url:"/api/user",
            success: (user)=>{
                this.setState({ user: user });
                //console.log(user);
            },
            contentType : "application/json",
            dataType: "JSON"
        });
    };

    _getMeetings(){
        jQuery.ajax({
            method: 'GET',
            url:"/api/meeting",
            success: (meetings)=>{
                this.setState({ meetings: meetings });
                //console.log(meetings);
            },
            contentType : "application/json",
            dataType: "JSON"
        });
    };

    _getPolls(){
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
    };

    _setActiveContainer(newActiveContainerId){
        console.log("Active Container ID changed");
        //Show active container
        jQuery(newActiveContainerId)
            .attr("class", "div-visible");
        
        this.setState({activeContainer: newActiveContainerId});
        //console.log(this.state.activeContainer);
    }


    render(){
        return(
            <div>
                <header>
                <b></b>
                <PrimaryNavbar user={this.state.user} setActiveContainer={  this._setActiveContainer.bind(this) } />
                    {this.state.user &&
                        <div>
                            <b>Current User {this.state.user.username}</b>
                        </div>
                    }
                </header>

                    <NewUserModal />
                    <LoginUserModal getUser={ this._getUser.bind(this) } />
                    <NewPollModal   meetings={this.state.meetings} />
                    


                    {(this.state.activeContainer === "#home-container")&&
                    <HomeContainer          user={this.state.user} twitterUser={this.state.twitterUser} />
                    }
                    {(this.state.activeContainer === "#profile-container")&&
                    <ProfileContainer       user={this.state.user} getUser={ this._getUser.bind(this) } />
                    }

                    {(this.state.activeContainer === "#meetings-container")&&
                    <div id="meetings-container" >
                        <MeetingsContainer     user={this.state.user}  />
                    </div>
                    }

                    {(this.state.activeContainer === "#polls-container")&&
                    <div id="polls-container" >
                        <PollsContainer     user={this.state.user} filterUser={{username:null, type:"all"}} />
                    </div>
                    }

                    
                    
                    {(this.state.activeContainer === "#newMeeting-container")&&
                    <div id="newMeeting-container" >
                            <NewMeetingContainer />
                    </div>
                    }

            </div>
        )
    }

}


render(<ReactContainer />, document.getElementById('react-container'));