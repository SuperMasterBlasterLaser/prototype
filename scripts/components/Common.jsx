import React, {Component} from 'react'
import * as constants from '../constants.js'

function getFileName(filename){
    var array = [];
    if (filename != null){
        array = filename.split("\\");
        return array[array.length - 1].toString();
    } else {
        return "";
    }

    //return ("lalala");
}

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
function Buttons(props){
    if (props.isPending){
        return (

            <div className="row">
                <div className="btn-group btn-group-lg btn-group-justified" role="group">

                    <a href="#" role="button" type="button" className="btn btn-default" onClick={() => {
                            props.database.ref(`certificates/${props.uuid}`).set({
                                organization: props.certificate.organization,
                                user: props.certificate.user,
                                date: props.certificate.date,
                                name: props.certificate.name,
                                sha: props.certificate.sha
                            });
                            props.database.ref(`pending_certificates/`).child(props.uuid).remove();
                            props.mount();
                        }}>
                        <span className="glyphicon glyphicon-ok"></span> Accept
                    </a>
                    <a href="#" role="button" type="button" className="btn btn-default" onClick={() => {
                            props.database.ref(`pending_certificates/`).child(props.uuid).remove();
                            props.mount();
                        }}>
                        <span className="glyphicon glyphicon-remove"></span> Reject
                    </a>
                </div>

            </div>
        )
    } else return(
        <div/>
    );

}


function Certificates(props) {

    let certificates = [];

    Object.keys(props.certificates).forEach((key, index) => {
        let hockey = key;
        let cert = (
            <div key={key} className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                <div className="panel panel-default">
                    <div className="panel-heading">as{hockey}</div>
                    <div className="panel-body">
                        <label className="label label-info">Name</label>
                        <div className="well">{props.certificates[key].name}</div>

                        <label className="label label-info">{props.isOrg ? 'User UUID' : 'Organization UUID'}</label>
                        <div className="well">{props.isOrg ? props.certificates[key].user : props.certificates[key].organization}</div>

                        <label className="label label-info">Date</label>
                        <div className="well">{props.certificates[key].date}</div>

                        <label className="label label-info">SHA256</label>
                        <div className="well"><p style={{wordWrap:'break-word'}}>{props.certificates[key].sha}</p></div>
                        <label className="label label-info">File Name</label>
                        <div className="well"><p style={{wordWrap:'break-word'}}>{getFileName(props.certificates[key].filename)}</p></div>
                        <Buttons isPending={props.isPending} database={props.database} uuid={hockey} certificate={props.certificates[key]}/>

                    </div>
                </div>
            </div>
        );
        certificates.push(cert);
    });

    return <div className="row">{certificates}</div>;

}

export {NavBar, Certificates}