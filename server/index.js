const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Configuration avancée de CORS
const corsOptions = {
    origin: 'http://127.0.0.1:5500', // Remplacez par l'origine de votre application front-end
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/TO-DOUM', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connecté à MongoDB');
}).catch((err) => {
    console.error('Erreur de connexion à MongoDB', err);
});

// Définir le schéma de l'utilisateur
const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String
});

// Créer un modèle à partir du schéma
const User = mongoose.model('User', userSchema);

// Servir des fichiers statiques depuis le répertoire 'client'
app.use(express.static(path.join(__dirname, 'client')));

// Route GET par défaut
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Définir le point de terminaison POST /api/register
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Vérifier si l'email existe déjà
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Un compte existe déjà avec cette adresse email.' });
        }

        // Créer un nouvel utilisateur
        const newUser = new User({ username, email, password });

        // Enregistrer l'utilisateur dans la base de données
        await newUser.save();
        console.log(`Utilisateur enregistré: ${username}, ${email}`);
        res.status(201).json({ message: 'Utilisateur enregistré avec succès!' });
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur', error);
        res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'utilisateur' });
    }
});

// Définir le point de terminaison POST /api/login
app.post('/api/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe avec cet email et ce mot de passe
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ message: 'Identifiants incorrects.' });
        }

        // Ici, vous pourriez générer un token JWT pour gérer la session de l'utilisateur
        
        res.status(200).json({ message: 'Connexion réussie!' });
    } catch (error) {
        console.error('Erreur lors de la connexion de l\'utilisateur', error);
        res.status(500).json({ message: 'Erreur lors de la connexion de l\'utilisateur' });
    }
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Une erreur est survenue sur le serveur' });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
