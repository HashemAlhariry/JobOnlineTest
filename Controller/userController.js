var express = require('express');
var path =require('path');
var app=express();
var db = require('../Model/database');
var usermodel = require('../Model/usermodel');

exports.Login = function(req,res)
{
  console.log('login');
  var email=req.query.email;
  var password=req.query.password;
  console.log(req.query.email);
  console.log(req.query.password);
  var session =  require('express-session');


  db.query("select * from applicant where email = \'"+email+"\' AND password = \'"+password+"\'",function (err, result, fields) 
  {
    if (err) throw err;
    else if(result.length==0){
   
    

      db.query("select * from hr where email = \'"+email+"\' AND password = \'"+password+"\'",function (err, result, fields) 
      {
        if (err) throw err;
        else if(result.length==0){
          res.redirect('/');
        }
        else
        {
          req.session.username =  result[0].username;
          res.redirect('/router/hrfirst');
          
        }
      });
    }
    else{
      console.log(result);  
      req.session.username =  result[0].username;
      console.log("RESULT"+result[0].username);
      res.redirect('/router/position');      
    }
  });
  
};

exports.applicantsignup = function(req,res){
   var username = req.query.usernameapplicant;
   var email=req.query.emailaddressapplicant;
   var password = req.query.passwordapplicant;
   var telephonenumber = req.query.phonenumberapplicant;
   var CV="CV.pdf";
   var query="INSERT INTO applicant (username,email,password,telephone_number,CV) VALUES ('"+username+"','"+email+"','"+password+"','"+telephonenumber+"','"+CV+"')";
   db.query(query,function (err, result, fields) {
    if (err) throw err;
   })
   res.send('sign up');
};

exports.checkusername = function(req,res)
{

  usermodel.checkusernameexistance(req.query.username);
  console.log(usermodel.checkusernameexistance(req.query.username));

};





