const express=require('express')
const users=require('./MOCK_DATA.json')
const fs=require('fs')

const app=express();
const port=8000;
app.listen(port,()=>{console.log(`server started at port ${port}`)});
app.use(express.urlencoded({extended:false}));

app.get('/about',(req,res)=>{

    //JSON stands for Javascript Object Notation (it can be array of objects as well, note it)

    const obj = {rohan:"rhl","boo":55} // note: this is a object not a json

    const A=JSON.stringify(obj); // Here A = '{"rohan":"rhl","boo":55}'  [note it is a string, (string with JSON format) ]

    const B=JSON.parse(A); // here B = {rohan:'rhl', boo:55} (note this is a object)

    console.log(A,B);
    console.log(typeof(A), typeof(B));
    
})

app.post('/about',(req,res)=>{ 
    users.push({...req.body,id: users.length+1});

    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
    // here JSON.stringify(users) is converting it to string and writing to the MOCK_DATA  (remember string is a data-type)

        if(err)res.end('err')
        else res.json(users)
    })
})