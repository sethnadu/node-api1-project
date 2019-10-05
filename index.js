// implement your API here
const express = require("express");

const db = require('./data/db.js');

const server = express();
server.use(express.json());



//GET /api/users
server.get('/api/users', (req, res) => {
    
    db
    .find()
    .then(users => {
        res.send(users)
    })
    .catch(error => {
        res.send("Error: " + error);
        res.status(500).json({ error: "The users information could not be retrieved." })
    })
});

//GET /api/users/:id
server.get('/api/users/:id', (req, res) => {

    const id = req.params.id;
    console.log(db)


    db
    .findById(id)
    .then(user => {
        if(user) {
         res.send(user)
         res.status(200)   
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
        
    })
    .catch(error => {
        res.send("Error: " + error);
        res.status(500).json({ error: "The user information could not be retrieved." })
    })

});

//POST /api/users
server.post("/api/users", (req, res) => {

    const userData = req.body;

    if (!userData.name || !userData.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {

    db
    .insert(userData)
    .then(user => {
        res.json(user)
        res.status(200)
    })
    .catch(error => {
        res.send("Error: " + error);
        res.status(500).json({ error: "There was an error while saving the user to the database" })
    })
}
});

//PUT /api/users/:id
server.put("/api/users/:id", (req, res) => {

    const id = req.params.id;
    const changedData = req.body;

    if (!changedData.name || !changedData.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
    db
    .update(id, changedData)
    .then(user => {
        if(user) {
         res.json(user)
         res.status(200)   
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }})
    .catch(error => {
        res.send("Error: " + error);
        res.status(500).json({ error: "The user information could not be modified." })
    })
}
});


//DELETE /api/users/:id
server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;

    db
    .remove(id)
    .then(user => {
        res.json(user)
    })
    .catch(error => {
        res.send("Error: " + error);
    })
});

const port = 8000;
server.listen(port, () => console.log(`\n Server is Running on ${port}`));