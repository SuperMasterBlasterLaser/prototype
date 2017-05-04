import React, {Component} from 'react'
import * as constants from '../constants.js'
import {NavBar, Certificates} from './Common'
import * as UUID from 'uuid'
import * as sha256 from 'js-sha256'



class Academic extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            certificates: {},
            pending_certificates: {},
            errorText: '', successText: '', userUUID: '', newCertName: '',  newFileName: '',
            organizationRef: this.props.database.ref(`/academics/${this.props.userData.uuid}`),
            usersRef: this.props.database.ref('/users')
        }
    }

    componentDidMount() {
        this.props.database.ref(`/certificates`).orderByChild(`organization`).equalTo(`${this.props.userData.uuid}`).on('value', (snapshot) => {
            if (snapshot.val()) {
                this.setState({certificates: snapshot.val(), errorText: ''})
            } else {
                this.setState({errorText: 'Connection problems'})
            }
        });

        this.props.database.ref(`/pending_certificates`).orderByChild(`organization`).equalTo(`${this.props.userData.uuid}`).on('value', (snapshot) => {
            if (snapshot.val()) {
                this.setState({pending_certificates: snapshot.val(), errorText: ''})
            }
        });

        this.state.organizationRef.child('certificates').on('child_added', (snapshot) => {
            this.setState({successText: snapshot.val().name + " is added"})
        });
    }
    
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    
    addNewCert = () => {
        if (this.state.newCertName.length == 0) {
            this.setState({errorText: 'Enter Cert Name'});
            return;
        }
        
        if (this.state.userUUID.length == 0) {
            this.setState({errorText: 'Enter user UUID'});
            return;
        }
        
        this.state.usersRef.child(this.state.userUUID).once('value').then((snapshot) => {
            let user = snapshot.val();
            if (!user) {
                this.setState({errorText: `User with ${this.state.userUUID} does not exist!`});
                return;
            }
            
            let username = user.name;
            let date = (new Date()).toISOString();
            let uuid = UUID.v4();
            let sha = sha256.sha256(`${this.props.userData.uuid}_${uuid}`);

            this.props.database.ref(`/pending_certificates/${uuid}`).set({
                organization: this.props.userData.uuid,
                user: this.state.userUUID,
                date: date,
                name: this.state.newCertName,
                sha: sha,
                filename: this.state.newFileName
            });

            this.setState({newCertName: '', errorText: '', userUUID: '', newFileName: ''})
        });
    };
     
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

                <div className="row">
                    <div className="col-xs-12">
                        <div className="form-inline">
                            <div className="form-group">
                                <label className="sr-only" htmlFor="userUUID">userUUID</label>
                                <input id="userUUID" value={this.state.userUUID} onChange={this.handleInputChange} name="userUUID" placeholder="User UUID" type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label className="sr-only" htmlFor="newCertName">newCertName</label>
                                <input value={this.state.newCertName} onChange={this.handleInputChange} name="newCertName" placeholder="Certificate Name" type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label className="sr-only" htmlFor="newFileName">newFileName</label>
                                <input value={this.state.newFileName} onChange={this.handleInputChange} name="newFileName" placeholder="File Name" type="file" className="form-control"/>
                            </div>
                            <button className="btn btn-default" type="button" onClick={this.addNewCert}>Add</button>
                        </div>
                    </div>
                </div>
                    
                
                
                <h3 className="page-header">Accepted Certificates</h3>
                <Certificates isOrg={true} certificates={this.state.certificates}/>

                <h3 className="page-header">Not Accepted Certificates</h3>
                <Certificates isOrg={true} certificates={this.state.pending_certificates}/>
            </div>
        )
    }
}

export default Academic