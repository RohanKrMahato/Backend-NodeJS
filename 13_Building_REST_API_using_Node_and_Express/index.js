const express = require("express");
const users = require("./MOCK_DATA.json")

const app = express();
const PORT = 8000;

//Routes
app.get('/users', (req, res)=>{
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    <ul>
    `
    // will the map render the html? but don't the map gives us an array?
    // ChatGPT said:
    // ChatGPT
    
    // Yes, the map method returns an array, but the array is transformed into a string when used inside a template literal (backticks ``) or join() is called implicitly.
    // What happens in your code:
    
    //     map Method:
    //         users.map() processes each element of the users array and returns a new array where each element is replaced with the string <li>${user.first_name}</li>.
    
    //     Array to String Conversion:
    //         When this new array is placed inside a template literal (``), it is implicitly converted to a string. In JavaScript, an array's toString method joins its elements with commas.
    //         The result will look like this: <ul><li>John</li>,<li>Jane</li></ul>, which includes unwanted commas (to remove the comman we use join(""))

    res.send(html)
})

//REST Api

app.get('/api/users', (req, res)=>{
    return res.json(users); //return is not required, but using it can improve code readability and consistency, especially in more complex functions where you may have additional logic following the response. In simple routes like this, it's fine to leave it out.
})

// res.json(jsonfile):

//     res: Refers to the response object in Express. It is used to send a response back to the client (browser or any other client making a request).
//     jsonfile: This is the JavaScript object (or a JSON-compatible object) that you want to send back as a response. It will be automatically converted into a JSON string and sent to the client with the correct Content-Type header (application/json).

app.route('/api/users/:id').get((req, res)=>{ // :id (dynamic route)
    
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);

})
.patch((req, res) =>{     //app.route().get().post().patch().delete() we can also separate it , but writing like this is more convenient
    // TODO : edit the user with id
    return res.json({status : 'Pending'})
})
.delete((req , res)=>{
    // TODO : delete the user with id
    res.json({status : 'Pending'})
})



// app.post('/api/users' , (req , res)=>{    // 
//     // TODO : Create new user
//     return res.json({status: "pending"});
// })

// app.patch('/api/users/:id' , (req , res)=>{
//     // TODO : Edit the user with id
//     return res.json({status: "pending"});
// })

// app.delete('/api/users/:id' , (req , res)=>{
//     // TODO : delete the user with id
//     return res.json({status: "pending"});
// })

app.listen(PORT , ()=>{
    console.log(`Server started at Port ${PORT}`)
})