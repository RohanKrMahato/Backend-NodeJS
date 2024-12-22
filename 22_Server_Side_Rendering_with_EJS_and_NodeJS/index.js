const express = require("express");
const { connectToMongoDB } = require('./connect')
const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRoute')
const path = require('path') // note
const URL = require('./models/url');

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then (()=> console.log("MongoDB connected"))

app.set("view engine" , "ejs") // set the view engine

app.set("views" , path.resolve("./views")) // telling where we have kept our EJS files

app.use(express.json())
app.use(express.urlencoded({extended:false})) //for form data

app.use("/url" , urlRoute)
app.use("/" , staticRoute)

// Server Side Rendering -> 
// Write html on server side -> complicated
// For ease we use EJS
app.get('/test' , async(req , res)=>{
  const allUrls = await URL.find({});
  // return res.end(`
  //   <html>
  //     <head></head>
  //     <body>
  //       <ol>
  //         ${allUrls.map( url => `<li>
  //           ${url.shortId} - 
  //           ${url.redirectURL} - 
  //           ${url.visitHistory.length}</li>`
  //           ).join("")
  //           }
  //       </ol>
  //     </body>
  //   </html>`
    
  // )


  // Note: res.render('EJS file name');
  // or
  // res.render('EJS file name', {variable we want to pass in the EJS file});
  return res.render('home',{
    urls: allUrls,
  })
})



app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId : shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    res.redirect(entry.redirectURL);
 });

app.listen(PORT , ()=> console.log(`Server started at port : ${PORT}`))