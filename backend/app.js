const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.post('/api/auth/signup', (req, res, next) => {
    console.log(req.email);
    res.status(201).json({
        message: 'User created successfully',
    });
}); 



app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

module.exports = app;