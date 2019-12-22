var express = require('express');
var path =require('path');
var app=express();
var db = require('../Model/database');

exports.applytojob=function(req,res){
    console.log(req.query.position+req.session.username);
    var query="INSERT INTO appliedjobs (username,positionid) VALUES ('"+req.session.username+"','"+req.query.position+"')";
    db.query(query,function (err, result, fields)
    {
       if (err) throw err;


    });
    
}