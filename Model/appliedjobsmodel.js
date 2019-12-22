var db = require('../Model/database');
var express = require('express');
var path = require('path');
var app = express();
var async = require("async");

module.exports = {


    selectAllapplicantsid:function (positionsforHR,req,res) 
    {
        
        var allapplied=new Array();
        var cheking=false;
        async.forEachOf(positionsforHR, function (positionid, key, callback) {
           
            db.query("select * from appliedjobs where positionid ='" + positionsforHR[key].position_id + "'",
             function (err, result) {
                if (result)
                {
                    //console.log(result[0].username);
                    allapplied.push(result);
                 
                    if(key==positionsforHR.length-1)
                        {
                            getappliedpositions(req,res,allapplied,positionsforHR);
                        }

                    
                }else{
                
                    //callback(req,res,allapplied,positionsforHR);
                }
            });
        }, function (error) {
            if (error) {
                console.log("error");
                
            } else {
               
                //res.send(response);
            }
        })

    }
   
       
            
        
    }

    
    getappliedpositions = function(req,res,appliedcandidates,positions){
    

        res.render('hrfirst',
        {
            position :positions,
            appliedcandidates :appliedcandidates,
            username :req.session.username
        });
    }

