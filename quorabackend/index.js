var express = require('express')
var app = express()

var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
//Passport Authentication
var passport = require('passport');

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


// var login = require('./routes/login.js')
// var signUp = require('./routes/signUp.js')

// app.use('/login',login)
// app.use('/signUp',signUp)
app.get('/',function(req,res){
    res.send("Hello Hello")
})

app.listen(4000,function(){console.log("Server listening on port 4000")})