import React, {Component} from 'react'
import * as constants from '../constants.js'
import {NavBar} from './Common'

import * as uuid from 'uuid'


class Institution extends Component{
    constructor(props) {
        super(props)
    
        this.state = {organizations: {}, 
            newName: '', errorText: '', successText: '',
            organizationRef: this.props.database.ref("/organizations")}
    }

    componentDidMount() {
        this.state.organizationRef.on('value', (snapshot) => {
            
            if (snapshot.val()) {
                this.setState({organizations: snapshot.val(), errorText: ''})   
            } else {
                this.setState({errorText: 'Connection problems'})
            }
        });
        
        this.state.organizationRef.on('child_added', (snapshot) => {
            this.setState({successText: snapshot.val().name + " is added"})
        })
    }
    
    handleNameChange = (e) => {
        this.setState({newName: e.target.value})
    };
    
    addOrganization = (e) => {
        if (!this.state.newName) {
            this.setState({errorText: 'Please write name'});
            return;
        }

        let key = uuid.v4();
        this.props.database.ref(`/organizations/${key}`).set({
            name: this.state.newName
        });

        this.setState({newName: '', errorText: ''})
    };

    render() {
        
        let rows = [];

        Object.keys(this.state.organizations).forEach((key, index) => {
            rows.push(
                <tr key={key}>
                    <td>{index}</td>
                    <td>{this.state.organizations[key].name}</td>
                    <td>{key}</td>
                </tr>
            )
        });
        
        
        return (
            <div className="container">
                <NavBar userData={this.props.userData} restart={this.props.restart}/>

                <div className="jumbotron">
                    <h1>{this.props.userData.login}</h1>
                    <h2>{this.props.userData.uuid}</h2>
                    <h3>Organizations: {Object.keys(this.state.organizations).length}</h3>
                </div>
                
                
                {this.state.successText && <div className="alert alert-success">{this.state.successText}</div>}
                <br/>
                {this.state.errorText && <div className="alert alert-danger">{this.state.errorText}</div>}
                <div className="input-group">
                    <input value={this.state.newName} onChange={this.handleNameChange} name="newName" placeholder="Enter new org name" type="text" className="form-control"/>
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button" onClick={this.addOrganization}>Add</button>
                    </span>
                </div>
                
                <br/>

                {this.state.organizations.length === 0 ? 
                    <div className="alert alert-info">No organizations in base. Or still loading</div> : (
                        <table className="table table-responsive">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>UUID</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rows}
                            </tbody>
                        </table>
                    )}
                
                

            </div>


        )
    }
}

export default Institution