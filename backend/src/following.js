const models = require('./schema');
const Profile = models.Profile;

const getFollowing=(req,res)=>{
    let username = req.params.user?req.params.user:req.username;

    Profile.findOne({username:username}).exec(function(err,result){
        if(err){
            return res.status(401).send('Error!');
        } else{
            if(result){
                let msg = {username:result.username,following:result.following};
                return res.send(msg);
            } else{
                res.status(401).send('No user');
            }

        }
    })
    // if(!req.username){
    //     req.username = loggedInUser;
    // }
    // let user = req.params.user? req.params.user:req.username;
    // let target_profile = profile.filter((aprofile)=>aprofile.username==user)[0];
    // if(target_profile===undefined){
    //     return res.status(400).send('Cannot find user');
    // } else {
    //     let msg = {username: user, following: target_profile.following}
    //     return res.send(msg);
    // }
}

const updateFollowing=(req,res)=>{
    if(!req.params.user){
        return res.sendStatus(400)
    }
    Profile.findOne({username:req.username}).exec(function(err,result){
        if(err){
            return res.status(401).send('Error!');
        } else{
            if(!result.following.includes(req.params.user)){
                Profile.update({username:req.username},{following:[...result.following,req.params.user]}).exec(function() {
                    Profile.findOne({username: req.username}).exec(function (err, myresult) {
                        if (err) {
                            return res.status(401).send('Error!');
                        } else {

                            let msg = {username: myresult.username, following: myresult.following};
                            return res.send(msg);
                        }

                    })
                })
            } else{
                res.status(400).send('User already exists!');
            }
        }
    })

}

const deleteFollowing=(req,res)=>{

    if(!req.params.user){
        return res.sendStatus(400)
    }
    Profile.find({username:req.username}).exec(function(err,result){
        if(err){
            return res.status(401).send('Error!');
        } else{
            let newfollow = result[0].following.filter((element)=>element!=req.params.user);

            Profile.update({username:req.username},{following: newfollow}).exec(function(){
                Profile.findOne({username:req.username}).exec(function(err,myresult){
                    if(err){
                        return res.status(401).send('Error!');
                    } else{

                            let msg = {username:myresult.username,following:myresult.following};
                            return res.send(msg);
                    }
                })
            })
        }
    })
}



module.exports = (app) => {

    app.put('/following/:user', updateFollowing);
    app.delete('/following/:user',deleteFollowing);

    app.get('/following/:user?', getFollowing);


}