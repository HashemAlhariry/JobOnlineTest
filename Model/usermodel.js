var db = require('../Model/database');
var express = require('express');
var path =require('path');
var app=express();

module.exports = {
    checkusernameexistance:function(username){
    db.query("select * from applicant where username = \'"+username+"\'",function(err,result,field){
        if(err)throw err;
        else if(result.length == 0){
            return true;
        }
        return false;
    });
},


   checkApplicant:function(email,password){
       db.query("select * from applicant where email = \'"+email+"\' AND password = \'"+password+"\'",function(err,result,field){
           if(err) throw err
           return result;
       })
   },

   checkHR:function(email,password){
    db.query("select * from hr where email = \'"+email+"\' AND password = \'"+password+"\'",function(err,result,field){
        if(err) throw err
        return result;
    })
   },
   signupApplicant:function(username,email,password,telephone_number,CV){
       db.query("INSERT INTO applicant (username,email,password,telephone_number,CV) VALUES ('"+username+"','"+email+"','"+password+"','"+telephonenumber+"','"+CV+"')",function(err,result,field){
        if(err) throw err
    })
   }
}

