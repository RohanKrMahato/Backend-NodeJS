const mongoose = require('mongoose');

//Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required : true,
    },
    lastName : {
        type: String,
    },
    email:{
        type: String,
        required : true,
        unique: true,
    },
    jobTitle: {
        type: String,
    }
},
{timestamps: true}
)
// since we did -> connectMongoDb('mongodb://127.0.0.1:27017/learning')
 
// here "learning" is the database name, and "users" will be the name of a collection in the database
const User = mongoose.model('user' , userSchema);
// user will automatically get saved as plural form i.e "users"

module.exports = User;