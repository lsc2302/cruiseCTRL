const express = require('express');
const UserModel = require('../models/UserModel.js');
const UserSocketModel = require('../models/UserSocketModel.js');
const ArticleModel = require('../models/ArticleModel.js');
const router = express.Router();

router.get('/', function(req, res, next) {
    if(!!req.session.loginUser){
        res.render('home',req.session.loginUser);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/settings',function(req,res){
    if(!!req.session.loginUser){
        res.render('settings');
    }
    else{
        res.redirect('/login');
    }
});

router.get('/help',function(req,res){
    if(!!req.session.loginUser){
        res.render('help');
    }
    else{
        res.redirect('/login');
    }
});

router.get('/contact',function(req,res){
    if(!!req.session.loginUser){
        res.render('contact');
    }
    else{
        res.redirect('/login');
    }
});

router.get('/question',function(req,res,next){
    if(!!req.session.loginUser){
        res.render('question',req.session.loginUser);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/nearby',function(req,res,next){
    if(!!req.session.loginUser){
        res.render('nearby',req.session.loginUser);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/article',function(req,res,next){
    if(!!req.session.loginUser){
        ArticleModel.find({},function(err,docs){
            let data = Object.assign(req.session.loginUser, {articles:docs});
            res.render('article',data);
        });
    }
    else{
        res.redirect('/login');
    }});

router.get('/login',function(req,res,next){
    res.render('login');
});

router.get('/signUp',function(req,res,next){
    res.render('signUp');
});

router.post('/userCreate',function(req,res) {
    const {username, password, userAvatar, userExperience,userSkills,carCountry,carBrand,carModel} = req.body;
    UserModel.findOne({ username:username})
        .then(user => {
                if(!user){
                    UserModel.create({
                        username: username,
                        password: password,
                        userAvatar:userAvatar,
                        userExperience:userExperience,
                        userSkills:userSkills,
                        carCountry:carCountry,
                        carBrand:carBrand,
                        carModel:carModel,
                    }).then(user => {
                            if (user) {
                                res.send({status: 0});
                            } else {
                                res.send({status:2});
                            }
                        }
                    );
                }else{
                    res.send({status: 1, msg:'user exists!'})
                }
            }
        )
        .catch((error) => {
                res.send({status:2, msg:"error!"});
            }
        )
});

router.post('/logout',(req,res)=>{
    req.session.destroy(function(err) {
        if(err){
            res.send({status:2, msg:"error!"});
        }
        res.clearCookie('connect.sid');
        res.send({status:0});
    });
});

router.post('/login',(req,res)=>{
  const {username} = req.body;
  // console.log(req);
    UserModel.findOne({username:username})
      .then(user => {
          if(user){
              req.session.regenerate(function(err) {
                  if(err){
                      res.send({status:2, msg:"error!"});
                  }
                  req.session.loginUser = user;
                  res.send({status: 0, data: user});
              });
          }else{
              res.send({status: 1, msg:'user not found!'})
          }
        }
      )
      .catch(() =>
      {
        res.send({status:2, msg:"error!"});
      }
      )
});

router.post('/getUser',(req,res)=>{
    if(req.session.loginUser){
        res.send({status:0,data:req.session.loginUser})
    }else{
        res.send({status:2})
    }
});

router.post('/getUserSocketId',(req,res)=>{
   const {username} = req.body;
    UserSocketModel.findOne({username:username}).then(
       user=>{
           if(user){
               res.send({status:0,data:user});
           }else{
               res.send({status:2,msg:'user offline!'})
           }
       }
   )
});

module.exports = router;
