var positionmodel = require('../Model/positionmodel');
var appliedjobmodel = require('../Model/appliedjobsmodel');
exports.getpositionswithhrname=function(req,res)
{
    var username = req.session.username;
    positionmodel.selectAllPositionswithHR(username,req,res,getpositions);
  

}
getpositions = function(req,res,positionswithHR)
{
   
     
        //select all applied candidates
        appliedjobmodel.selectAllapplicantsid(positionswithHR,req,res,getcandidates); 
       


}
getcandidates =  function(req,res,allapplied,positionswithHR){
 
    console.log("allapplied");
    res.render('hrfirst',
    {
       position :positionswithHR,
       username :req.session.username,
       allapplied :allapplied

    });
}