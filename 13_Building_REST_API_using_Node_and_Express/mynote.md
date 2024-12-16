JSON is like a object, it can be array as well,
but not don't confuse that JSON is a object.

Note: Converting a string to a native object is called deserialization, while converting a native object to a string so it can be transmitted across the network is called serialization.

In JSON we can't use single quote, we must use double quote.

JSON.parse()

    JSON.parse() is used to convert a JSON-formatted string into a JavaScript object.
    The string must be in valid JSON format for JSON.parse() to work correctly. If it's not, it will throw an error.

    let jsonString = '{"name": "John", "age": 30}';
    let parsedObject = JSON.parse(jsonString);
    console.log(parsedObject);  // Output: { name: 'John', age: 30 }


JSON.stringify()

    JSON.stringify() is used to convert a JavaScript object into a JSON-formatted string.
    When you need to send data (e.g., in an HTTP request), you generally convert a JavaScript object into a string using JSON.stringify().

    let obj = { name: "John", age: 30 };
    let jsonString = JSON.stringify(obj);
    console.log(jsonString);  // Output: '{"name":"John","age":30}'


note:

    this is a object:

        {
    name: "Alice",
    age: 30,
    isEmployed: true
  };

  this is a JSON:

  {
  "name": "Alice",
  "age": 30,
  "isEmployed": true
}



What Happens with an Array in res.json()?

If the data in your JSON file is an array (denoted by []), res.json() will:

    Automatically serialize the array into a JSON string.
    Send it to the client as a JSON response with the correct Content-Type header (application/json).

