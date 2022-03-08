const express = require('express');
const mongoose = require('mongoose');      // npm install mongoose
const path = require('path');  // Donne accès au chemin du système de fichiers

const app = express();
app.use(express.json());    // Donne accès au corps de la requête

const stuffRoutes = require('./routes/sauces');
const userRoutes = require ('./routes/user');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

mongoose.connect('mongodb+srv://Pixar:U04Uyb6W0dtSnLEy@cluster0.ytdqa.mongodb.net/cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;