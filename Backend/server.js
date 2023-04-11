const express = require("express"); //imports the Express.js framework. Its an application framework for Node.js that allows for the creation of an API server.

const app = express(); //creates an Express.js application.

app.use(express.json()); //sets up a middleware to parse incoming JSON data into an object.

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
}); //sets up a middleware to enable cross-origin requests by setting the Access-Control-Allow-Origin header to ‘*’, which allows requests from all domains.
const MongoClient = require("mongodb").MongoClient; // imports the MongoDB Node.js driver, MongoClient.
app.set("port", 3000); //sets up the API server to listen on port 3000.

let db; //declares a variable to store a reference to the MongoDB database.
MongoClient.connect(
    "mongodb+srv://HudaShaikh25:252203@cluster0.uhjed02.mongodb.net/test",
    (err, client) => {
        db = client.db("Webstore");
    }
);

app.use(express.static("public")); //sets up static file serving for the public directory.

//req, res, and next. req is the request object, which contains information about the request being made. res is the response object, which is used to send a response back to the client. 
//next is a function that is used to pass control to the next middleware function in the stack.
//The "/collection/:collectionName" parameter defines the path of the request
//collection name placeholder for any collection name


app.param("collectionName", (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName);
    return next();
}); //sets up a middleware to store a reference to the MongoDB database collection in the request object.

app.post("/collection/:collectionName", (req, res, next) => {
    req.collection.insert(req.body, (e, results) => { //req.body which contains the data to be updated
        if (e) return next(e);
        res.send(results.ops);
    });
    console.log("Order Placed Successfully!");
}); // Thus method inserts the body of the request into the MongoDB collection as specified by the collectionName parameter, and sends the operation results to the requester. It also logs a message "Order Placed Successfully!" to the console.



app.get("/collection/:collectionName", (req, res, next) => {
    req.collection.find({}).toArray((e, results) => { // method to search the collection with the placeholder name provided in the request path.
        if (e) return next(e);
        res.send(results);
    });
    console.log("Lessons Added");
}); //It retrieves all the documents from the MongoDB collection as specified by the collectionName parameter and sends them as a response. It also logs a message "Lessons Added" to the console.


app.put("/collection/:collectionName/:id", (req, res, next) => {
    req.collection.update({ _id: new ObjectID(req.params.id) }, { $set: req.body }, { safe: true, multi: false }, // The safe option is set to true which ensures that the update will not be executed unless the update is successful. The multi option is set to false to ensure that only one record is updated.
        (e, result) => {
            if (e) return next(e); //
            res.send(result ? { msg: "success" } : { msg: "error" });
        }
    );
}); // It requests for a particular document in the MongoDB collection. It updates the document as specified by the collectionName and id parameters and the request body, and sends the operation results to the requester.

app.delete("/collection/:collectionName/:id", (req, res, next) => {
    req.collection.deleteOne({ _id: new ObjectID(req.params.id) }, //req.collection object to delete one item from the collection specified in the URL
        (e, result) => {
            if (e) return next(e);
            res.send(result ? { msg: "success" } : { msg: "error" });
        }
    );
}); // It requests for a particular document in the MongoDB collection. It deletes the document as specified by the collectionName and id parameters, and sends the operation results to the requester.


const ObjectID = require("mongodb").ObjectId; // is used to require the ObjectId from the MongoDB module. 
app.get("/collection/:collectionName/:id", (req, res, next) => {
    req.collection.findOne({ _id: new ObjectID(req.params.id) }, (e, result) => {
        if (e) return next(e);
        res.send(result);
    });
}); // The app.get method is a request handler used to handle GET requests for a certain endpoint. 
//In this case, the endpoint is /collection/:collectionName/:id. 
//This means that the endpoint will take two parameters, the collectionName and the id.
// The req.collection.findOne method is used to find a single item from the collection. 
//The first parameter of this method is a query object. In this case, the query is searching for an object with an _id property that is equal to the req.params.id which is the id parameter from the request. 
//The second parameter is a callback function which will be executed once the item is found. The callback function takes two parameters, an error and a result. If there is an error, the next(e) method is used to call the next error handling middleware, otherwise the result is sent back with the res.send method.



app.listen(3000, () => {
    console.log("Listening on port 3000");
}); //To listen to port 3000 for incoming requests. It also logs a message "Listening on port 3000" to the console.