// /login/twitter

import React from 'react';
import {render} from 'react-dom';

class PrimaryNavbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activeContainerId: "initial"
        }
    }

    componentWillMount(){
        jQuery( document ).ready(function(){
            jQuery(".button-collapse").sideNav();
        });
        //this._showContainer("#home-container");
    }

    _showContainer(newActiveContainerId){
            this.props.setActiveContainer(newActiveContainerId);
    }

    _homeClicked(){
        console.log("Home Clicked");
        this._showContainer("#home-container");
        //this._showContainer("#allBoard-container");
    }


    _profileClicked(){
        console.log("profile Clicked");
        this._showContainer("#profile-container");
    }

    _loginClicked(){
        console.log("login Clicked");
        jQuery('#login-user-modal').modal('open');
        //this._hideAllContainers();
    };

    _signupClicked(){
        console.log("login Clicked");
        jQuery('#new-user-modal').modal('open');
        //this._hideAllContainers();
    };


    _newPollClicked(){
        console.log("new Poll Clicked");
        jQuery('#new-poll-modal').modal('open');
        //this._hideAllContainers();
    };


    _logoutClicked(){
        console.log("logout Clicked");
    }

    _pollsClicked(){
        console.log("Polls Clicked");
        this._showContainer("#polls-container");
    }



    render(){
        return(
            <div>
                <nav>
                    <div className="nav-wrapper" >
                        <a href="#" data-activates="mobile-menu" className="button-collapse"><i className="material-icons">menu</i></a>
                        <ul className="right hide-on-med-and-down">
                            <li  onClick={ this._homeClicked.bind(this)}><a >Home</a></li>
                            {(this.props.user && this.props.user.username) && <li  onClick={ this._profileClicked.bind(this)}><a >Profile</a></li>}
                            <li  onClick={ this._newPollClicked.bind(this)}><a href="#" >New Poll</a></li>

                            <li  onClick={ this._pollsClicked.bind(this)}><a >Polls</a></li>                            {/*<li  onClick={ this._allBoardClicked.bind(this)}><a >All Board</a></li>*/}

                            {( (this.props.user)&& (this.props.user.type) && (this.props.user.type!= "user" ) ) && <li  onClick={ this._loginClicked.bind(this)}><a href="#" >Log In</a></li>}
                            {( (this.props.user)&& (this.props.user.type) && (this.props.user.type!= "user" ) ) && <li  onClick={ this._signupClicked.bind(this)}><a href="#">Sign Up</a></li>}

                            {(this.props.user && this.props.user.username) && <li  onClick={ this._logoutClicked.bind(this)}><a href="/logout">Log Out</a></li>}

                        </ul>
                        <ul className="side-nav" id="mobile-menu">
                            <li  onClick={ this._homeClicked.bind(this)}><a >Home</a></li>
                            {(this.props.user && this.props.user.username) && <li  onClick={ this._profileClicked.bind(this)}><a >Profile</a></li>}
                            <li  onClick={ this._pollsClicked.bind(this)}><a >Polls</a></li>                            {/*<li  onClick={ this._allBoardClicked.bind(this)}><a >All Board</a></li>*/}

                            {( (this.props.user)&& (this.props.user.type) && (this.props.user.type!= "user" ) ) && <li  onClick={ this._loginClicked.bind(this)}><a href="#" >Log In</a></li>}
                            {( (this.props.user)&& (this.props.user.type) && (this.props.user.type!= "user" ) ) && <li  onClick={ this._signupClicked.bind(this)}><a href="#">Sign Up</a></li>}

                            {(this.props.user && this.props.user.username) && <li  onClick={ this._logoutClicked.bind(this)}><a href="/logout">Log Out</a></li>}

                        </ul>
                    </div>
                </nav>

            </div>
        )
    }
}

export default PrimaryNavbar;

