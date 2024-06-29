// Import des fonctions de validation depuis functions.js
import { clearErrors, showError, toggleLoadingState, delay } from './functions.js';

// Récupération de l'id du formulaire de connexion
const loginForm = document.getElementById('loginForm');

//Listener pour réinitialiser le placeholder et la classe d'erreur au focus
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.placeholder = this.getAttribute('data-placeholder');
        this.classList.remove('error-input');
    });
});


// Ajout d'un écouteur d'événement pour le bouton 'submit'
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page

    // Réinitialisation des messages d'erreur
    clearErrors();

    // Récupération des inputs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email.trim() === '' || password.trim() === '') {
        showError(document.getElementById('email'), 'emailError', 'Veuillez entrer votre adresse email.');
        showError(document.getElementById('password'), 'passwordError', 'Veuillez entrer votre mot de passe.');
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
            throw new Error('L\'email ou le mot de passe n\'est pas correct.');
        }

        const data = await response.json();
        console.log(data); // Assurez-vous que cela affiche les données correctes

        // Afficher le message de réussite et masquer les erreurs
        const newLogin = document.getElementById('newLogin');
        newLogin.textContent = 'Connexion réussie';
        newLogin.classList.remove('hidden');

        // Ajout d'un délai de 2 secondes avant la redirection
        await delay(2000);
        window.location.href = 'pages/accueil.html';
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


//Ecouteurs d'événements pour détecter le blur sur les champs de saisie
const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
inputs.forEach(input => {
    input.addEventListener('blur', function () {
        const checkboxId = this.getAttribute('data-checkbox-id');
        const checkbox = document.getElementById(checkboxId);

        if (checkbox) {
            // Vérifier si le champ est rempli avant d'activer la case à cocher
            if (this.value.trim() === '') {
                checkbox.checked = false;
                this.classList.remove('completed-task'); // Retirer la classe de ligne rayée
            } else {
                checkbox.checked = true;
                this.classList.add('completed-task'); // Ajouter la classe de ligne rayée
            }
        }
    });

    //Ajout d'un écouteur d'événement pour détecter les clics sur l'input après le blur
    input.addEventListener('click', function () {
        const checkboxId = this.getAttribute('data-checkbox-id');
        const checkbox = document.getElementById(checkboxId);

        if (checkbox) {
            checkbox.checked = false;
            this.classList.remove('completed-task');
        }
    });
});