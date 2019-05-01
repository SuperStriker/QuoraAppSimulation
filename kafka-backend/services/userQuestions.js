var Model = require('../config/MongoConnection')

function handle_request(message,callback){
    console.log("Inside kafka user questions",message);
    Model.UserModel.findOne({
        'Email' : message.Email
    },(err,user)=>{
        if(err)
        {
            console.log("Unable to fetch user details",err)
            callback(err,null)
        }
        else
        {
       callback(null,user.Questions)

        }
    })
}

exports.handle_request =  handle_request