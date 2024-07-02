///////////////////////////////////////////////////////////////////////////////////////////
// Register.js - Code de la page register - formulaire d'inscription 
///////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////
// Avant remplissage du formulaire
/////////////////////////////////////////////////////////////

// Import des fonctions depuis functions.js
import { showError, clearErrors, validateUsername, validateEmail, passwordsMatch, validateRegistrationForm, validatePassword } from './functions.js';

// Récupération de l'id dur formulaire d'inscription
const registerForm = document.getElementById('registerForm');

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
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page

    //Réinitialisation des messages d'erreur et des classes d'erreur
    clearErrors();

    // Récupération des inputs
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordConfirmInput = document.getElementById('passwordConfirm');

    // Récupération valeur des inputs
    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;


    // Vérification de la saisie des inputs
    if (!validateRegistrationForm(username, email, password, passwordConfirm)) {
        if (username.trim() === '') {
            showError(usernameInput, 'usernameError', 'La tâche "Nom d\'utilisateur" doit être validée');
        }
        if (email.trim() === '') {
            showError(emailInput, 'emailError', 'La tâche "Email" doit être validée');
        }
        if (password.trim() === '') {
            showError(passwordInput, 'passwordError', 'La tâche "Mot de passe" doit être validée');
        }
        if (passwordConfirm.trim() === '') {
            showError(passwordConfirmInput, 'passwordConfirmError', 'La tâche "Confirmation mot de passe" doit être validée');
        }
        return;
    }


    //Vérification du nom d'utilisateur + gestion erreur
    const usernameValidation = validateUsername(username);
    if (!usernameValidation.isValid) {
        showError(usernameInput, 'usernameError', usernameValidation.errorMessage);
        return;
    }

    //Vérification du format de l'email + gestion erreur
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
        showError(emailInput, 'emailError', emailValidation.errorMessage);
        return;
    }

    // Vérification de la force du mot de passe + gestion erreur
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
        showError(passwordInput, 'passwordError', passwordValidation.errorMessage);
        return;
    }

    //Vérification de la correspondance des mots de passe + gestion erreur
    if (!passwordsMatch(password, passwordConfirm)) {
        showError(passwordConfirmInput, 'passwordConfirmError', 'Les mots de passe ne correspondent pas.');
        return;
    }




    // Envoi des données au serveur si tout est valide
    try {

        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const data = await response.json();
        console.log(data); 

        // Petit message d'inscription validée
        const newRegister = document.getElementById('newRegister');
        newRegister.textContent = 'L\'enregistrement a été fait avec succès. Au boulot ! Les tâches ne vont pas se faire toutes seules !';
        newRegister.classList.remove('hidden');

        // Ajout d'un délai avant la redirection
        setTimeout(function () {
            window.location.href = 'home.html';
        }, 3000); // 3sec

    } catch (error) {
        console.error('Error:', error);

        // Vérifier si le message d'erreur contient la phrase indiquant un compte existant
        if (error.message.includes('Un compte existe déjà avec cette adresse email.')) {
            showError(emailInput, 'emailError', 'Un compte existe déjà avec cette adresse email.');
        } else {
            showError(emailInput, 'emailError', 'Une erreur est survenue lors de l\'inscription.');
        }
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


