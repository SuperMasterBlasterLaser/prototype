import React, {Component} from 'react'
import * as constants from '../constants.js'

function LoginHeader(props) {
    let text = "Login as user";
    let glyph = "glyphicon glyphicon-user";
    if (props.type === constants.ROLE_INSTITUTION) {
        text = "Login as Institution";
        glyph = "glyphicon glyphicon-qrcode"
    }
        
    else if (props.type === constants.ROLE_ORGANIZATION){
        text = "Login as Organization";
        glyph = "glyphicon glyphicon-qrcode"
    }
        
    else if (props.type === constants.ROLE_USER){
        text = "Login as User";
        glyph = "glyphicon glyphicon-qrcode"
    }
        
    return (
        <div className="panel-heading">
            <h3 className="panel-title pull-left">
                <span className={glyph}></span>{text}    
            </h3>
            <button className="btn btn-default pull-right" onClick={() => {props.restart()}}>Reselect role</button>
            <div className="clearfix"></div>
        </div>
    )    
}   

function CenterContainerPanel(props) {
    return (
        <div className="container">
            <div className="row row-centered">
                <div className="col-xs-8 col-centered">

                    <div className="panel panel-default">
                        
                        {props.children}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}


class InstitutionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {errorText: "", login: "", password: ""}
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    
    login = (e) => {
        e.preventDefault();
        if (!this.state.login) {
            this.setState({errorText: 'Enter login'});
            return;
        }

        if (!this.state.password) {
            this.setState({errorText: 'Enter password'})
        }

        this.props.database.ref(`/institutions/${this.state.login}`).once('value').then((snapshot) => {
            let result = snapshot.val();

            if (!result || result.password !== this.state.password) {
                this.setState({errorText: 'Wrong login or password'});
                return;
            }

            result.login = this.state.login;

            this.props.loggedIn(result);
        })
    };
    
    render() {
        return (
            <form onSubmit={this.login}>
                {this.state.errorText && <div className="alert alert-danger">{this.state.errorText}</div>}

                <label htmlFor="login">Login:</label>
                <input id="login" type="text" name="login" className="form-control"
                       value={this.state.login} onChange={this.handleInputChange}/>

                <label htmlFor="password">Password:</label>
                <input id="password" type="password" name="password" className="form-control"
                       value={this.state.password} onChange={this.handleInputChange}/>

                <br/>
                <input type="submit" className="btn btn-primary" value="Login"/>
            </form>
        )
    }
}


class OrganizationForm extends Component{
    constructor(props) {
        super(props);
        this.state = {errorText: '', uuid: ''}
    }

    handleInputChange = (e) => {
        this.setState({
            uuid: e.target.value
        })
    };
    
    login = (e) => {
        e.preventDefault();
        
        if (this.state.uuid.length === 0) {
            this.setState({errorText: 'Enter uuid'});
            return;
        }

        this.props.database.ref(`/organizations/${this.state.uuid}`).once('value').then((snapshot) => {
            let result = snapshot.val();

            if (!result) {
                this.setState({errorText: 'Wrong UUID'});
                return;
            }

            result.uuid = this.state.uuid;

            this.props.loggedIn(result);
        })
    };
    
    render() {
        return (
            <form onSubmit={this.login}>
                {this.state.errorText && <div className="alert alert-danger">{this.state.errorText}</div>}

                <label htmlFor="login">UUID:</label>
                <input id="uuid" type="text" name="uuid" className="form-control"
                       value={this.state.uuid} onChange={this.handleInputChange}/>
                <br/>
                <input type="submit" className="btn btn-primary" value="Login"/>
            </form>
        )
    }
}

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {errorText: '', uuid: ''}
    }

    handleInputChange = (e) => {
        this.setState({
            uuid: e.target.value
        })
    };

    login = (e) => {
        e.preventDefault();

        if (this.state.uuid.length === 0) {
            this.setState({errorText: 'Enter uuid'});
            return;
        }
        
        this.props.database.ref(`/users/${this.state.uuid}`).once('value').then((snapshot)=> {
            let result = snapshot.val();
            
            result.uuid = this.state.uuid;
            
            this.props.loggedIn(result);
        });
    };

    render() {
        return (
            <form onSubmit={this.login}>
                {this.state.errorText && <div className="alert alert-danger">{this.state.errorText}</div>}

                <label htmlFor="login">UUID:</label>
                <input id="uuid" type="text" name="uuid" className="form-control"
                       value={this.state.uuid} onChange={this.handleInputChange}/>
                <br/>
                <input type="submit" className="btn btn-primary" value="Login"/>
            </form>
        )
    }
}

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {errorText: "", login: "", password: ""}
    }
    
    
    
    render() {
        
        let form = <div className="alert alert-danger">Not implemented</div>;
        
        if (this.props.role === constants.ROLE_INSTITUTION) 
            form = <InstitutionForm database={this.props.database} loggedIn={this.props.loggedIn}/>;
        else if (this.props.role === constants.ROLE_ORGANIZATION)
            form = <OrganizationForm database={this.props.database} loggedIn={this.props.loggedIn}/>;
        else if (this.props.role === constants.ROLE_USER)
            form = <UserForm database={this.props.database} loggedIn={this.props.loggedIn}/>;
        
        return (
            <CenterContainerPanel>
                <LoginHeader type={this.props.role} restart={this.props.restart}/>
                <div className="panel-body">
                    {form}
                </div>
            </CenterContainerPanel>
        )
        
    }
}

export default Login