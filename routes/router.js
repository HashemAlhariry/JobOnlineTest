var express = require('express');
var router = express.Router();
var userController = require('../Controller/userController');
var positionController = require('../Controller/positionsController');
var questionsController= require ('../Controller/QuestionsController');
var applytojobcontroller= require ('../Controller/applytojobcontroller');
var hrfirstcontroller= require ('../Controller/hrfirstController');
var examtypeswithr= require ('../Controller/examtypescontroller');  
var disapprovalcontroller = require('../Controller/disapprovalcontroller');
var approvalcontroller = require('../Controller/approvalcontroller');

console.log('Router Activated:....');


router.get('/login',userController.Login);
router.get('/signup',userController.applicantsignup);
router.get('/position',positionController.getpositions);
router.get('/questions',questionsController.getRandomQuestions);
router.get('/apply',applytojobcontroller.applytojob);
router.get('/checkusername',userController.checkusername);
router.get('/examtypes',examtypeswithr.getexamtype);
router.get('/hrfirst',hrfirstcontroller.getpositionswithhrname);
router.get('/disapproval',disapprovalcontroller.senddisapprovalmail);
router.get('/addquestion',questionsController.addnewquestion);
router.get('/approval',approvalcontroller.approval);

module.exports = router;