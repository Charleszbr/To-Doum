///////////////////////////////////////////////////////////////////////////////////////////
// Login.js - Code de la page login - formulaire de connexion 
///////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////
// Avant remplissage du formulaire
/////////////////////////////////////////////////////////////

// Import des fonctions nécessaires depuis functions.js
import { clearErrors, showError, toggleLoadingState, delay } from './functions.js';

// Récupération de l'id du formulaire de connexion
const loginForm = document.getElementById('loginForm');

// Listener pour réinitialiser le placeholder et la classe d'erreur au focus de l'input (click)
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.placeholder = this.getAttribute('data-placeholder');
        this.classList.remove('error-input');
    });
});



/////////////////////////////////////////////////////////////
// Actions liées au remplissage du formulaire 
/////////////////////////////////////////////////////////////

// Ajout d'un écouteur d'événement pour le bouton 'submit'
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page

    // Réinitialisation des messages d'erreur
    clearErrors();

    // Récupération des inputs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Vérification de la saisie des inputs
    if (email.trim() === '' || password.trim() === '') {
        showError(document.getElementById('email'), 'emailError', 'Veuillez entrer votre adresse email.');
        showError(document.getElementById('password'), 'passwordError', 'Veuillez entrer votre mot de passe.');
        return;
    }

    // Désactiver le bouton de soumission et afficher un indicateur de chargement (animation boutton loading)
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
            throw new Error('L\'email ou le mot de passe n\'est pas correct.');
        }

        const data = await response.json();
        console.log(data);

        // Petit message de connexion
        const newLogin = document.getElementById('newLogin');
        newLogin.textContent = 'Connexion réussie';
        newLogin.classList.remove('hidden');

        // Ajout d'un délai avant la redirection
        setTimeout(function () {
            window.location.href = 'accueil.html';
        }, 2000); // 2sec

    } catch (error) {
        console.error('Erreur:', error.message);
        
        // Afficher l'erreur générale de sécurité sous les inputs
        showError(document.getElementById('email'), 'emailError', 'L\'email ou le mot de passe est incorrect.');
        showError(document.getElementById('password'), 'passwordError', 'L\'email ou le mot de passe est incorrect.');

    } finally {

        // Réinitialiser l'état de chargement après la requête
        toggleLoadingState(false);
    }

});



/////////////////////////////////////////////////////////////
// Animation style todo-list (complétion d'une tâche)
/////////////////////////////////////////////////////////////

const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');

inputs.forEach(input => {

    // Ecouteur d'événement pour détecter le blur sur les champs de saisie (cliquer ailleurs une fois l'input rempli)
    input.addEventListener('blur', function () {
        const checkboxId = this.getAttribute('data-checkbox-id');
        const checkbox = document.getElementById(checkboxId);

        if (checkbox) {
            // Si input rempli alors case cochée et rayure du texte
            if (this.value.trim() === '') {
                checkbox.checked = false; // Case non cochée
                this.classList.remove('completed-task'); // Retirer la classe de ligne rayée
            } else {
                checkbox.checked = true; // Case cochée
                this.classList.add('completed-task'); // Ajouter la classe de ligne rayée
            }
        }

    });


    // Ecouteur d'évennement pour détecter le focus sur l'input après avoir cliquer ailleurs
    input.addEventListener('click', function () {

        const checkboxId = this.getAttribute('data-checkbox-id');
        const checkbox = document.getElementById(checkboxId);

        if (checkbox) {

            checkbox.checked = false;
            this.classList.remove('completed-task');

        }

    });

});