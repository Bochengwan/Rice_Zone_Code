let redis = require('redis').createClient('redis://:p61796358c3396966b46883b73f5be299bc41d1e3809c75f0c4e10b649eb93fcc@ec2-54-166-205-55.compute-1.amazonaws.com:17549')
const md5 = require('md5');
const models = require('./schema');
const User = models.User;
const Profile = models.Profile;
const connector = models.connector;
const smallimg = 'data:image/jpeg;base64,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'



let sessionUser = {};
let cookieKey = "sid";
let mySecretMessage = 'thisismysecretmessageforricezoneapp';


function isLoggedIn(req, res, next) {

    console.log(req.headers);
    if (!req.cookies) {
        return res.sendStatus(401);
    }

    let sid = req.cookies[cookieKey];

    // no sid for cookie key
    if (!sid) {

        return res.sendStatus(401);
    }
    //let userObj = sessionUser[sid];
    redis.hmget(cookieKey,sid,function(err,userObj){


        if (userObj[0]) {
            userObj = JSON.parse(userObj[0]);

            req.username = userObj.username;

            next();
        }
        else {
            //req.username = 'testUser';
            //next();
            return res.sendStatus(401)
        }

    })


}

function getUser(username,getresult){

    User.findOne({username:username}).exec(function (err,user){
        if(err) {
            getresult(err, null);
        } else{

            getresult(null,user);
        }
    })
}

function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let userObj = null
    console.log(req.body)
    // supply username and password
    if (!username || !password) {
        return res.sendStatus(400);
    }

    getUser(username,function (err,user){

        if(err){
            let msg = {result: 'fail'};
            return res.send(msg);

        } else{
            userObj = user;
            const myhash= md5(userObj.salt+password+mySecretMessage);

            if(!userObj || myhash != userObj.hash){
                let msg = {result: 'fail'};
                return res.send(msg);
            } else{
                const sessionKey = md5(mySecretMessage+new Date().getTime()+userObj.username);
                //sessionUser[sessionKey] = userObj;
                redis.hmset(cookieKey,sessionKey,JSON.stringify(userObj))

                res.cookie(cookieKey,sessionKey,{ maxAge: 3600 * 1000, httpOnly: true,secure:true,sameSite:'None'});
                let msg = {username: username, result: 'success'};
                res.send(msg);
            }
        }
    });



}

function register(req, res) {
    console.log(req.body)
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let dob = req.body.dob;
    let zipcode = req.body.zipcode;
    let phone = req.body.phone;
    // supply username and password
    if (!username || !password || !email || !dob || !zipcode) {
        return res.sendStatus(400);
    }

    let salt = username + new Date().getTime();
    let hash = md5(salt+password+mySecretMessage)

    let msg = {username: username, result: 'success'};

    User.findOne({username:username}).exec(function(err,result){
        if(result == null){
            (async () => {

                await new User({username:username,salt:salt,hash:hash}).save()
                await new Profile({username:username,
                    headline:'This is my headline',
                    email:email,
                    zipcode:zipcode,
                    dob:dob,
                    phone:phone,
                    avatar:smallimg,
                    following:[]}).save()
                // await (connector.then(()=> {}));
                res.send(msg);
            })();
        } else{
            res.send(msg);
        }
    })
}

function passwordChange(req,res){
    if(!req.body.password){
        return res.status(400).send('No password');
    }
    let salt = req.username + new Date().getTime();
    let hash = md5(salt+req.body.password+mySecretMessage);
    User.update({username:req.username},{salt:salt,hash:hash}).exec(function(err,_){
        if(err){
            res.status(401).send('Error!');
        } else{
            res.send({
                username:req.username,
                password:req.body.password
            })
        }
    })

}

function logout(req,res){
    let sid = req.cookies[cookieKey];
    if(sid){
        //delete sessionUser[sid];
        redis.del(cookieKey,sid)
        res.clearCookie(cookieKey);
        let msg = {result: 'success'};
        res.send(msg);
        //res.status(200).send('OK');
    } else{
        res.status(401).send('No user');
    }
}


module.exports = (app) => {

    app.post('/login', login);
    app.post('/register', register);
    app.use(isLoggedIn);
    app.put('/password',passwordChange);
    app.put('/logout',logout);
}



