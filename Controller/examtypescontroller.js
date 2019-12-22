var questionsmodel = require('../Model/questionsmodel');


exports.getexamtype=function(req,res)
{
   questionsmodel.selecttype(req,res,getexams);


}
getexams = function(req,res,examtype){
    //every thing is working fine except rendering the page  
    console.log(req.session.username);
    res.render('examtypes',
    {
       examtype1:examtype,
       username:req.session.username

    });
}
exports.addnewquestion = function(req,res){
   
}