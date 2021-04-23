import {Reducer} from "./reducers";
import React from 'react';
import ReactDom from 'react-dom';
import Landing from './Component/Landing/Landing'
import Login from './Component/Landing/Login'
import Main from './Component/Main/Main'
import Profile from './Component/Profile/Profile'
import { Provider } from 'react-redux';
import {createStore} from "redux";
import {LOGIN, REQUESTDATA, LOGOUT, GOTOPROFILE} from "./actions";
import { render, screen } from '@testing-library/react';


async function a() {

    let data = await fetch(`https://jsonplaceholder.typicode.com/posts`).then(res => res.json())

    return data
}

const b = a()




const intialState = {
    userId: 'dummyuser',
    password:'12345',
    baseinfo:{zipcode:'77025',phonenumber:'123-123-1234',email:'dummy@gmail.com'},
    headline:'Today is a good day!',
    data:b,
    friendlist:[],
    articles:[],
    usergroup:[],
    registeredId:'',
    comments:[],
    location:''
};

const store = createStore(Reducer)

describe("Test can render without problem",()=> {
    it("can render landing page", () => {
            const div = document.createElement('div');
            const TestComponenet1 = <Provider store={store}><Landing/></Provider>

            ReactDom.render(TestComponenet1, div)
        });
    it("can render main page", () => {
        const div = document.createElement('div');
        const TestComponenet2 = <Provider store={store}><Main/></Provider>

        ReactDom.render(TestComponenet2, div)
    });
    it("can render profile page", () => {
        const div = document.createElement('div');
            const TestComponenet3 = <Provider store={store}><Profile/></Provider>

        ReactDom.render(TestComponenet3, div)
    });



    })

describe("Test Auth",()=>{
        it("test login",()=>{
            expect(Reducer(intialState,{type:LOGIN,userId:'Bret',password:"Kulas Light"}).location).toBe('Main')

        })

    it("test failed login",()=>{
        expect(Reducer(intialState,{type:LOGIN,userId:'dswdqdqws',password:"Kulas Light"}).location).toBe('Landing')

    })

    it("test logout",()=>{
        expect(Reducer(intialState,{type:LOGOUT}).userId).toBe('dummyuser')

    })


    }
)

describe("Test Articles",()=>{
    it("test headline",()=>{
        const TestC = render(<Provider store={store}><Main/></Provider>)
        const element = screen.getByTestId('custom-element')
        expect(element.innerHTML).toBe("Status: Today is a good day!")

    })

    it("test post",()=>{
        expect(Reducer(intialState,{type:REQUESTDATA,data :[{
            "userId": 'Bret',
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        }]}).data).toBeTruthy()
    })


    }
)

describe("Test Profile",()=>{
    it("test fetch user",()=> {
        expect(Reducer(intialState, {
            type: GOTOPROFILE,
            input: {friendlist: [], articles: [], userId: 'Bret'}
        }).userId).toBe('Bret')
    })
    })