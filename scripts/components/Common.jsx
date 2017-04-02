import React, {Component} from 'react'
import * as constants from '../constants.js'

function NavBar(props) {
    return (
        <div className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand">
                        {props.userData.name}
                    </a>

                </div>

                <div className="collapse navbar-collapse">
                    <p className="navbar-text navbar-right">
                        <a className="navbar-link" onClick={() => {props.restart()}}>Logout</a>
                    </p>
                </div>

            </div>
        </div>
    )
}

function Certificates(props) {

    let certificates = [];

    Object.keys(props.certificates).forEach((key, index) => {
        let cert = (
            <div key={key} className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                <div className="panel panel-default">
                    <div className="panel-heading">{key}</div>
                    <div className="panel-body">
                        <label className="label label-info">Name</label>
                        <div className="well">{props.certificates[key].name}</div>

                        <label className="label label-info">{props.isOrg ? 'User UUID' : 'Organization UUID'}</label>
                        <div className="well">{props.isOrg ? props.certificates[key].user : props.certificates[key].organization}</div>

                        <label className="label label-info">Date</label>
                        <div className="well">{props.certificates[key].date}</div>

                        <label className="label label-info">SHA256</label>
                        <div className="well"><p style={{wordWrap:'break-word'}}>{props.certificates[key].sha}</p></div>
                    </div>
                </div>
            </div>
        );
        certificates.push(cert)
    });

    return <div className="row">{certificates}</div>;

}

export {NavBar, Certificates}