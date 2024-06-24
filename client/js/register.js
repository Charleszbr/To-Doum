// Importe les fonctions depuis functions.js
import { validateUsername,validateEmail, passwordsMatch, validateRegistrationForm, validatePassword } from './functions.js';

//Récupération de l'id dur formulaire d'inscription
const registerForm = document.getElementById('registerForm');

//Ajout d'un écouteur d'évennement pour le bouton 'submit'
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault(); //Supprimer le rechargement de la page

    //Récupération des inputs
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    //Vérification de la saisie des inputs
    if (!validateRegistrationForm(username, email, password, passwordConfirm)) {
        alert('Veuillez valider toutes les tâches');
        return;
    }

    //Vérification du nom d'utilisateur
    const usernameValidation = validateUsername(username);
    if(!usernameValidation.isValid) {
        alert(usernameValidation.errorMessage);
        return;
    }

    //Vérification du format de l'email
    const emailValidation = validateEmail(email);
    if(!emailValidation.isValid) {
        alert(emailValidation.errorMessage);
        return;
    }

    //Vérification de la force de mot de passe
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
        alert(passwordValidation.errorMessage);
        return;
    }

    //Vérifie si les mots de passe correspondent
    if(!passwordsMatch(password, passwordConfirm)) {
        alert('Les mots de passe ne correspondent pas.');
        return;
    }


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

        alert('Inscription réussie !');

    } catch (error) {
        console.error('Error:', error);
        if (error.message.includes('Un compte existe déjà avec cette adresse email.')) {
            alert('Un compte existe déjà avec cette adresse email.');
        } else {
            alert('Une erreur est survenue lors de l\'inscription.');
        }
    }
});





// Ecouteurs d'événements pour détecter le blur sur les champs de saisie
const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
inputs.forEach(input => {
    input.addEventListener('blur', function() {
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


