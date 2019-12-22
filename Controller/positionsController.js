var express = require('express');
var path =require('path');
var app=express();
var db = require('../Model/database');

exports.getpositions=function(req,res)
{
 
db.query("select * from position",function (err, result, fields)
 {
    if (err) throw err;
    
    var username=req.session.username;
    res.render('position',
    {
       position :result,
       username :username

    });
   
    

 });

};

