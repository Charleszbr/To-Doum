// Import des fonctions de validation depuis functions.js
import { validateEmail, validatePassword } from './functions.js';

// Récupération de l'id du formulaire de connexion
const loginForm = document.getElementById('loginForm');

// Ajout d'un écouteur d'événement pour le bouton 'submit'
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page

    // Récupération des inputs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validation des champs
    if (email.trim() === '' || password.trim() === '') {
        document.getElementById('emailError').textContent = email.trim() === '' ? 'Veuillez entrer votre adresse email.' : '';
        document.getElementById('passwordError').textContent = password.trim() === '' ? 'Veuillez entrer votre mot de passe.' : '';
        return;
    }

    // Réinitialisation des messages d'erreur
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';

    // Validation du format de l'email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
        document.getElementById('emailError').textContent = emailValidation.errorMessage;
        return;
    }

    // Validation du mot de passe
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
        document.getElementById('passwordError').textContent = passwordValidation.errorMessage;
        return;
    }

    // Envoi des données au serveur si tout est valide
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Identifiants incorrects.');
        }

        // Réponse réussie
        const data = await response.json();
        console.log(data);

        // Redirection vers la page d'accueil après connexion réussie
        setTimeout(function() {
            window.location.href = 'accueil.html'; // Changer 'accueil.html' par la page de redirection souhaitée
        }, 3000); // Délai de 3 secondes avant la redirection

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('emailError').textContent = 'Identifiants incorrects.';
    }
});

// Ajout d'un écouteur d'événements pour détecter le blur sur les champs de saisie
const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');
inputs.forEach(input => {
    input.addEventListener('blur', function() {
        this.classList.remove('completed-task'); // Retirer la classe de ligne rayée
    });

    // Ajout d'un écouteur d'événement pour détecter les clics sur l'input après le blur
    input.addEventListener('click', function() {
        this.classList.remove('completed-task'); // Retirer la classe de ligne rayée
    });
});


    // Ajout d'un écouteur d'événement pour détecter les clics sur l'input après le blur
    input.addEventListener('click', function() {
        const checkboxId = this.getAttribute('data-checkbox-id');
        const checkbox = document.getElementById(checkboxId);

        if (checkbox) {
            checkbox.checked = false;
            this.classList.remove('completed-task'); // Retirer la classe de ligne rayée
        }
    });
});


