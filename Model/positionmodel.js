var db = require('../Model/database');
var express = require('express');
var path = require('path');
var app = express();


module.exports = {
    selectAllPositions:function () {
        db.query("select * from position", function (err, result, fields) {
            if (err) throw err;
            return result;
        });
    },
    selectAllPositionswithHR: function(hrusername,req,res,callback) {
        db.query("select * from position WHERE hrusername = \'"+hrusername+"\'", function (err, result, fields) 
        {
            if (err) throw err;

            

           callback(req,res,result);
        });
    }
}