var disapprovalmodel = require('../Model/disapprovalmodel');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

exports.senddisapprovalmail = function(req,res)
{

    disapprovalmodel.deleteapplicant(req.query.positionid,req.query.username);
    //disapprovalmodel.getapplicantinformation(req.query.username,sendmail,req,res);
    

}
//mail is sent but need credintial from google to enable API to work
sendmail=function(req,res,result)
{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            xoauth2: xoauth2.createXOAuth2Generator(
                {
                    user: 'hashemalhariry33@gmail.com',
                    pass: 'hashemkhaled331998HHH@'
                }
            )
     
        }
      });
      
      var mailOptions = {
        from: 'hashemalhariry33@gmail.com',
        to: 'hadeerelnaggar@hotmail.com',
        subject: 'No position for you :D!!!',
        text: 'we are very happy to tell you that you were disapproved'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    
}