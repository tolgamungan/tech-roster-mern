let express = require("express");
let cors = require('cors');
let path = require('path');
let MongoClient = require("mongodb").MongoClient;
let sanitizer = require("express-sanitizer");
let ObjectId = require("mongodb").ObjectId;

// MongoDB constants
const URL = "mongodb://mongo:27017/";
const DB_NAME = "dbTechs";
// construct application object via express
let app = express();
// add cors as middleware to handle CORs errors while developing
app.use(cors());
// middleware body parser to isolate data in incoming JSON
app.use(express.json());
// add middleware for sanitizer to check on incoming JSON data
app.use(sanitizer());
// get absolute path to /build folder (production build of react web app)
const CLIENT_BUILD_PATH = path.join(__dirname, "./../../client/build");
// adding middleware to define static files location
app.use("/", express.static(CLIENT_BUILD_PATH));

// ----- GET ------
app.get("/get", async (request, response) => {
    // construct a MongoClient object, passing in additional options
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });
    try {
        await mongoClient.connect();
        // get reference to database via name
        let db = mongoClient.db(DB_NAME);
        let techArray = await db.collection("technologies").find().sort("name",1).toArray();
        let courseArray = await db.collection("courses").find().sort("courseName",1).toArray();        
        let json = {"courses": courseArray, "technologies": techArray};
        // serializes sampleJSON to string format
        response.status(200);
        response.send(json);
    } catch (error) {
        console.log(`>>> ERROR : ${error.message}`);
        response.status(500);
        response.send({error: error.message});
    } finally {
        mongoClient.close();
    }
});

// ----- POST ------
app.post("/post", async (request, response) => {
    // construct a MongoClient object, passing in additional options
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });
    try {
        await mongoClient.connect();
        let result;

        if (request.body.name == null) {
            // sanitize course form input
            request.body.courseCode = request.sanitize(request.body.courseCode);
            request.body.courseName = request.sanitize(request.body.courseName);
            let courseCollection = mongoClient.db(DB_NAME).collection("courses");
            result = await courseCollection.insertOne(request.body);
        
        } else { 
            // sanitize tech form input
            request.body.name = request.sanitize(request.body.name);
            request.body.description = request.sanitize(request.body.description);
            request.body.difficulty = request.sanitize(request.body.difficulty);
            request.body.courses.forEach(course => {
            course.code = request.sanitize(course.code);
            course.name = request.sanitize(course.name);
        });
            let techCollection = mongoClient.db(DB_NAME).collection("technologies");
            result = await techCollection.insertOne(request.body);
        }
        // status code
        response.status(200);
        response.send(result);
    } catch (error) {
        console.log(`>>> ERROR : ${error.message}`);
        response.status(500);
        response.send({error: error.message});
    } finally {
        mongoClient.close();
    }
});


// ----- DELETE ------

app.delete("/delete", async (request, response) => {
    // construct a MongoClient object, passing in additional options
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });

    try {
        await mongoClient.connect();

        // setup the delete query
        let selector = { "_id" : ObjectId(request.sanitize(request.body._id)) };
        let result;

            let techCollection = mongoClient.db(DB_NAME).collection("technologies");
            let courseCollection = mongoClient.db(DB_NAME).collection("courses");

            if (await techCollection.deleteOne(selector) ===true){
                result = await techCollection.deleteOne(selector);
            } else {
                result = await courseCollection.deleteOne(selector);
            }

        if (result.matchedCount <= 0) {
            response.status(404);
            response.send({error: "No technology documents found with ID"});
            mongoClient.close();
            return;
        }

        // status code
        response.status(200);
        response.send(result);
    } catch (error) {
        console.log(`>>> ERROR : ${error.message}`);
        response.status(500);
        response.send({error: error.message});
    } finally {
        mongoClient.close();
    }
});


// ----- EDIT ------

app.put("/put", async (request, response) => {
    // construct a MongoClient object, passing in additional options
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });

    try {
        await mongoClient.connect();
        let selector = { "_id" : ObjectId(request.sanitize(request.body.id)) };
        let result;
        let newValues;

        if (request.body.name == null) {
            // sanitize course form input
            request.body.courseCode = request.sanitize(request.body.courseCode);
            request.body.courseName = request.sanitize(request.body.courseName);
            newValues = { $set : request.body};
            let courseCollection = mongoClient.db(DB_NAME).collection("courses");
            result = await courseCollection.updateOne(selector,newValues);
        } else {
            // sanitize tech form input
            request.body.name = request.sanitize(request.body.name);
            request.body.description = request.sanitize(request.body.description);
            request.body.difficulty = request.sanitize(request.body.difficulty);
            request.body.courses.forEach(course => {
            course.code = request.sanitize(course.code);
            course.name = request.sanitize(course.name);
        });
        newValues = { $set : request.body};
        let techCollection = mongoClient.db(DB_NAME).collection("technologies");
        result = await techCollection.updateOne(selector,newValues);
        }

        if (result.matchedCount <= 0) {
            response.status(404);
            response.send({error: "No documents found with ID"});
            mongoClient.close();
            return;
        }
        // status code
        response.status(200);
        response.send(result);

    } catch (error) {
        console.log(`>>> ERROR : ${error.message}`);
        response.status(500);
        response.send({error: error.message});
    } finally {
        mongoClient.close();
    }
});




// wildcard to handle all other non-api URL routings and point to index.html
app.use((request, response) => {
    response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

app.listen(8080, () => console.log("Listening on port 8080"));