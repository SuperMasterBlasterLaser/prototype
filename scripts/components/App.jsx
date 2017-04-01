import React, {Component} from 'react'
import * as constants from '../constants.js'
import * as firebase from 'firebase';

import RoleChooser from './RoleChooser'
import Login from './Login'
import Institution from './Institution'

const CONDITION_CHOOSE_THE_ROLE = 0;
const CONDITION_LOGIN = 1;
const CONDITION_INSTITUTION = 2;


firebase.initializeApp(constants.FIREBASE_CONFIG);
const database = firebase.database();



class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {condition: CONDITION_CHOOSE_THE_ROLE, role: constants.NO_ROLE, userData: {}}
    }
    
    chooseTheRole = (roleType) => {
        this.setState({condition: CONDITION_LOGIN, role: roleType})
    };
    
    restart = () => {
        this.setState({condition: CONDITION_CHOOSE_THE_ROLE, role: constants.NO_ROLE, userData: {}})
    };
    
    loggedIn = (userData) => {
        this.setState({userData: userData});
        if (this.state.role == constants.ROLE_INSTITUTION)
            this.setState({condition: CONDITION_INSTITUTION});
    };
    
    
    render() {
        
        let template = <h1>Something wrong!</h1>;
        
        if (this.state.condition == CONDITION_CHOOSE_THE_ROLE) {
            template = <RoleChooser roleChosen={this.chooseTheRole} />;
        } 
        
        else if (this.state.condition == CONDITION_LOGIN) {
            template = <Login role={this.state.role} loggedIn={this.loggedIn} restart={this.restart} database={database}/>
        }
        
        else if (this.state.condition == CONDITION_INSTITUTION) {
            template = <Institution restart={this.restart} database={database} userData={this.state.userData}/>
        }
        
        return template;
    }
}

export default App