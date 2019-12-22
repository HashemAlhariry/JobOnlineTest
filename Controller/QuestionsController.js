var express = require('express');
var path =require('path');
var app=express();
var db = require('../Model/database');
var questionmodel = require('../Model/questionsmodel');


var questionArray=new Array();  //array of questions to display for the applicant 
var answerArray=new Array(); //array of the return answers 
var arrayofchosenexam= new Array();
exports.addnewquestion = function(req,res)
{
        var examtype =req.query.examtype;  
        var question = req.query.question;
        questionmodel.addnewquestion(examtype,question);
        console.log("QUESTION IS "+ question);
        questionmodel.getquestionid(req,question);
         


}
//get random question for candidates
exports.getRandomQuestions=function(req,res,examType)
{

    db.query("select * from questions WHERE ExamType = \'"+examType+"\'",function (err, result, fields)
    {

        if (err) throw err;
        else if(result.length==0){
        console.log('No Question Type found');
        }
        else
        {   
            //this for getting random questions from the database and delet from the array to prevent tekrar
            for(var i=0;i<2;i++)
            {
            var random=Math.floor(Math.random() * result.length);


            // question to dispaly for specific type 
            var question = result[random];
            questionArray.push(question);
            result.splice(random,1);
            }
            
        }
        for(var i=0;i<questionArray.length;i++){
            var questionAnswers=new Array(); 
            db.query("select * FROM answers where QuestionID = \'"+questionArray[i].QuestionID+"\' and Correct = 1",function(err,result,fields){
                if(err) throw err;
                else if(result.length>0){
                    console.log("correct answers:");
                    console.log(result);
                    var random=Math.floor(Math.random() * result.length);
                    console.log("chosen correct answer:"+result[random]);
                    questionAnswers.push(result[random]);
                
                }
            })
            db.query("select * FROM answers where QuestionID = \'"+questionArray[i].QuestionID+"\' and Correct = 0",function(err,result,fields){
                if(err) throw err;
                else if(result.length>0){
                    console.log("false answers:");
                    console.log(result);
                    for(var j = 0 ;j<3 ;j++)
                    {

                    var random=Math.floor(Math.random() * result.length);
                    console.log("chosen false answer"+result[random]);
                    questionAnswers.push(result[random]);
                    result.splice(random,1);

                    }
                
                }
            })
            // this array contains arrayofanswers for each question to get the array of specifc answer we can get them by index
            answerArray.push(questionAnswers); 
        }

    }); 



}
exports.addexamwithquestion = function(req,res,arrayofchosenexam)
{
for(var index=0; index<arrayofchosenexam.length;index++)
{
    getRandomQuestions(req,res,arrayofchosenexam[index]);

}

}