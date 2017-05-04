import React, {Component} from 'react'
import * as constants from '../constants.js'
import {NavBar, Certificates, SimpleNavbar} from './Common'


class RoleChooser extends Component{

    constructor(props) {
        super(props);
    }


    render() {
        return (
        <div>
            <SimpleNavbar/>
            <header>
                <div className="container very-low black-font">
                    <div className="row row-centered">
                        <div className="col-xs-8 col-centered">

                            <div className="panel panel-default">
                                <div className="panel-heading">Choose the role</div>
                                <div className="panel-body">
                                    <div className="btn-group btn-group-lg btn-group-justified" role="group">
                                        <a href="#" role="button" type="button" className="btn btn-default" onClick={() => {this.props.roleChosen(constants.ROLE_ACADEMIC)}}>
                                            <span className="glyphicon glyphicon-education"></span> Academic
                                        </a>
                                        <a href="#" role="button" type="button" className="btn btn-default" value={constants.ROLE_ORGANIZATION} onClick={() => {this.props.roleChosen(constants.ROLE_ORGANIZATION)}}>
                                            <span className="glyphicon glyphicon-btc"></span> Employee
                                        </a>
                                        <a href="#" role="button" type="button" className="btn btn-default" value={constants.ROLE_USER} onClick={() => {this.props.roleChosen(constants.ROLE_USER)}}>
                                            <span className="glyphicon glyphicon-user"></span> User
                                        </a>
                                    </div>
                                </div>

                                <div className="panel-footer">
                                    By Mussabekov Daniyar, Burkhanov Rustem and Bulgakbayeva Alua CSSE 161M
                                </div>
                            </div>

                            <br></br>
                            <div>
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <h1 className="text-center">Project description</h1>


                                        <p>
                                            The main idea, is to create distributed professional networking service. Nowadays, a lot of jobs in companies requires certain set of skills. These skills must be backed by certificates or diplomas of institutions where employee should be educated. Some companies require recommendations from authorities to accept candidate to specific job. Mostly these documents are being passed to their owners in paper, which makes it hard to keep. Paper documents can be lost or they can be rendered useless. Also, when candidate has come to company from another country, it is very hard to validate his documents. That is why company will spend additional time to make a request to another country’s institution, they can arrange additional exams to test his skills, or they can just not admit his documents for sake of saving time and resources. Another issue is that the company might admit an applicant’s paper documents without verifying their validity, which creates opportunities for certain fraudulent activities.
                                        </p>

                                        <p>
                                            Decentralized networking service will be able to solve this problem. Each country will have several trusted institutions, which would be storing their copies of databases. These institutions will distribute digital signatures to companies, organizations and universities. These organizations will create certificates and other types of documents by using their signatures and assign them to specific people/companies.
                                        </p>

                                        <p>
                                            Business Need: This project has been initiated to increase validity of documents between organizations, which will describe skills of candidates for job, by using this system. The system will decrease documentation validation costs by reducing the number of hours HR personnel has to put into this process.

                                        </p>

                                        <p>
                                            Business Requirements: This system has three roles: User, Organization and Certificate Institution. All three roles will be interacting to each other via web client.

                                        </p>

                                        <h1 className="text-center">DFD of existing system</h1>

                                        <p>
                                            <img className="img-responsive" src="./Project-2017.files/image001.png"/>
                                        </p>
                                        
                                        
                                        <p>
                                            <img className="img-responsive" src="./Project-2017.files/image003.png"/>
                                        </p>

                                        <h1 className="text-center">DFD of our system</h1>
                                        <p>
                                            <img className="img-responsive" src="./Project-2017.files/image005.png"/>
                                        </p>

                                        <p>
                                            <img className="img-responsive" src="./Project-2017.files/image007.png"/>
                                        </p>

                                        <p>
                                            <img className="img-responsive" src="./Project-2017.files/image009.png"/>
                                        </p>


                                        <p>
                                            <img className="img-responsive" src="./Project-2017.files/image011.png"/>
                                        </p>
                                        
                                    </div>
                                </div>
                                
                                
                            </div>
                            
                            


                        </div>
                    </div>
                </div>
            </header>
            
        </div>
            
            
        )
    }


}

export default RoleChooser