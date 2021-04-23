import React from "react";
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from "react-router-dom";
import {register} from "../../actions";
const baseurl = new URL("https://ricezonefinalbocheng.herokuapp.com/");


class Registration extends React.Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateDateOfBirth = this.validateDateOfBirth.bind(this)
        this.errorMessage = '';
        this.state = {
            redirect:false,
            userId:"",
            baseinfo:{zipcode:'',phonenumber:'',email:''},

        }

    }

     handleSubmit(e){
        e.preventDefault();
        this.errorMessage = '';
        this.user = document.getElementById("name_field").value;
         this.pw = document.getElementById("password1").value
        // let temp = this.props.usergroup
        // let found = temp.find(element=>element[0]===this.user)
        // console.log(found)
        let zc = Number(document.getElementById("zipcode").value);
        let pn = document.getElementById("phonenumber").value;
        let em = document.getElementById("email").value;
        let dob = document.getElementById("dob").value;
        let input = {"username":this.user,"password":Number(this.pw),"email":em,"dob":dob,"zipcode":zc,"phone":pn};

         let option = {
             headers:{"content-type":"application/json"},
             body:JSON.stringify(input),
             method:"POST",
             credentials:"include",
         };
        //this.setState({userId:this.user});
        //this.setState({baseinfo:{zipcode:zc,phonenumber:pn,email:em}});


         if(document.getElementById("password1").value === document.getElementById("password2").value){
             if(!this.validateDateOfBirth(document.getElementById("dob"))){
                 //if(this.errorMessage === ''){
                   //  this.setState({redirect:true});
                 //}

             } else {
                 this.errorMessage += 'You need to be 18 years old or older!'
             }
         } else {
             this.errorMessage += 'The passwords are not the same!'
         }

         console.log(this.errorMessage)

         if(this.errorMessage==''){
             fetch(baseurl+"register",option).then(res => res.json()).then(res => {
                 if(res.result === 'success'){
                     this.props.register(this.user, {zipcode:zc,phonenumber:pn,email:em});
                 } else{
                     this.errorMessage += 'Registration error!'
                 }
             })

         }
         console.log(this.errorMessage)
         this.setState({errorMessage:this.errorMessage})
    }

    validateDateOfBirth(dob){
        let inputdate = new Date(dob.value);
        let cdate = new Date();
        let dyear = cdate.getFullYear()-inputdate.getFullYear();
        let dmonth = cdate.getMonth()-inputdate.getMonth();
        let dday = cdate.getDate()-inputdate.getDate();

        if (dyear>18){
            return false;
        } else if (dmonth>0 && dyear === 18){
            return false;
        } else if (dday>=0 && dmonth === 0 && dyear === 18) {
            return false;
        } else {
            return true;
        }
    }



    render(){
        if(this.state.redirect){
            return(
            <Redirect to='/Main' />)
        }
        return(

                <div className = "col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div className='card'>
                        <div className='card-header text-left'>Register</div>
                        <div className='card-body'>
                            {!(this.errorMessage=== '')? <div className= 'row alert-danger'>{this.errorMessage}</div>:''}
                            <form method="GET" action="index.html" onSubmit={this.handleSubmit} >
                                <div className = 'form-row'>
                                <div className='form-group col-md-6'>
                                    <label className= 'text-left' htmlFor='display_name'>Display Name:</label>
                                    <input className='form-control' type="text" id = "display_name" placeholder = 'optional' />
                                </div>
                                <div className='form-group col-md-6'>
                                    <label className= 'text-left' htmlFor = 'name_field'>Account Name:</label>
                                    <input className='form-control' type="text" id = "name_field" required placeholder='Enter your account name'/>
                                </div>
                                </div>

                                <div className='form-row'>
                                    <div className='form-group col-md-6'>
                                        <label className='text-left' htmlFor='email'>Email address:</label>
                                        <input className='form-control' type="email" id="email" placeholder= 'abc@abc.abc'required/>
                                    </div>
                                    <div className='form-group col-md-6'>
                                        <label className='text-left' htmlFor='phonenumber'>Phone number:</label>
                                        <input className='form-control' type="tel" id="phonenumber" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required placeholder= 'xxx-xxx-xxxx'/>
                                    </div>
                                </div>

                                <div className='form-row'>
                                    <div className='form-group col-md-6'>
                                        <label className='text-left' htmlFor='dob'>Date of birth:</label>
                                        <input className='form-control' type="date" id="dob"/>
                                    </div>
                                    <div className='form-group col-md-6'>
                                        <label className='text-left' htmlFor='zipcode'>Zipcode:</label>
                                        <input className='form-control' type="text" id="zipcode" pattern="[0-9]{5}" requiredplaceholder= 'xxxxx'/>
                                    </div>
                                </div>

                                <div className='form-row'>
                                    <div className='form-group col-md-6'>
                                        <label className='text-left' htmlFor='password1'>Password:</label>
                                        <input className='form-control' type="password" id="password1" placeholder= 'Enter your password'/>
                                    </div>
                                    <div className='form-group col-md-6'>
                                        <label className='text-left' htmlFor='password2'>Confirm Password:</label>
                                        <input className='form-control' type="password" id="password2" required placeholder= 'Please confirm password'/>
                                    </div>
                                </div>

                                <div className= 'form-row center'>
                                    <div className='form-group col-md-6'>
                                        <button className="btn btn-primary" type = 'submit'>Register</button>
                                    </div>
                                    <div className='form-group col-md-6'>
                                        <button className="btn btn-primary" type = 'reset'>Clear</button>
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
        register: (userId,baseinfo) => dispatch(register(userId,baseinfo))
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(Registration)