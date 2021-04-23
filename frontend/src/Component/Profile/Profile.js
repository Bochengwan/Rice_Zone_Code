import React from "react";
import { connect } from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {gotomain,updateavatar,  smallimg} from "../../actions";
import './img.css';
const baseurl = new URL("https://ricezonefinalbocheng.herokuapp.com/");

class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMain = this.handleMain.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleCloud = this.handleCloud.bind(this);
        this.theuser = this.props.usergroup.find(element=>element[0]===this.props.userId)
        if(this.theuser !== undefined) {
            this.baseinfo = {zipcode: this.theuser[3], phonenumber: this.theuser[2], email: this.theuser[4]}
        } else{
            this.baseinfo = {}
        }

        this.state = {
            userId:this.props.userId,
            baseinfo:this.baseinfo,
            password:this.props.password,
            toMain:false,
            friendlist:this.props.friendlist,
            email:'dummy@gmail.com',
            phone:'000-000-0000',
            avatar:this.props.avatar,
            zipcode:'00000',
            upload:false
        }


    }
    componentDidMount() {
        let option = {
            headers: {"content-type": "application/json"},
            method: "GET",
            credentials: "include",
        };


        async function b(x) {
            await fetch(baseurl + "zipcode", option).then(res => res.json()).then(res => x.setState({zipcode: res.zipcode}));
            await fetch(baseurl + "phone", option).then(res => res.json()).then(res => x.setState({phone: res.phone}));
            await fetch(baseurl + "email", option).then(res => res.json()).then(res => x.setState({email: res.email}));
            await fetch(baseurl + "avatar", option).then(res => res.json()).then(res => {
                x.setState({avatar: res.avatar});
            });
            console.log(x.state)

        }

        b(this);
    }
    handleUpload(e){
        e.preventDefault();
        this.setState({upload:true});
    }
    handleCloud(e){
        e.preventDefault();
        if(this.state.upload){
            var formData = new FormData();
            let file = document.getElementById('uploadavatar').files[0];
            formData.append("image",file);
            formData.append("avatar",this.props.userId);
            let option = {

                method: "PUT",
                body:formData,
                credentials: "include",
            };
            async function b(x) {
                await fetch(baseurl+"avatar",option).then(res=>res.json).then(res=>{
                    x.props.updateavatar(res.avatar);
                    x.setState({avatar: res.avatar,upload:false});

                })
            }
            b(this);


        }

    }

    handleMain(e){
        e.preventDefault();
        console.log(this.props);
        let input = {userId:this.state.userId,password: this.state.password,baseinfo:this.state.baseinfo};

        this.props.gotomain(input);

        this.setState({toMain:true});

    }
    handleSubmit(e) {
        e.preventDefault();
        let option = {
            headers: {"content-type": "application/json"},
            method: "PUT",
            credentials: "include",
        };
        let zp = document.getElementById('zipcode').value;
        let pn = document.getElementById('phone').value;
        let pw = Number(document.getElementById('password').value);
        let em = document.getElementById('email').value;


        async function b(x) {

            if (zp !== '') {
                fetch(baseurl + "zipcode", Object.assign(option,{body:JSON.stringify({zipcode:zp})})).then(res => res.json()).then(res => x.setState({zipcode: res.zipcode}));}
             if (pn !== '') {
                 fetch(baseurl + "phone", Object.assign(option,{body:JSON.stringify({phone:pn})})).then(res => res.json()).then(res => {console.log(res);x.setState({phone: res.phone})});}
            if (em !== '') {
                fetch(baseurl + "email", Object.assign(option,{body:JSON.stringify({email:em})})).then(res => res.json()).then(res => x.setState({email: res.email}));}

            }

            b(this);
        zp= '';
        pn= '';
        pw= '';
        em= '';
            // if(user.value !== ''){this.setState({userId:user.value})};
            // if(pw.value !== ''){this.setState({password:pw.value})};
            // temp = zp.value == ''? temp: {...temp,zipcode:zp.value};
            // temp = pn.value == ''? temp: {...temp,phonenumber:pn.value};
            // temp = em.value == ''? temp: {...temp,email:em.value};
            // this.setState({baseinfo:temp});
            // user.value = '';

        }

    render(){
        if (this.state.toMain) {
            return (

                <Redirect to='/Main'/>

            )
        }
        return(

            <div>
            <div className="jumbotron text-center">
                <h1> Hello! {this.state.userId}!Welcome to your profile!</h1>
            </div>

                <div className='row'>
                   <div className= 'col-md-1'>
                       <button className="btn btn-primary" type='submit'
                           onClick={this.handleMain}>To Main
                   </button>
                   </div>
                </div>

                <div className = 'row'>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <div className='card'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <img src = {this.state.avatar}></img>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <p>Upload your profile picture:<input id = 'uploadavatar' type='file' onChange={this.handleUpload}/></p>
                                    <button type='submit' className = 'btn-primary' onClick={this.handleCloud}>Upload</button>
                                </div>
                            </div>
                        </div>


                        <div className = 'card'>
                            <form method="GET" onSubmit={this.handleSubmit} >
                                <div className = 'form-row'>
                                    {/*<div className='form-group col-md-12'>*/}

                                    {/*    <label className= 'font-weight-bold text-left' htmlFor='account_name'>Account Name:</label>*/}
                                    {/*    <span>*/}
                                    {/*    <input className='form-control' type="text" id = "account_name" placeholder = 'Update your user Id' />*/}
                                    {/*</span>*/}


                                    {/*</div>*/}
                                    <div className='form-group col-md-12'>

                                        <label className= 'font-weight-bold text-left' htmlFor='email'>Email:</label>
                                        <span>
                                        <input className='form-control' type="email" id = "email" placeholder = 'Update your email' />
                                    </span>


                                    </div>
                                    <div className='form-group col-md-12'>

                                        <label className= 'font-weight-bold text-left' htmlFor='phone'>Phone:</label>
                                        <span>
                                        <input className='form-control' type="tel" id = "phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder = 'Update your phone' />
                                    </span>


                                    </div>
                                    <div className='form-group col-md-12'>

                                        <label className= 'font-weight-bold text-left' htmlFor='zipcode'>Zipcode:</label>
                                        <span>
                                        <input className='form-control' type="text" id = "zipcode" pattern="[0-9]{5}" placeholder = 'Update your zipcode' />
                                    </span>


                                    </div>
                                    <div className='form-group col-md-12'>

                                        <label className= 'font-weight-bold text-left' htmlFor='password'>Password:</label>
                                        <span>
                                        <input className='form-control' type="password" id = "password" placeholder = 'Update your password' />
                                    </span>


                                    </div>

                                </div>
                                <div className= 'form-row center'>
                                    <div className='form-group col-md-12'>
                                        <button className="btn btn-primary" type = 'submit'>Update Info</button>
                                    </div>
                                </div>
                            </form>


                        </div>
                    </div>

                    <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                        <div className='card-header text-left'>Current info</div>
                        <div className = 'card-body text left'>
                            <p>Account name: {this.state.userId}</p>
                            <p>Email Address: {this.state.email}</p>
                            <p>Phone number: {this.state.phone}</p>
                            <p>Zipcode: {this.state.zipcode}</p>

                        </div>
                    </div>
                </div>

            </div>


        )

    }

}
const mapStateToProps = (state) => {
    return {
        userId:state.userId,
        password:state.password,
        baseinfo:state.baseinfo,
        friendlist: state.friendlist,
        articless:state.articles,
        usergroup:state.usergroup,
        avatar: state.avatar

    }
};

const mapDispatchToProps = (dispatch) => {
    return {

        gotomain: (input)=>dispatch(gotomain(input)),
        updateavatar:(avatar)=>dispatch(updateavatar(avatar))

    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Profile)