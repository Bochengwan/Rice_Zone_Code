import React from "react";
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Redirect} from "react-router-dom";
import {userlogout,updateheadline,gotoprofile,updateavatar} from "../../actions";
import Avatar from 'react-avatar';
import './img.css';
import {bigimg, smallimg} from "../../actions";
const baseurl = new URL("https://ricezonefinalbocheng.herokuapp.com/");


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.handleProfile = this.handleProfile.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleHeadline = this.handleHeadline.bind(this);
        this.handleClear = this.handleClear.bind(this);

        this.handlecomments = this.handlecomments.bind(this);
        this.handlefriends = this.handlefriends.bind(this);
        this.handleunfriends = this.handleunfriends.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.search = this.search.bind(this);



        this.state = {
            userId: this.props.userId,
            friendlist: this.props.friendlist,
            baseinfo: this.props.baseinfo,
            data: this.props.data,
            toProfile: false,
            toLanding: false,
            headline: this.props.headline,
            articles: this.props.articles,
            searchcontent : [],
            userscomment:[],
            cookie:this.props.cookies,
            avatar:this.props.avatar

        }
        this.errorMessage='';
        let temp = this.props.usergroup
        this.theuser = temp.find(element=>element[0]===this.state.userId)
        if(this.theuser === undefined) {
            this.hardcodeId = 1;
        } else {
            this.hardcodeId = this.theuser[5];
        }

        }



        componentDidMount()
        {   //fetch(`https://jsonplaceholder.typicode.com/posts`).then(res => res.json()).then(res =>
            //this.props.requestdata(res));


            let option = {
                headers:{"content-type":"application/json"},
                method:"GET",
                credentials:"include",
            };


            async function b(x){
                await fetch(baseurl+"following",option).then(res => res.json()).then(res=>x.setState({friendlist:res.following}));
                await fetch(baseurl+"articles",option).then(res=>res.json()).then(res=>x.setState({articles:res.articles}));
                await fetch(baseurl+"headline",option).then(res=>res.json()).then(res=>x.setState({headline:res.headline}));
                await fetch(baseurl+"avatar",option).then(res=>res.json()).then(res=>{x.setState({avatar:res.avatar});x.props.updateavatar(res.avatar)});
                console.log(x.state)

            }
            b(this);



            // let a = () => {
            //         this.setState({data: this.props.data});
            //         if(this.state.friendlist.length == 0) {
            //
            //             this.getfriends(this.props.usergroup, this.hardcodeId);
            //             this.getarticles(this.props.data);
            //
            //             }
            //         }
            // setTimeout(a, 500)

        }

        handlecomments(e){
            e.preventDefault();
            let commentid = parseInt(e.target.id)


            let commentstatus = this.state.userscomment
            commentstatus[commentid] = !commentstatus[commentid]

            this.setState({userscomment:commentstatus})


        }


        handlePost(e){
            e.preventDefault();

            let npost = document.getElementById("newpost").value;

            let option = {
                headers:{"content-type":"application/json"},
                body:JSON.stringify({"text":npost}),
                method:"POST",
                credentials:"include",
            };
            let option1 = {
                headers:{"content-type":"application/json"},
                method:"GET",
                credentials:"include",
            };
            async function b(x){
                await fetch(baseurl+"article",option).then(res => res.json()).then(res=> {
                    console.log(res);
                    })
                await fetch(baseurl+"articles",option1).then(res=>res.json()).then(res=>{x.setState({articles:res.articles})});
                };
            b(this);

            document.getElementById("newpost").value='';

        }
        handleProfile(e)
        {
            e.preventDefault();
            let temp = {friendlist: this.state.friendlist,articles: this.state.articles,userId:this.props.userId}
            this.props.gotoprofile(temp);
            this.setState({toProfile: true});
        }
        handleLogout(e)
        {
            e.preventDefault();
            let option = {
                headers:{"content-type":"application/json"},
                method:"PUT",
                credentials:"include",
            };
            async function b(x){
                await fetch(baseurl+"logout",option).then(res => res.json()).then(res=> {
                    if(res.result == 'success'){
                        x.props.userlogout();
                        x.setState({toLanding: true})
                    }
                });

            }
            b(this);



        }

        handleHeadline(e)
        {
            e.preventDefault();
            let headline = document.getElementById('headlinetext').value;

            let option = {
                headers:{"content-type":"application/json"},
                body:JSON.stringify({headline:headline}),
                method:"PUT",
                credentials:"include",
            };
            async function b(x){
                await fetch(baseurl+"headline",option).then(res => res.json()).then(res=> {
                    x.props.updateheadline(headline);
                    x.setState({headline: res.headline});
                });

            }
            b(this);
            document.getElementById('headlinetext').value = '';
        }

        handleClear(e)
        {
            e.preventDefault();
            document.getElementById('newpost').value = '';

        }

        handlefriends(e){
            e.preventDefault();
            this.errorMessage = ''
            let a = document.getElementById('newfriend').value;
            let option = {
                headers:{"content-type":"application/json"},
                method:"PUT",
                credentials:"include",
            };
            async function b(x){
                await fetch(baseurl+"following/"+a,option).then(res => res.json()).then(res=>x.setState({friendlist:res.following}));
            }
            b(this);
            // let adding =  this.props.usergroup.find(element=>element[0]==a)
            // if(a!='' && !this.state.friendlist.includes(a) && a!=this.props.userId && !(adding === undefined)) {
            //     let temp = [...this.state.friendlist];
            //     temp.push(document.getElementById('newfriend').value);
            //     this.setState({friendlist: temp});
            //     document.getElementById('newfriend').value = '';
            // } else if (this.state.friendlist.includes(a) || a == this.props.userId){
            //     this.errorMessage = 'Cannot add followed user or yourself!'
            // } else if (adding === undefined){
            //     this.errorMessage = 'Not an existing user!'



        }

        handleunfriends(e){
            let option = {
                headers:{"content-type":"application/json"},
                method:"DELETE",
                credentials:"include",
            };
            async function b(x){
                await fetch(baseurl+"following/"+e.target.id,option).then(res => res.json()).then(res=>x.setState({friendlist:res.following}));
            }
            b(this);

        }

        search(event){
            event.preventDefault();

            let temp = [];
            this.state.articles.forEach(function(e){
                if (e.author.includes(event.target.value) || e.text.includes(event.target.value)){
                    temp.unshift(e);
                }
            })
            if(event.target.value==''){temp=[];}
            this.setState({searchcontent:temp});

        }


        render()
        {
            if (this.state.toProfile) {
                return (

                    <Redirect to='/Profile'/>

                )
            }

            if (this.state.toLanding) {
                return (
                    <Redirect to='/'/>
                )
            }

            return (
                <div>

                    <div className="jumbotron text-center">
                        <h1> Hello! {this.state.userId}!Welcome to your zone!</h1>
                    </div>
                    <div className='row'>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                            <div className='card'>

                                <div className='row'>
                                    <div className='col-md-6'>
                                        <button className="btn btn-primary" type='submit'
                                                onClick={this.handleLogout}>Logout
                                        </button>
                                    </div>
                                    <div className='col-md-offset-4 col-md-6'>
                                        <button className="btn btn-primary" type='submit'
                                                onClick={this.handleProfile}>Profile
                                        </button>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-12'>
                                        <Avatar round src={this.state.avatar}/>
                                        <p className="font-weight-lighter">{this.state.userId}</p>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-12'>
                                        <p data-testid="custom-element" className="font-weight-bold">Status: {this.state.headline}</p>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-12'>
                                        <input type='text' id='headlinetext'/>
                                        <br/>
                                        <button type='submit' onClick={this.handleHeadline}>Change</button>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                            <div className='card'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        {/*<textarea className="form-control" rows="1" id='posttitle'*/}
                                        {/*          placeholder='Post title'></textarea>*/}
                                    <textarea className="form-control" rows="5" id='newpost'
                                              placeholder='Post your day!'></textarea>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <button className="btn btn-primary center" type='submit' onClick={this.handlePost}>Post</button>
                                        <button className="btn btn-primary center" type='submit'
                                                onClick={this.handleClear}>Clear
                                        </button>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-12'>
                                        <p>Upload your picture:<input type='file'/></p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>

                            <p>Search bar: <input type = 'text' onChange={this.search} placeholder='For now, can only search by userId'></input></p>
                            <div className='card'>
                                {this.state.searchcontent == []?'':this.state.searchcontent.map((x,i)=>
                                    <div key={i} className='row col-md-12'>
                                        <p>  The user is {x.author} and is post on {x.date}.The post content is "{x.text}"</p>

                                    </div>)}
                            </div>
                        </div>

                    </div>

                    <div className='row'>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                            <div className='card'>
                                {!(this.errorMessage=== '')? <div className='col-md-12'><div className= 'row alert-danger'>{this.errorMessage}</div></div>:''}
                                {this.state.friendlist.map((x,i)=>
                                    <div key={i} className='row'>
                                        <div className='col-md-12'>
                                            <Avatar round src={smallimg}/>
                                            <p className="font-weight-lighter">user {x}</p>
                                            <p className="font-weight-bold">Status: {localStorage.getItem(x)===null?'I am user '+x:localStorage.getItem(x)}</p>
                                            <button type='submit' className = 'btn btn-danger' id = {x} onClick={this.handleunfriends}>Unfollow</button>
                                            <br></br>
                                            <br></br>
                                        </div>
                                    </div>)}


                                    <br></br>
                                    <div className = 'row'>
                                        <div className='col-md-12'>
                                            <input type='text' id='newfriend' placeholder = 'add a new friend'/>
                                        </div>
                                        <div className='col-md-12'>
                                            <button type='submit' className = 'btn btn-primary' onClick={this.handlefriends}>Follow</button>
                                        </div>
                                    </div>
                            </div>
                        </div>

                        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                            <div className='card'>
                                <ul className="list-group list-group-flush">
                                {this.state.articles.map((x,i)=>
                                    <li key={i} className="list-group-item">
                                        <div className='col-md-12'>
                                            <p className="font-weight-bold"></p>
                                            <img src={x.img}/>
                                            <p className="font-italic">{x.text}</p>
                                            <p className="font-weight-bold">Published by: User {x.author} on {x.date} </p>
                                            <button type='submit' className = 'btn btn-secondary'>Edit</button>
                                            <button type='submit' className = 'btn btn-warning' id = {x.id} onClick={this.handlecomments}>Comment</button>
                                            {this.state.userscomment[x.id]?
                                                <div className='card'>
                                                    {x.comment.map((y,j)=>
                                                        <div key = {j} className="list-group-item">
                                                            <p className="font-italic">{y.text} </p>
                                                            <p className="font-weight-bold">Published by: {y.author} on {y.date}</p>
                                                        </div>
                                                    )}
                                                </div>
                                                    :''}
                                            <br></br>
                                            <br></br>
                                        </div>
                                    </li>)}
                                    </ul>

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
        headline:state.headline,
        baseinfo:state.baseinfo,
        data:state.data,
        friendlist: state.friendlist,
        articles:state.articles,
        usergroup:state.usergroup,
        comments:state.comments,
        avatar: state.avatar

    }
};

const mapDispatchToProps = (dispatch) => {
    return {

        userlogout: () =>dispatch(userlogout()),
        updateheadline:(headline)=>dispatch(updateheadline(headline)),
        gotoprofile: (input)=>dispatch(gotoprofile(input)),
        updateavatar: (avatar)=>dispatch(updateavatar(avatar))

    }
};


export default connect(mapStateToProps,mapDispatchToProps)(Main)