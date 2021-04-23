const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://bw31:2wbc12345@cluster0.vusng.mongodb.net/social?retryWrites=true&w=majority';
const connector =   mongoose.connect(connectionString,{ useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username:String,
    salt:String,
    hash:String
})

const profileSchema = new mongoose.Schema({
    username:String,
    headline:String,
    email:String,
    zipcode:Number,
    dob:String,
    phone:String,
    avatar:String,
    following:[String]
})
const commentSchema = new mongoose.Schema({
    cid:Number,
    author:String,
    date:Date,
    text:String
})
const articleSchema = new mongoose.Schema({
    id:Number,
    author:String,
    text:String,
    date:Date,
    comment:[commentSchema],
    img:String
})
const User = mongoose.model('user', userSchema);
const Profile = mongoose.model('profile',profileSchema);
const Comment = mongoose.model('comment',commentSchema);
const Article = mongoose.model('article',articleSchema);
module.exports = {
    User: User,
    Profile:Profile,
    Comment:Comment,
    Article:Article,
    connector:connector
}

