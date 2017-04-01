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



class Login extends Component {
    constructor(props) {
        super(props)
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
            <CenterContainerPanel>
                <LoginHeader type={this.props.role} restart={this.props.restart}/>
                <div className="panel-body">
                    {
                        this.props.role === constants.ROLE_INSTITUTION ? (
                            
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
                                
                            ): (
                                <div className="alert alert-danger">Only Institution is Available</div>
                            )
                        
                    }
                </div>
            </CenterContainerPanel>
        )
        
    }
}

export default Login