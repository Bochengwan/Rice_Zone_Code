const models = require('./schema');
const Article = models.Article;
const Comment = models.Comment;
const Profile = models.Profile;
const bigimg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS0Y8KJxbBv4yxN4eoXfpdUnhqWXnEj_kpysQ&usqp=CAU'


const getArticlesByAuthors = (query,callback)=>{
    Article.find({author:query.authors}).sort({date:-1}).limit(query.limit).exec(function(err,results){
        if(err){
            callback(err,null);
        } else{
            callback(null,results);
        }
    })
}
const getArticle = (req, res) => {
    let id = req.params.id;

    if(id){
        Article.findOne({id:id}).exec(function(err,result){
            if(err){
                return res.status(401).send('Error!');
            } else{
                if (result === null){
                    res.status(400).send('Cannot find article with this id');
                } else{
                    res.send({articles:result});
                }
            }
        })

    } else{
        Profile.find({username:req.username}).exec(function(err,users){
            if(err){
                return res.status(401).send('Error!');
            } else{
                const userObj = users[0]

                const usersToQuery = [userObj.username,...userObj.following];
                getArticlesByAuthors({authors:usersToQuery,limit:10},function(err,results){
                    if(err){
                        return res.status(401).send('Error!');
                    } else{

                        res.send({articles:results});
                    }
                })
            }
        })
    }
}


const addArticle = (req, res) => {
    let text = req.body.text;
    if(!text){
        return res.sendStatus(400);
    }
    Article.find().exec(function(err,results){
        if(err){
            return res.status(401).send('Error!');
        }
        new Article({id: results.length+1, author:req.username, text:text,img:bigimg,comment:[],date:new Date(Date.now()) }).save(
        function(){
            Article.findOne({id:results.length+1}).exec(function(err,result){
                res.send({articles:result})
            })
        }
        )
    })
}

const updateArticle = (req,res) => {
    let text = req.body.text;
    let cid = req.body.commentId;
    let id = req.params.id;
    if(!text){
        return res.sendStatus(400);
    }

    Article.findOne({id:id}).exec(function(err,result){
        if(result === null){
            return res.status(400).send('Cannot find article with this id');
        }

        if(result.author!=req.username){
            return res.status(401).send('Only the author can modify this article!');
        }

        if(!cid){
            Article.update({id:req.params.id},{text:text}).exec(function(err,myresult){
                if(err){
                    return res.status(401).send('Error!');
                } else{
                    Article.findOne({id:req.params.id}).exec(function(err,final){
                        return res.send({articles:final});
                    })
                }
            })
        } else{
            if(cid == -1){
                Comment.find().exec(function (err,results){
                    if(err){
                        return res.status(401).send('Error!');
                    }
                    new Comment({cid: results.length+1, author:req.username, text:text,date:new Date(Date.now())}).save(
                        function(){
                            Article.findOne({id:id}).exec(function(err,myarticle){
                                Comment.findOne({cid:results.length+1}).exec(function(err,mycomment){
                                    Article.update({id:id},{comment:[...myarticle.comment,mycomment]}).exec(function(err,result){
                                        Article.findOne({id:id}).exec(function(err,final){
                                            return res.send({articles:final});
                                        })
                                    })
                                })
                            })
                        }
                    )
                })
            } else{
                Comment.findOne({cid:cid}).exec(function(err,result){
                    if(err){
                        return res.status(401).send('Error!');
                    }
                    if(result.author!=req.username){
                        return res.status(401).send('Only the author can modify this comment!');
                    } else{
                        Comment.update({cid:cid},{text:text}).exec(function(error,myresult){
                            Article.findOne({id:id}).exec(function(err,myarticle){
                                Comment.findOne({cid:cid}).exec(function(err,mycomment){
                                    Article.update({id:id},{comment:[...myarticle.comment,mycomment]}).exec(function(err,result){
                                        Article.findOne({id:id}).exec(function(err,final){
                                            return res.send({articles:final});
                                        })
                                    })
                                })
                            })
                        })
                    }
                })
            }
        }
    })
}
module.exports = (app) => {

    app.put('/articles/:id', updateArticle);
    app.post('/article',addArticle);

    app.get('/articles/:id?', getArticle);


}