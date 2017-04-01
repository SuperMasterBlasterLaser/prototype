import React, {Component} from 'react'
import * as constants from '../constants.js'

class RoleChooser extends Component{

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="container">
                <div className="row row-centered">
                    <div className="col-xs-8 col-centered">

                        <div className="panel panel-default">
                            <div className="panel-heading">Choose the role</div>
                            <div className="panel-body">
                                <div className="btn-group btn-group-lg btn-group-justified" role="group">
                                    <a href="#" role="button" type="button" className="btn btn-default" onClick={() => {this.props.roleChosen(constants.ROLE_INSTITUTION)}}>
                                        <span className="glyphicon glyphicon-qrcode"></span> Institution
                                    </a>
                                    <a href="#" role="button" type="button" className="btn btn-default" value={constants.ROLE_ORGANIZATION} onClick={() => {this.props.roleChosen(constants.ROLE_ORGANIZATION)}}>
                                        <span className="glyphicon glyphicon-btc"></span> Organization
                                    </a>
                                    <a href="#" role="button" type="button" className="btn btn-default" value={constants.ROLE_USER} onClick={() => {this.props.roleChosen(constants.ROLE_USER)}}>
                                        <span className="glyphicon glyphicon-user"></span> User
                                    </a>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
            
            
        )
    }


}

export default RoleChooser