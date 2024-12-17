const express=require('express')
const users=require('./MOCK_DATA.json')
const fs=require('fs')

const app=express();
const port=8000;
app.listen(port,()=>{console.log(`server started at port ${port}`)});
app.use(express.urlencoded({extended:false}));

app.get('/about',(req,res)=>{

    // JSON = {"rohan":"rhl","boo":500} note: this is json object representation
    // (for array representation just enclose [{"rohan":"rhl","boo":500}]) 

    // `{"rohan":"rhl","boo":500}` this is json string representation

    const obj = {rohan:"rhl","boo":55} // note: this is a object not a json
    const A=JSON.stringify(obj);

    const JsonString= `{"rohan":"rhl","boo":500}` //note: this is a json string representation
    const B=JSON.parse(JsonString);

 //   const JsonObject={"rohan":"rhl","boo":500} this is a json object, but since it is not a json string it can't be parsed

 //   const obj = {rohan:"rhl","boo":55} since this is not a json, this can't be parsed

    console.log(A,B);
})


app.post('/about',(req,res)=>{ 
    users.push({...req.body,id: users.length+1});

    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        if(err)res.end('err')
        else res.json(users)
    })
})