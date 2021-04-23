const models = require('./schema');
const Profile = models.Profile;
const uploadImage = require('./uploadCloudinary')

const getHeadline=(req,res)=>{
    let username = req.params.user?req.params.user:req.username;
    Profile.findOne({username:username}).exec(function(err,result){
        if(err){
            return res.status(401).send('Error!');
        } else{
            if(result){
                let msg = {username:result.username,headline:result.headline};
                return res.send(msg);
            } else{
                res.status(401).send('No user');
            }

        }
    })
}

const changeHeadline=(req,res)=>{
    let headline = req.body.headline;
    if(!headline){
        return res.sendStatus(400);
    }
    Profile.update({username:req.username},{headline:headline}).exec(function (err,result) {
        if (err) {
            return res.status(401).send('Error!');
        } else {
            Profile.findOne({username: req.username}).exec(function (err, myresult) {
                if (err) {
                    return res.status(401).send('Error!');
                } else {
                    let msg = {username: myresult.username, headline: myresult.headline};
                    return res.send(msg);
                }
            })
        }
    })
}

const getEmail=(req,res)=>{
    let username = req.params.user?req.params.user:req.username;
    Profile.findOne({username:username}).exec(function(err,result){
        if(err){
            return res.status(401).send('Error!');
        } else{
            if(result){
                let msg = {username:result.username,email:result.email};
                return res.send(msg);
            } else{
                res.status(401).send('No user');
            }

        }
    })

}

const changeEmail=(req,res)=>{
    let email = req.body.email;
    if(!email){
        return res.sendStatus(400);
    }
    Profile.update({username:req.username},{email:email}).exec(function (err,result) {
        if (err) {
            return res.status(401).send('Error!');
        } else {
            Profile.findOne({username: req.username}).exec(function (err, myresult) {
                if (err) {
                    return res.status(401).send('Error!');
                } else {
                    let msg = {username: myresult.username, email: myresult.email};
                    return res.send(msg);
                }
            })
        }
    })
}

const getZipcode=(req,res)=>{
    let username = req.params.user?req.params.user:req.username;
    Profile.findOne({username:username}).exec(function(err,result){
        if(err){
            return res.status(401).send('Error!');
        } else{
            if(result){
                let msg = {username:result.username,zipcode:result.zipcode};
                return res.send(msg);
            } else{
                res.status(401).send('No user');
            }
        }
    })
}

const changeZipcode=(req,res)=>{
    let zipcode = req.body.zipcode;
    if(!zipcode){
        return res.sendStatus(400);
    }
    Profile.update({username:req.username},{zipcode:zipcode}).exec(function (err,result) {
        if (err) {
            return res.status(401).send('Error!');
        } else {
            Profile.findOne({username: req.username}).exec(function (err, myresult) {
                if (err) {
                    return res.status(401).send('Error!');
                } else {
                    let msg = {username: myresult.username, zipcode: myresult.zipcode};
                    return res.send(msg);
                }
            })
        }
    })
}

const getPhone=(req,res)=>{
    let username = req.params.user?req.params.user:req.username;
    Profile.findOne({username:username}).exec(function(err,result){
        if(err){
            return res.status(401).send('Error!');
        } else{
            if(result){
                let msg = {username:result.username,phone:result.phone};
                return res.send(msg);
            } else{
                res.status(401).send('No user');
            }
        }
    })
}

const changePhone=(req,res)=>{
    let phone = req.body.phone;
    if(!phone){
        return res.sendStatus(400);
    }
    Profile.update({username:req.username},{phone:phone}).exec(function (err,result) {
        if (err) {
            return res.status(401).send('Error!');
        } else {
            Profile.findOne({username: req.username}).exec(function (err, myresult) {
                if (err) {
                    return res.status(401).send('Error!');
                } else {
                    let msg = {username: myresult.username, phone: myresult.phone};
                    return res.send(msg);
                }
            })
        }
    })
}

const getAvatar=(req,res)=>{
    let username = req.params.user?req.params.user:req.username;
    Profile.findOne({username:username}).exec(function(err,result){
        if(err){
            return res.status(401).send('Error!');
        } else{
            if(result){
                let msg = {username:result.username,avatar:result.avatar};
                return res.send(msg);
            } else{
                res.status(401).send('No user');
            }

        }
    })

}

const changeAvatar=(req,res)=>{

    if(!req.username){
        return res.sendStatus(400).send('No user logged in');
    }
    if (req.fileurl === null || req.fileurl === ""){
        return res.status(400).send('Failed to save avatar');
    }

    Profile.update({username:req.username},{avatar:req.fileurl}).exec(function (err,result) {
        if (err) {
            return res.status(401).send('Error!');
        } else {
            Profile.findOne({username: req.username}).exec(function (err, myresult) {
                if (err) {
                    return res.status(401).send('Error!');
                } else {
                    let msg = {username: myresult.username, avatar: myresult.avatar};
                    return res.send(msg);
                }
            })
        }
    })
}

const getDob=(req,res)=>{
    let username = req.params.user?req.params.user:req.username;
    Profile.findOne({username:username}).exec(function(err,result){
        if(err){
            return res.status(401).send('Error!');
        } else{
            if(result){
                let msg = {username:result.username,dob:result.dob};
                return res.send(msg);
            } else{
                res.status(401).send('No user');
            }

        }
    })

}


module.exports = (app) => {

    app.put('/headline', changeHeadline);
    app.get('/headline/:user?', getHeadline);

    app.put('/email', changeEmail);
    app.get('/email/:user?', getEmail);

    app.put('/zipcode', changeZipcode);
    app.get('/zipcode/:user?', getZipcode);

    app.put('/phone', changePhone);
    app.get('/phone/:user?', getPhone);

    app.put('/avatar', uploadImage('avatar'),changeAvatar);
    app.get('/avatar/:user?', getAvatar);



    app.get('/dob/:user?',getDob)


}