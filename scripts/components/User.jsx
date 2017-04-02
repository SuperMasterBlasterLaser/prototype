import React, {Component} from 'react'
import * as constants from '../constants.js'
import {NavBar, Certificates} from './Common'


class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            certificates: {},
            errorText: '',
            usersRef: this.props.database.ref(`/users/${this.props.userData.uuid}`)
        }
    }

    componentDidMount() {
        this.state.usersRef.child('certificates').on('value', (snapshot) => {
            if (snapshot.val()) {
                this.setState({certificates: snapshot.val(), errorText: ''})
            } else {
                this.setState({errorText: 'Connection problems'})
            }
        });

        this.state.usersRef.child('certificates').on('child_added', (snapshot) => {
            this.setState({successText: snapshot.val().name + " is added"})
        });
    }
    
    render() {
        return (
            <div className="container">
                <NavBar userData={this.props.userData} restart={this.props.restart}/>
                <div className="jumbotron">
                    <h1>{this.props.userData.name}</h1>
                    <h2>{this.props.userData.uuid}</h2>
                    <h3>Certificates: {Object.keys(this.state.certificates).length}</h3>
                </div>

                {this.state.successText && <div className="alert alert-success">{this.state.successText}</div>}
                <br/>
                {this.state.errorText && <div className="alert alert-danger">{this.state.errorText}</div>}
                

                <h3 className="page-header">Certificates</h3>
                <Certificates isOrg={false} certificates={this.state.certificates}/>
            </div>
        )
    }
}

export default User