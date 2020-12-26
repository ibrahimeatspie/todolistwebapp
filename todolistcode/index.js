const express = require('express');
const app = express();
const http = require('http').createServer(app);
const MongoClient = require('mongodb').MongoClient;
var mongodb = require('mongodb');
const url = ""

app.use(express.static('views'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');

});

app.get("/tasks", (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err
        var dbo = db.db("Cluster0")
        //Create object with task of inputted task
        var myobj = {
            task: req.query.task
        }

        /*First check for empty tasks*/
        if (myobj.task == "") {} else {
            dbo.collection("articles").insertOne(myobj, function(err, res) {

                if (err) throw err
                db.close();

            })
        }
        //Send back array of all tasks to front end
        dbo.collection("articles").find({}).toArray(function(err, result) {
            if (err) throw err;
            var data = JSON.stringify(result);
            res.end(data);

            db.close();
        });



    });


})

app.get("/edit", (req, res) => {
    var information = {
        id: req.query.id,
        task: req.query.task
    };
    //Connect to Mongo
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Cluster0");
        //Store task description into taskInfo
        var taskInfo = information.task;
        //Set id as id
        var id = {
            _id: new mongodb.ObjectID(information.id)
        }
        //Code to update task to taskInfo
        var newValues = {
            $set: {
                task: taskInfo
            }
        };
        //Update record based on id and new value of task
        dbo.collection("articles").updateOne(id, newValues, function(err, res) {
            if (err) throw err;
            db.close();
        });


    });




})

app.get("/delete", (req, res) => {
    var wee = {
        id: req.query.id
    };
    MongoClient.connect(url, function(err, db) {
        if (err) throw err
        var dbo = db.db("Cluster0")
        dbo.collection('articles', function(err, collection) {
            collection.deleteOne({
                _id: new mongodb.ObjectID(wee.id)
            });
        });




    });


})

app.get("/display", (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err
        var dbo = db.db("Cluster0")



        //Send all tasks to frontend
        dbo.collection("articles").find({}).toArray(function(err, result) {
            if (err) throw err;
            var tasks = JSON.stringify(result);
            res.end(tasks);

            db.close();

        });



    });


})




app.get(RegExp(".+"), (req, res) => {
    res.sendFile(__dirname + req.url);
});

http.listen(3000, function() {});
