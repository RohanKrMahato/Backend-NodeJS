const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema(
{
    shortId : {
        type : String,
        required : true,
        unique: true,
    },
    redirectURL :{
        type : String,
        required : true,
    },
    visitHistory: [
        { timestamp : {
            type : Number
        }}
    ],
    createdBy : {
        type: mongoose.Schema.Types.ObjectId, // here we put the ID of the document (present in the 'users' collection) which we want to refer.
        ref: 'users'
        // referencing that, the ID which we provided belong to the 'users' collection.
    }
} , 
{ timestamp : true }
);


const URL = mongoose.model("url" , urlSchema)

module.exports = URL;