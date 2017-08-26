var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var KakaoStrategy = require('passport-kakao').Strategy;

passport.serializeUser( function(user, done){
    done(null, user);
});

passport.deserializeUser( function(user, done){
    done(null, user);
});

passport.use(new FacebookStrategy({
        clientID : "920873831398503", // facebook 앱 아이디
        clientSecret : "3fd6275db90af383f4c2abd87d1d6334", // facebook 앱 시크릿코드
        callbackURL : "http://localhost:3000/auth/facebook/callback",
        profileFields : [ 'id' , 'displayName', 'photos', 'email' ]
    },
    function(accessToken, refreshToken, profile, done){
       UserModel.findOne(
           {username : "fb_"+profile.id},
           function(err, user){
               if(!user){
                   var regData = {
                       username : "fb_"+profile.id,
                       password : "facebook_login",
                       displayname : profile.displayName
                   };
                   var User = new UserModel(regData);
                   User.save(function(err){
                       done(null,regData);
                   });
               }else{
                   done(null, user);
               }
           }
        );
    }
));

router.get('/facebook',
    passport.authenticate('facebook',{scope:'email'})
);

router.get('/facebook/callback',
    passport.authenticate('facebook',
        {
            successRedirect : '/',
            failureRedirect : '/auth/facebook/fail'
        }
    )
);

router.get('/facebook/success',function(req, res){
    res.send(req.user);
});

router.get('/facebook/fail',function(req, res){
    res.send('facebook login fail');
});

passport.use(new KakaoStrategy({
    clientID: "c3589ce4293f0165dd315f55248bd2eb",
    callbackURL: "http://localhost:3000/auth/kakao/callback"
  },
  function(accessToken, refreshToken, profile, done){
       console.log(profile);
       UserModel.findOne(
           {username : "kko_"+profile.id},
           function(err, user){
               if(!user){
                   var regData = {
                       username : "kko_"+profile.id,
                       password : "kko_login",
                       displayname : profile.username
                   };
                   var User = new UserModel(regData);
                   User.save(function(err){
                       done(null,regData);
                   });
               }else{
                   done(null, user);
               }
           }
        );
    }
));

router.get('/kakao',
    passport.authenticate('kakao')
);

router.get('/kakao/callback',
    passport.authenticate('kakao',
        {
            successRedirect : '/',
            failureRedirect : '/auth/kakao/fail'
        }
    )
);

router.get('/kakao/success',function(req, res){
    res.send(req.user);
});

router.get('/kakao/fail',function(req, res){
    res.send('kakao login fail');
});

module.exports = router;