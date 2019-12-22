var db = require('../Model/database');
var express = require('express');


module.exports = {

    deleteapplicant:function(positionid,username,req,res)
    {
        
        db.query("DELETE FROM appliedjobs WHERE positionid = \'"+positionid+"\' AND username = \'"+username+"\'", function (err, result, fields) 
        {
            if (err) throw err;
            return result;

        });
    },
    getapplicantinformation:function(username,callback,req,res){
        db.query("select * from applicant where username = \'"+username+"\'",function(err,result,field){
            if(err)throw err;
            callback(req,res,result);
           
        });
       
    },




}