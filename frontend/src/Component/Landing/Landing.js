import React from "react";
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
//import * as actions from './actions'
import Login from './Login'
import Registration from './Registration'
import {requestusergroup,requestdata,requestcomment} from "../../actions";

class Landing extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            usergroup: []
        }
    }


    componentDidMount(){
        async function a(x) {
            let res = await fetch(`https://jsonplaceholder.typicode.com/users`).then(res => res.json())



            let temp = [];
            temp = res.map(x=>[x.username,x.address.street,x.phone,x.address.zipcode,x.email,x.id] );

            x.props.requestusergroup(temp)
            x.setState({usergroup:temp})
            let data = await fetch(`https://jsonplaceholder.typicode.com/posts`).then(res => res.json())
            x.props.requestdata(data)

            let comment = await fetch(`https://jsonplaceholder.typicode.com/comments`).then(res => res.json())
            x.props.requestcomment(comment)


        }
        a(this)

    }

    render() {
        return (
            <div>
                <div className="jumbotron text-center">
                    <h1> Welcome to RiceZone!</h1>
                </div>

                <div className="row">
                    <Registration/>
                    <Login/>
                </div>

            </div>

        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        requestusergroup: (usergroup)=> dispatch(requestusergroup(usergroup)),
        requestdata: (data)=> dispatch(requestdata(data)),
        requestcomment:(comment)=>dispatch(requestcomment(comment))

    }
};

export default connect(null,mapDispatchToProps)(Landing
)




