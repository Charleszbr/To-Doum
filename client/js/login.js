// Import des fonctions de validation depuis functions.js
import { validateEmail, validatePassword, toggleLoadingState, delay } from './functions.js';

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

    
    // Désactiver le bouton de soumission et afficher un indicateur de chargement
    toggleLoadingState(true);

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
            throw new Error('Erreur lors de la connexion');
        }

        const data = await response.json();
        console.log(data); // Assurez-vous que cela affiche les données correctes

        // Afficher le message de réussite et masquer les erreurs
        const newRegister = document.getElementById('newLogin');
        newRegister.textContent = 'Connexion réussie';
        newRegister.classList.remove('hidden');


        // Ajout d'un délai de 2 secondes avant la redirection
        await delay(2000);
        window.location.href = 'pages/accueil.html';
    } catch (error) {
        console.error('Erreur:', error.message);
    } finally {
        // Réinitialiser l'état de chargement après la requête
        toggleLoadingState(false);
    }
});

// Ajout d'un écouteur d'événements pour détecter le blur sur les champs de saisie
const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');
inputs.forEach(input => {
    input.addEventListener('blur', function () {
        this.classList.remove('completed-task'); // Retirer la classe de ligne rayée
    });

    // Ajout d'un écouteur d'événement pour détecter les clics sur l'input après le blur
    input.addEventListener('click', function () {
        const checkboxId = this.getAttribute('data-checkbox-id');
        const checkbox = document.getElementById(checkboxId);

        if (checkbox) {
            checkbox.checked = false;
            this.classList.remove('completed-task'); // Retirer la classe de ligne rayée
        }
    });
});
