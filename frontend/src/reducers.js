import {REGISTER, LOGIN,LOGOUT,REQUESTDATA,UPDATEHEADLINE,GOTOPROFILE,GOTOMAIN,REQUESTUSERGROUP,REQUESTCOMMENT,UPDATEAVATAR,bigimg} from "./actions";


const intialState = {
    userId: 'dummyuser',
    password:'12345',
    baseinfo:{zipcode:'77025',phonenumber:'123-123-1234',email:'dummy@gmail.com'},
    headline:'Today is a good day!',
    data:[],
    friendlist:[],
    articles:[],
    usergroup:[],
    registeredId:'',
    comments:[],
    location:'',
    avatar:bigimg

};

const users=["Bret","Antonette","Samantha","Karianne","Kamren","Leopoldo_Corkery","Elwyn.Skiles","Maxime_Nienow","Delphine","Moriah.Stanton"]

export function Reducer( state = intialState, action){
    switch(action.type){
        case REGISTER:
            return {...state,registeredId:action.userId}
        case LOGIN:
            return {...state,userId:action.userId,password: action.password,location:users.includes(action.userId)?'Main':'Landing'}
        case REQUESTUSERGROUP:
            return {...state,usergroup:action.usergroup}

        case LOGOUT:
            return {...state,userId: 'dummyuser',
                password:'',
                baseinfo:{zipcode:'77025',phonenumber:'123-123-1234',email:'dummy@gmail.com'},
                headline:'Today is a good day!',
                data:[],
                friendlist:[],
                articles:[],
                location:'Landing'}

        case REQUESTDATA:

            return {...state,data:action.data}

        case UPDATEHEADLINE:
            return {...state,headline:action.headline}

        case GOTOPROFILE:
            return {...state,friendlist: action.input.friendlist,articles:action.input.articles,location:'Profile',userId: action.input.userId}

        case GOTOMAIN:

            return {...state,/*userId: action.input.userId,*/password: action.input.password,baseinfo: action.input.baseinfo,location:'Main'}



        case REQUESTCOMMENT:
            return {...state,comments:action.comments}

        case UPDATEAVATAR:
            return {...state,avatar:action.avatar}



        default:
            return state

    }
    return state

}

