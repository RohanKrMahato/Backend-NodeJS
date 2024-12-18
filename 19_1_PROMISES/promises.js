// fetch('https://something.com').then().catch().finally()

// before consuming a Promise, we must understand how to create a promise

const promiseOne = new Promise(function (resolve,reject){
    // Do an async task
    // DB calls, cryptography, network
    setTimeout(function (){
        console.log('Async task is completed');
        resolve(); // this is important
    },1000)

})

// now we are consuming
promiseOne.then(function(){
    console.log("Promise consumed");
})

// creating and consuming in the same step

new Promise(function (resolve, reject){
    setTimeout(function(){
        console.log("Async task 2");
        resolve();
    },1000);
}).then(function(){ // 'then" takes a call_back function
    console.log("Async 2 resolved");
})

// making 3rd promise

const promiseThree = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve({username: "chai", email: "chai@example.com"}) // here we can pass an array, function anything.
    },1000);
})

// consuming
promiseThree.then(function(user){
    console.log(user); // we got user as object
})


// making 4th promise

const promiseFour = new Promise(function(resolve,reject){
    setTimeout(function(){
        let error=false;
        if(!error){
            resolve({username: "rohan", password: "123"});
        }else{
            reject('Error: Something went wrong')
        }
    },1000)
})

const Value = promiseFour.then((user)=>{ // there is no point in assigning it to Value, Value won't get anything, since This is not the way to do so , promises resolve in the '.then', if we return something inside a '.then' after that it will go to another '.then' in the chain. (Moral of the statement: we can't assign this to Value)

// if you console.log(Value) it will show you that "promise<pending>", the reason is promiseFour is undoubtely a promise, but promiseFour.then() is also a promise, so overall a promise will be assigned to Value and not our resolved data.

    console.log(user);

    return user.username; // note this won't go to the Value

}).then((username)=>{
    console.log(username);
}).catch((err)=>{
    console.log(err)
}).finally(()=>{
    console.log("The Promise is either resolved or rejected");
})


// makig 5th Promise
const promiseFive = new Promise(function(resolve,reject){
    setTimeout(function(){
        let error=false;
        if(!error){
            resolve({username: "Javascript", password: "123"});
        }else{
            reject('Error: JS went wrong');
        }
    },1000)
})

// like .then , we have another syntax called as ASYNC , AWAIT syntax to consume the promise

// where do we use await? we use await to resolve a Promise

// NOTE: `await` pause the execution of the function at the point where await is called untill the Promise gets resolve or rejected

// note: async await syntax can't directly handle the error
// to handle the error, use the Try Catch Block

async function consumePromiseFive(){
    const response = await promiseFive; // here it is not taking care of the error

    console.log(response)
}

consumePromiseFive(); // by calling the function we are consuming it, WOW !!!


// Use the Try Catch Block to handle the error

async function consumePromiseFive_Secure(){
    try{
        const response = await promiseFive; // NOTE: await resolves the promise and return the resolved data

        console.log(response);

    } catch(error){
        console.log(error);
    }
}

consumePromiseFive_Secure();

// trying a real problem using fetch function

async function getAllUsers(){
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')

        // const data = response.json();

// here we have to note something, response.json(), since it also takes time thus it also return a promise, so we need to do a await

        // console.log(data); //this will show 'promise<pending>'

// correct way
    const Correct_way_Data = await response.json();

    console.log(Correct_way_Data); // now this will show the data
        
    } catch (error) {
        console.log(error)
    }
}

getAllUsers();