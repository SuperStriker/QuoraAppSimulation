var express = require('express')
var app = express()
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
//Passport Authentication
var passport = require('passport');
var multer = require('multer');
var Model = require('../kafka-backend/config/MongoConnection');


app.use(session({
    secret: 'cmpe-273-quora-app',
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 100,
    activeDuration: 5 * 60 * 100
  }));
app.use(cors({origin:'http://localhost:3000',credentials:true}))

require('./config/passport')(passport);

  
app.use(bodyParser.json())


var login = require('./routes/login.js')
var signUp = require('./routes/signUp.js')
var profile = require('./routes/updateProfile.js')


var following = require('./routes/following.js')
var userAnswers = require('./routes/userAnswers.js')
var userQuestions = require('./routes/userQuestions.js')
var getBookmarks = require('./routes/getBookmarks.js')
var updateAnswer = require('./routes/updateAnswer.js')
var notifications = require('./routes/notifications')

const createConversation = require('./routes/createConversation');
const getConversation = require('./routes/getConversation');
const getMessage = require('./routes/getMessage');
const createMessage = require('./routes/sendMessage');
const followTopic = require('./routes/followTopic');
const followUser = require('./routes/followUser');
const getFollowers = require('./routes/getFollowers');
const content = require('./routes/content');
const searchTopicContent = require('./routes/searchTopicContent')
const deleteUser = require('./routes/deleteUser')
const getProfile = require('./routes/getProfile')
const getAllQuestions = require('./routes/getAllQuestions')
const createQuestion = require('./routes/createQuestion')
const getAnswers = require('./routes/getAnswers')
//var writeAnswer = require('./routes/writeAnswer')
var followQuestion = require('./routes/followQuestion')
var searchQuestion = require('./routes/searchQuestion')
const getUserFollowingData = require('./routes/getUserFollowingData')
var signUp = require('./routes/signUp.js')
var createTopic = require('./routes/createTopic');
var getActivity = require('./routes/getActivity.js')
var searchTopic = require('./routes/searchTopic');
var redisTest = require('./routes/redisTest');
var upvoteAnswers= require('./routes/upvoteAnswers')

app.use('/login',login)
app.use('/signUp',signUp)
app.use('/upvoteAnswer',upvoteAnswers)
app.use('/updateProfile',profile)
//app.use(createConversation);
//app.use(getConversation);
//app.use(getMessage);
//app.use(createMessage);
app.use(followTopic);
app.use('/followUser',followUser);
app.use(getFollowers);

app.use('/getFollowing',following)
app.use('/getActivity',getActivity)
app.use('/userAnswers',userAnswers)
app.use('/userQuestions',userQuestions)
app.use('/getBookmarks',getBookmarks)
app.use('/updateAnswer',updateAnswer)
app.use('/content',content)
app.use('/searchTopicContent',searchTopicContent)
app.use('/delete',deleteUser)
app.use('/getProfile',getProfile)
app.use('/getAllQuestions',getAllQuestions)

app.use('/allQuestions' ,redisTest)
app.use('/notifications',notifications)
app.use('/createQuestion',createQuestion)
app.use('/getAnswers',getAnswers)
app.use('/getAllAnswers',getAnswers)
//app.use('/writeAnswer',writeAnswer)
app.use('/followQuestion',followQuestion)
app.use('/searchQuestion',searchQuestion)
app.use('/searchTopic', searchTopic)

app.use('/getUserFollowingData',getUserFollowingData)
app.use('/createTopic', createTopic)



const fs = require('fs');

const storagepic = multer.diskStorage({
  destination: function (req, file, cb) {
      const dir = `./uploads/profile`
      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
      }
      cb(null, dir);
     
  },
 
  filename: (req, file, cb) => {

      const newFilename = `profile_${req.body.description}.jpg`;
      cb(null, newFilename);
  },
});

const uploadpic = multer({ storage : storagepic });

app.post('/addpic', uploadpic.single('selectedFile') , (req,res) => {
   
    res.send();});




app.post('/getprofilepic/:file(*)',(req, res) => {
    console.log("Inside get profile pic");
    var file = req.params.file;
    var fileLocation = path.join(__dirname + '/uploads/profile',file);
    if (fs.existsSync(fileLocation)) {
        var img = fs.readFileSync(fileLocation);
        var base64img = new Buffer(img).toString('base64');
        res.writeHead(200, {'Content-Type': 'image/jpg' });
        res.end(base64img);
    }
    else
    {
        res.end("");
    }

});

// app.post('/getImageforAnswer/:file(*)',(req, res) => {
//     console.log("Inside get answer pic");
//     var file = req.params.file;
//     var fileLocation = path.join(__dirname + '/uploads/answer',file);
//     if (fs.existsSync(fileLocation)) {
//         var img = fs.readFileSync(fileLocation);
//         var base64img = new Buffer(img).toString('base64');
//         res.writeHead(200, {'Content-Type': 'image/jpg' });
//         res.end(base64img);
//     }
//     else
//     {
//         res.end("");
//     }

// });

app.get('/getImageforAnswer',(req,res)=>{
    Model.Img.findOne({},function(err,img){
        if (err)
            res.send(err);
    // console.log(img);
        res.contentType('json');
        res.send(img);
    })
})

app.get('/allQuestions', (req,res) => {
    Model.QuestionsModel.find({  },(err,question)=>{
        if(question)
        {
           res.end(JSON.stringify(question));
        }
        else
        {
           console.log("error");
        }
    
    })
});


const storagepic2 = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = `./uploads/answers`
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, dir);
       
    },
   
    filename: (req, file, cb) => {
  
        const newFilename = `Answer${req.params.id}.jpg`;
        cb(null, newFilename);
    },
  });

  const uploadpic1 = multer({ storage : storagepic2 });
  var new_img=null
 app.post('/addpicforanswer/:id', uploadpic1.single('selectedFile') , (req,res) => {
    new_img = new Model.Img;
    new_img.img.data = fs.readFileSync(req.file.path)
    new_img.img.contentType = 'image/jpeg';
    new_img.save();
    res.send();});

app.post('/writeAnswer',uploadpic1.single('selectedFile'),(req,res)=>{
 
    Model.UserModel.findOne({"Email":req.body.owner},function(err,user)
    {
        
       // var imageOfUser = user.ProfilePicture
        var answer = Model.AnswerModel({
            answer : req.body.answer,
            owner : req.body.owner,
            isAnonymous:req.body.isAnonymous,
            date:req.body.date,
            question:req.body.question,
            imageId : req.body.imageId,
            images : new_img
        })
        user.QuestionsAnswered =  user.QuestionsAnswered || []
        user.QuestionsAnswered.push(answer)
        console.log("Pushing"+answer)
        user.save().
        then(res=>console.log(res))
        .catch(err=>console.log("Error saving user"+err))
 
        answer.save()
        .then(response =>{
 
            var activity = Model.ActivityModel ({
                action : "answer",
                owner_email : req.body.owner,
                question : {
                    Question : req.body.question
                }
            });
 
            activity.save();
            Model.QuestionsModel.findOne({"Question":req.body.question},(err,question)=>{
               // console.log("I am Ques"+question)
                question.Answers.push(answer)
                question.save().
                then(response=>{
                 res.writeHead(200,{
                                 'Content-Type' : 'text/plain'
                             })
                    res.end("Created Answer Successfully")
                })
                .catch(err=>
                 {
                     res.writeHead(400,{
                     'Content-type' : 'text/plain'
                      })
                     res.end('Unable to create question')
                     
                 })
 
            })
        })
 
 
    })
})




app.listen(4000,function(){console.log("Server listening on port 4000")})