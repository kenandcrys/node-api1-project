const express = require('express');
const User = require('./users/model')
const server = express();

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
    
})

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
  
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



server.use('*', (_req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})

module.exports = server;
