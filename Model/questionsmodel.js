var db = require('../Model/database');
var express = require('express');
var path = require('path');
var app = express();

module.exports = {
    // show questions and answers (0,1)
    getAllQuestionsGivenExamType:function(examtype)
    {
    db.query("select * from questions WHERE ExamType = \'"+examType+"\'",function (err, result, fields)
    {
        if (err) throw err;
        return result;
    });
    },
    getAllCorrectAnwersGivenQuestionID:function(QuestionId){
        db.query("select * FROM answers where QuestionID = \'"+QuestionID+"\' and Correct = 1",function(err,result,fields){
            if(err) throw err;
            return result;
        });
    },
    getAllFalseAnwersGivenQuestionID:function(QuestionId){
        db.query("select * FROM answers where QuestionID = \'"+QuestionID+"\' and Correct = 0",function(err,result,fields){
            if(err) throw err;
            return result;
        });
    },
      getquestionid:function(req,question)
      {
        db.query("select * FROM questions where QuestionText = \'"+question+"\'",function(err,result,fields){
            if(err) throw err;
            var questionid=result[0].QuestionID;
            var newright1=req.query.newright1; 
            addnewcorrectanswer(questionid,newright1);
            var newright2=req.query.newright2; 
            addnewcorrectanswer(questionid,newright2);
            var newwrong1=req.query.newwrong1;
            addnewwronganswer(questionid,newwrong1);
            var newwrong2=req.query.newwrong2; 
            addnewwronganswer(questionid,newwrong2);
            var newwrong3=req.query.newwrong3;
            addnewwronganswer(questionid,newwrong3);

        });
      },
         // add questions and answers (0,1)
        addnewquestion:function(examtype,question)
        {
        db.query("INSERT into questions (QuestionText,ExamType) VALUES (\'"+question+"\',\'"+examtype+"\')",function (err, result, fields)
        {
            if (err) throw err;
        
        });
        },
      //update questions and answers (0,1)
      //change questiontext with the id of the question
     updatequestion:function(questionid,text)
      {
            db.query("UPDATE questions SET QuestionText = \'"+text+"\' WHERE QuestionID = \'"+questionid+"\'",function (err, result, fields)
            {
                if (err) throw err;
                return result;
            });
      },
      updateanswer:function(answerid,text) //update answertext in the answer table 
      {
          db.query("UPDATE answers SET AnswerText = \'"+text+"\' WHERE AnswerID = \'"+answerid+"\'",function(err,result,fields){
              if(err) throw err;
              return result;
          });
      },
    
     //delete question and answer
     deleteanswer:function(questionid) //update answertext in the answer table 
      {
          db.query("DELETE FROM answers WHERE QuestionID = \'"+questionid+"\'",function(err,result,fields){
              if(err) throw err;
              return result;
          });
      },  
      deletequestion:function(questionid) //update answertext in the answer table 
      {
          this.deleteanswer(questionid);
          db.query("DELETE FROM questions WHERE QuestionID = \'"+questionid+"\'",function(err,result,fields){
              if(err) throw err;
              return result;
          });
      },  


      //show available ExamType
      selecttype:function(req,res,callback)
      {
        db.query("SELECT DISTINCT ExamType FROM questions",function(err,result,fields){
            if(err) throw err;

            callback(req,res,result);
        });

        
      },
      deleteexamtype:function(examtype)
      {
          db.query("select QuestionID from questions where ExamType = \'"+examtype+"\'",function(err,result,fields){
            if(err) throw err;
                for(var i=0;i<result.length;i++)
                {
                    this.deletequestion(result[i]); //loop for every questionid and delete them
                }   
          })
          
      }
       
      





}

addnewcorrectanswer=function(questionid,rightanswer)
{
   db.query("INSERT into answers (QuestionID,AnswerText,Correct) VALUES (\'"+questionid+"\',\'"+rightanswer+"\',1)",function(err,result,fields){
      if(err) throw err;
      return result;
    });
}

addnewwronganswer =function(questionid,wronganswer)
      {
          db.query("INSERT into answers (QuestionID,AnswerText,Correct) VALUES (\'"+questionid+"\',\'"+wronganswer+"\',0)",function(err,result,fields){
              if(err) throw err;
              return result;
          });
      }