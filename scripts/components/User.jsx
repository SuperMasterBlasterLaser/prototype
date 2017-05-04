import React, {Component} from 'react'
import * as constants from '../constants.js'
import {NavBar, Certificates} from './Common'


class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            certificates: {},
            pending_certificates: {},
            errorText: '',
            certName: '',
            // receiverUUID:,
            usersRef: this.props.database.ref(`/users/${this.props.userData.uuid}`)
        }
    }

    // sendCertificate(){
    //     this.props.database.ref(`/certificates`).orderByChild(`user`).equalTo(`${this.props.userData.uuid}`).on('value', (snapshot) => {
    //         if (snapshot.val()) {
    //             this.setState({certificates: snapshot.val(), errorText: ''})
    //         } else {
    //             this.setState({errorText: 'No accepted certificates'})
    //         }
    //     });
    //    
    // }
    componentDidMount() {
        this.props.database.ref(`/certificates`).orderByChild(`user`).equalTo(`${this.props.userData.uuid}`).on('value', (snapshot) => {
            if (snapshot.val()) {
                this.setState({certificates: snapshot.val(), errorText: ''})
            } else {
                this.setState({errorText: 'No accepted certificates'})
            }
        });

        this.props.database.ref(`/pending_certificates`).orderByChild(`user`).equalTo(`${this.props.userData.uuid}`).on('value', (snapshot) => {
            if (snapshot.val()) {
                this.setState({pending_certificates: snapshot.val(), errorText: ''})
            }
        });


        this.state.usersRef.child('certificates').on('child_added', (snapshot) => {
            this.setState({successText: snapshot.val().name + " is added"})
        });
    }
    
    render() {
        return (
        <div>
            <NavBar userData={this.props.userData} restart={this.props.restart}/>
            <header>
                <div className="container lower">
                    <h2>{this.props.userData.name}</h2>
                    <h3>{this.props.userData.uuid}</h3>
                    <h4>Pending Certificates: {Object.keys(this.state.pending_certificates).length}</h4>
                    <h5>Certificates: {Object.keys(this.state.certificates).length}</h5>

                    {this.state.successText && <div className="alert alert-success">{this.state.successText}</div>}
                    <br/>
                    {this.state.errorText && <div className="alert alert-danger">{this.state.errorText}</div>}

                    <h3 className="page-header">Pending Certificates</h3>
                    <Certificates isOrg={false} isPending={true} database={this.props.database} certificates={this.state.pending_certificates} mount={this.componentDidMount}/>

                    <h3 className="page-header">Accepted Certificates</h3>
                    <Certificates isOrg={false} isPending={false} certificates={this.state.certificates}/>
                </div>
            </header>
            
        </div>
            
        )
    }
}

export default User