const express = require('express');
const UserModel = require('../models/UserModel.js');
const UserSocketModel = require('../models/UserSocketModel.js');
const renderdata = require('../public/data/home.json');
const rendercar = require('../public/data/car.json');
const avatarUploader = require('../public/javascripts/file-uploader');
const router = express.Router();

router.get('/', function(req, res, next) {
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata);
        res.render('home',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/path/to/homeA', function(req, res, next) {
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata);
        res.render('homeA',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/path/to/homeB', function(req, res, next) {
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata);
        res.render('homeB',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/lights',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[0]);
        res.render('second',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/antilockWarning',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[0].children[0].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/batteryLow',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[0].children[1].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/checkEngine',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[0].children[2].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/brakeSystemWarning',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[0].children[3].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/lowOilWarning',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[0].children[4].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/lowFuelWarning',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[0].children[5].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/lowWiperFluidWarning',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[0].children[6].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/temperatureWarning',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[0].children[7].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/tirePressureWarning',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[0].children[8].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/tractionControlIndicator',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[0].children[9].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/cruiseControlIndicator',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[0].children[10].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/ignitionSwitchWarning',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[0].children[11].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/steeringLockWarning',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[0].children[12].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/doorOpenWarning',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[0].children[13].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/seatBeltWarning',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[0].children[14].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/smell',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[1]);
        res.render('second',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/rottenEgg',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[1].children[0].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/gas',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[1].children[1].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/burnt',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[1].children[2].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/mold',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[1].children[3].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/syrup',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[1].children[4].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/hotOil',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[1].children[5].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/smoke',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[2]);

        res.render('second',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/blackSmoke',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[2].children[0].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/whiteSmoke',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[2].children[1].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/sound',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[3]);
        res.render('second',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/clunking',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[3].children[0].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/flapping',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[3].children[1].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/grind',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[3].children[2].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/sizzling',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[3].children[3].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/knocking',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[3].children[4].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/bang',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[3].children[5].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/shake',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[4]);
        res.render('second',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/imbalancedTires',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[4].children[0].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/sparkPlugs',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[4].children[1].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/brakePads',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[4].children[2].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/brakeCalipers',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[4].children[3].children);
        res.render('third',data);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/axles',function(req,res){
    if(!!req.session.loginUser){
        let data = Object.assign(req.session.loginUser, renderdata.data[4].children[4].children);
        res.render('third',data);
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

router.get('/questionA',function(req,res,next){
    if(!!req.session.loginUser){
        res.render('questionA',req.session.loginUser);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/questionB',function(req,res,next){
    if(!!req.session.loginUser){
        res.render('questionB',req.session.loginUser);
    }
    else{
        res.redirect('/login');
    }
});

router.get('/profile',function(req,res,next){
    if(!!req.session.loginUser){
        UserModel.findOne({username:req.session.loginUser.username})
            .then(user => {
                    if(user){
                        res.render('profile',user);
                    }
                }
            )
            .catch(() =>
                {
                    res.send({status:2, msg:"error!"});
                }
            )
    }
    else{
        res.redirect('/login');
    }
});

router.get('/profileA',function(req,res,next){
    if(!!req.session.loginUser){
        UserModel.findOne({username:req.session.loginUser.username})
            .then(user => {
                    if(user){
                        res.render('profileA',user);
                        // res.send({status: 0, data: user});
                    }
                }
            )
            .catch(() =>
                {
                    res.send({status:2, msg:"error!"});
                }
            )
    }
    else{
        res.redirect('/login');
    }
});

router.get('/profileB',function(req,res,next){
    if(!!req.session.loginUser){
        UserModel.findOne({username:req.session.loginUser.username})
            .then(user => {
                    if(user){
                        res.render('profileB',user);
                        // res.send({status: 0, data: user});
                    }
                }
            )
            .catch(() =>
                {
                    res.send({status:2, msg:"error!"});
                }
            )
    }
    else{
        res.redirect('/login');
    }
});

router.get('/login',function(req,res,next){
    res.render('login');
});

router.get('/signUp',function(req,res,next){
    res.render('signUp',rendercar);
});

router.post('/car',(req,res)=>{
    res.send({status:0, data:rendercar});
});

router.post('/onlineUsers',function(req,res){
    UserSocketModel.find({},function(err,docs){
        if(!err){
            res.send({status:0,data:docs})
        }else{
            res.send({status:2})
        }
    })
});

router.post('/signUp',(req,res)=> {
    avatarUploader(req,res,function(e){
        const {username, password,
            userExperience,userSkills,
            userQuestioner,userExpert,
            carCountry,carBrand,carModel} = req.body;
        let userAvatar = req.file.filename;
        UserModel.findOne({ username:username})
            .then(user => {
                    if(!user){
                        UserModel.create({
                            username: username,
                            password: password,
                            userAvatar:userAvatar,
                            userCoins:1,
                            userExperience:userExperience,
                            userSkills:userSkills,
                            userQuestioner:userQuestioner,
                            userExpert:userExpert,
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
    })

});

router.post('/logout',(req,res)=>{
    if(req.session.loginUser){
        UserSocketModel.findOneAndRemove({username:req.session.loginUser.username},function(err){
            if(!err){
                req.session.destroy(function(err) {
                    if(err){
                        res.send({status:2, msg:"error!"});
                    }
                    res.clearCookie('connect.sid');
                    res.send({status:0});
                });
            }
        });
    }else{
        res.send({status:2, msg:"cache expired!"});
    }
}
);

router.post('/login',(req,res)=>{
  const {username} = req.body;
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

router.post('/getMoreInfo',(req,res)=>{
    const {username} = req.body;
    UserModel.findOne({username:username})
        .then(user => {
                if(user){
                    res.send({status: 0, data: user});
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

router.post('/getMoney',(req,res)=>{
    UserModel.findOne({username:req.session.loginUser.username})
        .then(user => {
                if(user){
                    UserModel.findOneAndUpdate({username:req.session.loginUser.username},{$set:{userCoins: user.userCoins+1}},function(err){
                        if(!err)res.send({status:0,data:user})
                    })
                }
            }
        )
        .catch(() =>
            {
                res.send({status:2, msg:"error!"});
            }
        )
});

router.post('/payMoney',(req,res)=>{
    UserModel.findOne({username:req.session.loginUser.username})
        .then(user => {
                if(user && user.userCoins>=1){
                    UserModel.findOneAndUpdate({username:req.session.loginUser.username},{$set:{userCoins: user.userCoins-1}},
                        function(err){
                        if(!err)res.send({status:0,data:user});
                    })
                }else res.send({status:1,msg:"Failed for lack of coins!"})
            }
        )
        .catch(() =>
            {
                res.send({status:2, msg:"error!"});
            }
        )
});

module.exports = router;

