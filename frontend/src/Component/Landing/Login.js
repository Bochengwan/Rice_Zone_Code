import React from "react";
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {userlogin} from "../../actions";
import {Redirect} from "react-router-dom";
const baseurl = new URL("https://ricezonefinalbocheng.herokuapp.com/");

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.errorMessage = '';
        this.state = {
            redirect:false,
            userId:"",
            usergroup:this.props.usergroup
        }
    }
    handleSubmit(e){
        e.preventDefault();

        this.errorMessage = '';
        this.user = document.getElementById("Lname_field").value;
        this.pw = document.getElementById("Lpassword").value
        let temp = this.props.usergroup
        let input = {"username":this.user,"password":Number(this.pw)};
        console.log(input)
        let option = {
            headers:{"content-type":"application/json"},
            body:JSON.stringify(input),
            method:"POST",
            credentials:"include",

        };



        if(this.user!=='' && this.pw!==''){
            fetch(baseurl+'login', option).then(res =>
            res.json()).then(res => {
                if(res.result === 'success'){
                    this.props.userlogin(this.user, this.pw);
                    this.setState({redirect: true});

                } else{

                    this.errorMessage = 'Password is wrong or not an existing user!';
                    this.setState({errorMessage:this.errorMessage})
                }
                    })

            } else {
                this.errorMessage = 'Account name or password cannot be blank!';
                this.setState({errorMessage:this.errorMessage})
            }

        return this.errorMessage

    }
    render(){
        if(this.state.redirect){
            return(
                <Redirect to='/Main' />)
        }
        return(
            <div className = "col-lg-6 col-md-6 col-sm-6 col-xs-6">

                <div className='card' >
                    <div className='card-header text-left'>Login</div>
                    <div className='card-body'>
                        {!(this.errorMessage=== '')? <div className= 'row alert-danger'>{this.errorMessage}</div>:''}
                        <form method="GET" action="index.html" onSubmit = {this.handleSubmit}>
                        <div className='form-row'>
                            <div className='form-group col-md-6'>
                                <label className='text-left' htmlFor='Lname_field'>Account Name:</label>
                                <input  type="text" id="Lname_field" placeholder= 'Enter account name'/>
                            </div>
                            <div className='form-group col-md-6'>
                                <label className='text-left' htmlFor='Lpassword'>Password:</label>
                                <input  type="password" id="Lpassword" placeholder= 'Enter password'/>
                            </div>
                        </div>

                            <div className='form-row center'>

                                <div className='form-group col-md-12'>
                                    <button className="btn btn-primary" type = 'submit'>Login</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>

            </div>

        )
    }

}
const mapStateToProps = (state) => {

    return {
        usergroup:state.usergroup
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        userlogin: (userId,password) => dispatch(userlogin(userId,password)),

    }
};


export default connect(mapStateToProps,mapDispatchToProps)(Login)
