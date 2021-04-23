
require('es6-promise').polyfill();
require('isomorphic-fetch');

const url = path => `http://localhost:3000${path}`;
let cookie;

describe('All tests for backend', () => {

    it('register new user', (done) => {
        let newUser = {username: 'mrj3', password: 1234,dob: "1970-01-01",email:'12345@gmail.com',zipcode:32134};
        fetch(url('/register'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        }).then(res => res.json()).then(res => {
            expect(res.username).toEqual('mrj3');
            expect(res.result).toEqual('success');
            done();
        });
    });

    it('login user', (done) => {
        let loginUser = {username: 'testUser', password: 123};
        fetch(url('/login'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginUser)
        }).then(res => {
            cookie = res.headers.raw()['set-cookie'];
            return res.json()
        }).then(res => {
            expect(res.username).toEqual('testUser');
            expect(res.result).toEqual('success');
            done();
        });
    });

    it('first change testUser current headline', (done) => {
        let myheadline = {headline:"Happy or not"};
        fetch(url('/headline'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json','cookie':cookie },
            body:JSON.stringify(myheadline)

        }).then(res => {

            return res.json()
        }).then(res => {
            expect(res.username).toEqual('testUser');
            expect(res.headline).toEqual("Happy or not");
            done();
        });
    });

    it('then get testUser current headline', (done) => {

        fetch(url('/headline/testUser'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json','cookie':cookie },

        }).then(res => {

            return res.json()
        }).then(res => {
            expect(res.username).toEqual('testUser');
            expect(res.headline).toEqual("Happy or not");
            done();
        });
    });

    it('should add an article',(done)=>{
        fetch(url('/article'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','cookie':cookie },
            body:JSON.stringify({text:'This is second article'})
        }).then(res => {return res.json()}).then(res => {
            expect(res.articles.text).toEqual('This is second article');
            done();
        });

    });


    it('should give me two or more articles', (done) => {
        fetch(url('/articles'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json','cookie':cookie },
        }).then(res => res.json()).then(res => {
            if (res instanceof Array)
                expect(res.length).toBeGreaterThan(1);
            done();
        });
    });

    it('should give me the first article', (done) => {
        fetch(url('/articles/1'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json','cookie':cookie },
        }).then(res => res.json()).then(res => {
            expect(res.articles.text).toEqual('this is a test article');

            done();
        });
    });

    it('logout',(done)=>{
        fetch(url('/logout'),{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json','cookie':cookie },

        }).then(res=>{
            return res.json()
        }).then(res=>{

            expect(res.statusText).toBe('OK');
            done();
        }).then(done()).catch(done);
    });
});


