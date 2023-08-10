const express = require('express');
const User = require('./users/model');
const server = express();
server.use(express.json());

server.post('/api/users', (req, res) => {
    const user= req.body;
    if (!user.name || !user.bio){
        res.status(400).json({
            message: "Please provide name and bio for the user"
        })
    } else {
        User.insert(user)
        .then( createdUser => {
            res.status(201).json(createdUser)
        })
        .catch( err => {
        res.status(500).json({
            message: "The users information could not be retrieved",
            err: err.message,
            stack: err.stack,
      })
    })
  }  
})

server.get('/api/users', (req, res) => {

    User.find()
    .then( users => {
        res.json(users)
    })
    .catch( err => {
        res.status(500).json({
            message: "The users information could not be retrieved",
            err: err.message,
            stack: err.stack,
        })
    })
})

server.delete('/api/users/:id', (req, res) => {

    const userId = req.params.id;

    User.remove(userId)
        .then( user => {
            if(!user) {
                return res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else{
                res.json(user)
            }

        })
        .catch( err => {
            res.status(500).json({
                message: "The user could not be removed",
                err: err.message,
                stack: err.stack,
            })
        })
})

server.get('/api/users/:jackshit', (req, res) => {

    const userId = req.params.jackshit;
  
    User.findById(userId)
      .then(user => {
        if (user) {
           return res.json(user);
        } else {
            return res.status(404).json({ message: "The user with the specified ID does not exist" });
        }
        
      })
      .catch( err => {
        res.status(500).json({
            message: "The users information could not be retrieved",
            err: err.message,
            stack: err.stack,
        })
    })
  });


  server.put("/api/users/:id", async (req, res) => {
    try {
      const updatedUserById = await User.findById(req.params.id);
      const user = req.body;
      if (!updatedUserById) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else if (!user.name || !user.bio) {
        res
          .status(400)
          .json({ message: "Please provide name and bio for the user" });
      } else {
        const updatedUser = await User.update(req.params.id, req.body);
        res.status(200).json(updatedUser);
      }
    } catch (err) {
      res.status(500).json({
        message: "The user information could not be modified",
        err: err.message,
        stack: err.stack,
      });
    }
  });



server.use('*', (_req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})

module.exports = server;
