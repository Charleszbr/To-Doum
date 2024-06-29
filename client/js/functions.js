/////////////////////////////////////////////////////////////
// Fonction pour vérifier si tous les champs sont remplis
/////////////////////////////////////////////////////////////
export function validateRegistrationForm(username, email, password, passwordConfirm) {
    if (username.trim() === '' || email.trim() === '' || password.trim() === '' || passwordConfirm.trim() === '') {
        return false;
    }
    return true;
}

/////////////////////////////////////////////////////////////
// Validation du nom d'utilisateur + gestion d'erreur
/////////////////////////////////////////////////////////////
export function validateUsername(username) {
    const minLength = 3;
    const maxLength = 15;

    if (username.length < minLength) {
        return { isValid: false, errorMessage: `Le nom d'utilisateur doit contenir minimum ${minLength} caractères.` };
    }

    if (username.length > maxLength) {
        return { isValid: false, errorMessage: `Le nom d'utilisateur doit contenir maximum ${maxLength} caractères.` };
    };

    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    if (!usernameRegex.test(username)) {
        return { isValid: false, errorMessage: 'Le nom d\'utilisateur ne peut contenir que des lettres, des chiffres, - et _.' };
    }

    return { isValid: true, errorMessage : '' };
}

/////////////////////////////////////////////////////////////
// Fonction pour valider le format de l'email + gestion d'erreur
/////////////////////////////////////////////////////////////
export function validateEmail(email) {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return { isValid: false, errorMessage: 'Veuillez entrer une adresse email valide. (@ .)' };
    } else {
        return { isValid: true, errorMessage: '' };
    }
}

/////////////////////////////////////////////////////////////
// Fonction pour valider le mot de passe + gestion d'erreur
/////////////////////////////////////////////////////////////
export function validatePassword(password) {
    if (!/^.{8,60}$/.test(password)) {
        return { isValid: false, errorMessage: 'Le mot de passe doit contenir entre 8 et 60 caractères' };
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
        return { isValid: false, errorMessage: 'Le mot de passe doit contenir au moins une minuscule (a) et une majuscule (A)' };
    }

    if (!/(?=.*\d)/.test(password)) {
        return { isValid: false, errorMessage: 'Le mot de passe doit contenir au moins un chiffre (0)' };
    } 

    if (!/[@$!%*?&]/.test(password)) {
        return { isValid: false, errorMessage: 'Le mot de passe doit contenir au moins un caractère spécial (@$!%*?&)' };
    } 

    return { isValid:true, errorMessage: ''};
}

/////////////////////////////////////////////////////////////
// Fonction pour vérifier si les mots de passe correspondent
/////////////////////////////////////////////////////////////
export function passwordsMatch(password, passwordConfirm) {
    return password === passwordConfirm;
}

/////////////////////////////////////////////////////////////
// Fonction pour afficher les erreurs
/////////////////////////////////////////////////////////////
export function showError(inputElement, errorElementId, errorMessage) {
    const errorElement = document.getElementById(errorElementId);
    errorElement.textContent = errorMessage;
    errorElement.style.display = 'block';
    inputElement.classList.add('error-input');
}

/////////////////////////////////////////////////////////////
// Fonction pour supprimer les erreurs
/////////////////////////////////////////////////////////////
export function clearErrors() {
    // Tableau des IDs des messages d'erreur à masquer
    const errorIds = ['usernameError', 'emailError', 'passwordError', 'passwordConfirmError'];

    // Masque tous les messages éléments d'erreur
    errorIds.forEach(errorId => {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.style.display = 'none';
            errorElement.textContent = '';
        }
    });

    // Désélectionne tous les inputs ayant la classe 'error-input'
    document.querySelectorAll('input.error-input').forEach(inputElement => {
        inputElement.classList.remove('error-input');
        inputElement.classList.add('error-input::placeholder');
    });
}


/////////////////////////////////////////////////////////////
// Fonction pour désactiver le bouton de soumission et activer celui de loading
/////////////////////////////////////////////////////////////
export function toggleLoadingState(isLoading) {
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = isLoading;
    submitButton.textContent = isLoading ? 'Connexion en cours...' : 'Se connecter';
}

/////////////////////////////////////////////////////////////
// Fonction pour ajouter un délai
/////////////////////////////////////////////////////////////
export function delay(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}
