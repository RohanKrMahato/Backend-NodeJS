 const express = require("express");
const mongoose = require('mongoose');

const app = express();
const PORT = 8000;

//Connection (Note: this is a Asynchronous function)
mongoose.connect('mongodb://127.0.0.1:27017/learning') // here "learning" is the name of database
.then(()=> console.log("MongoDB Connected"))
.catch((err) => console.log("Mongo Error" , err));

//Schema
const userSchema = new mongoose.Schema({// const userSchema = new mongoose.Schema({},{}) 
    firstName: {
        type: String,
        required : true,
    },
    lastName : {
        type: String, // since we didn't put required here, It can be present or it may not be depending on the user preference
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

// Model (this is synchronous, since This line simply registers a model with Mongoose. It doesn't interact with the database or involve any asynchronous operations.)

const User = mongoose.model('user' , userSchema); // we are making a MODEL here
// Note: this line itself is not a asynchronous, but if we do User.find({}), User.create({}) ... etc ... then it will try to find in the MongoDB database, therefore User.find({}), User.create({})...etc... will return a Promise

// Model Naming

// The model name in Mongoose (in this case, user) is typically used to define the structure of a single document. When you specify 'user' in mongoose.model('user', userSchema), Mongoose infers the plural collection name (users) by default.
// Mongoose automatically pluralizes the name of the model when it maps it to the collection name in the database. So, User corresponds to the users collection, even though the model name is singular.

//Middlewares
app.use(express.urlencoded({extended:false}));


//Routes
app.get('/users', async(req, res)=>{

    const allDbUsers = await User.find({});

    const html = `
    <ul>
    ${allDbUsers.map(user => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    <ul>
    `
    res.send(html)
})

//REST Api

app.get('/api/users', async(req, res)=>{

    const allDbUsers = await User .find({}); // Now using the Model we are manipulating the MongoDB database, hence it is returning promise.
    return res.json(allDbUsers);

})

app.
route('/api/users/:id')
.get( async(req, res)=>{
    
    const user = await User.findById(req.params.id)
    if(!user) return req.status(404).json({error : 'User Not found'});
    return res.json(user);

})
.patch(async (req,res) =>{
  await User.findByIdAndUpdate(req.params.id ,{ lastName:"Changed" } );
    return res.json({status : "Success"});
})
.delete( async(req , res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({status : "Success"});
})

app.post('/api/users' , async(req , res)=>{
    // TODO : Create new user

    const  body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({msg: 'ALl fields are required'});
    }


    const result = await User.create({
        firstName : body.first_name,
        lastName : body.last_name,
        email: body.email,
        gender : body.gender,
        jobTitle: body.job_title
    });

    console.log("result" , result);

    return res.status(201).json({msg: "Success"})
});

 // this is also Asynchronous
app.listen(PORT , ()=>{
    console.log(`Server started at Port ${PORT}`)
})