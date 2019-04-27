const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema; 

mongoose.connect("mongodb+srv://quora:quora@cluster0-6ddbb.mongodb.net/QuoraApp?retryWrites=true"


).then(() => {

    console.log('Database connection successful')
  })
  .catch(err => {
    console.log(err);
    console.error('Database connection error')
  })
  var AnswerSchema = new Schema({
    answer: { type: String, trim: true},
    owner: { type: String, trim: true },
    images: { type: Buffer, trim: true },
    isAnonymous: { type: Boolean, trim: true },
    upVotes: { type: Number, trim: true, default: "" },
    downVotes: { type: Number, trim: true, default: "" },
    comments: { type: Array, trim: true, default: "" },
    date : { type: String, trim: true, default: "" },
    question : { type: String, trim: true, default: "" },

})

  var QuestionsSchema = new Schema({
    Question: { type: String, trim: true},
    QuestionOwner:{ type: String, trim: true },
    Topics: { type: Array, trim: true, default: "" },
    Followers: { type: Array, trim: true, default: "" },
    Answers: [AnswerSchema],
    PostedTime : { type: String, trim: true, default: "" }
    
})

  var UserSchema = new Schema({
    Name: { type: String, trim: true},
    City: { type: String, trim: true },
    State: { type: String, trim: true },
    ZipCode: { type: String, trim: true, default: "" },
    Profile: { type: String, trim: true, default: "" },
    Education: { type: String, trim: true, default: "" },
    CareerInformation: { type: String, trim: true, default: "" },
    Description: { type: String, trim: true, default: "" },
    ProfileCredential: { type: String, trim: true, default: "" },
    Questions: [QuestionsSchema],
    QuestionsFollowed: { type: Array, trim: true, default: "" },
    AnswersBookmarked : {type :Array,trim:true,default:""},
    Topics : {type:Array},
    Followers : {type:Array},
    Following : {type:Array},
    ProfileViews : {type:Number},
    QuestionsAnswered:{type :Array,trim:true,default:""},
    Email: { type: String, trim: true, default: 0 },
    Password: { type: String, trim: true, default: "" },
})



var ConversationSchema = new Schema({
    From: { type: String, trim: true},
    To:{ type: String, trim: true },
    Subject: { type: String, trim: true },
    messages: { type: Array, trim: true, default: "" }

})




var TopicsSchema = new Schema({
    topicName : { type: String, trim: true}
    
})





var QuestionsModel = mongoose.model('Question',QuestionsSchema)
var UserModel =  mongoose.model('Users',UserSchema)
var AnswerModel =  mongoose.model('Answer',AnswerSchema)
var ConverstionModel = mongoose.model('Converstion',ConversationSchema)
var TopicsModel = mongoose.model('TopicsSchema',TopicsSchema)

module.exports={
    UserModel,
    AnswerModel,
    ConverstionModel,
    QuestionsModel,
    TopicsModel
}