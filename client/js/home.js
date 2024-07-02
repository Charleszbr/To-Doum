
// Tableau pour stocker les listes de tâches
let taskLists = [];

document.getElementById('logout-button').addEventListener('click', function (event) {
    event.preventDefault();
    var confirmation = confirm('Voulez-vous vraiment vous déconnecter ?');
    if (confirmation) {
        window.location.href = '../index.html';
    }
});

// Afficher/cacher le formulaire de création de liste de tâches
document.getElementById('add-list-button').addEventListener('click', function () {
    document.getElementById('create-list-form').classList.toggle('hidden');
});

// Soumettre le formulaire de création de liste de tâches
document.getElementById('create-list-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const listName = document.getElementById('list-name').value;

    // Créer un objet pour la nouvelle liste de tâches
    const newList = {
        name: listName,
        tasks: []
    };

    // Ajouter la nouvelle liste à taskLists
    taskLists.push(newList);

    // Réinitialiser le formulaire
    document.getElementById('create-list-form').reset();
    document.getElementById('create-list-form').classList.add('hidden');

    // Mettre à jour l'affichage des listes de tâches
    displayTaskLists();
});

// Fonction pour afficher les listes de tâches dans l'interface
function displayTaskLists() {
    const listsContainer = document.getElementById('lists-container');
    listsContainer.innerHTML = '';

    // Parcourir taskLists et créer les éléments HTML pour chaque liste de tâches
    taskLists.forEach((list, index) => {
        const listCard = document.createElement('div');
        listCard.className = 'bg-white p-4 rounded-lg shadow-md';

        const listTitle = document.createElement('h3');
        listTitle.className = 'text-xl font-semibold mb-2 cursor-pointer';
        listTitle.textContent = list.name;
        listTitle.addEventListener('click', () => openTaskListModal(index));

        listCard.appendChild(listTitle);

        listsContainer.appendChild(listCard);
    });
}

// Fonction pour ouvrir le modal de liste de tâches
function openTaskListModal(index) {
    const modal = document.getElementById('task-modal');
    const modalContent = document.getElementById('task-modal-content');
    modalContent.innerHTML = '';

    const list = taskLists[index];

    // Titre de la liste
    const listTitle = document.createElement('h2');
    listTitle.className = 'text-2xl font-bold mb-4';
    listTitle.textContent = list.name;
    modalContent.appendChild(listTitle);

    // Bouton pour fermer le modal
    const closeButton = document.createElement('button');
    closeButton.className = 'absolute top-4 right-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md';
    closeButton.textContent = 'Fermer';
    closeButton.addEventListener('click', () => modal.classList.add('hidden'));
    modalContent.appendChild(closeButton);

    // Affichage des tâches de la liste
    list.tasks.forEach((task, taskIndex) => {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';

        const taskTitle = document.createElement('h3');
        taskTitle.className = 'text-lg font-semibold';
        taskTitle.textContent = task.title;
        taskCard.appendChild(taskTitle);

        const taskDescription = document.createElement('p');
        taskDescription.className = 'text-gray-600';
        taskDescription.textContent = task.description;
        taskCard.appendChild(taskDescription);

        // Actions pour chaque tâche (éditer, supprimer, marquer terminée)
        const taskActions = document.createElement('div');
        taskActions.className = 'task-actions';

        // Bouton pour marquer la tâche comme terminée
        const completeButton = document.createElement('button');
        completeButton.className = 'bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600';
        completeButton.textContent = 'Terminée';
        completeButton.addEventListener('click', () => {
            task.completed = !task.completed;
            displayTaskLists();
        });
        taskActions.appendChild(completeButton);

        // Bouton pour supprimer la tâche
        const deleteButton = document.createElement('button');
        deleteButton.className = 'bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600';
        deleteButton.textContent = 'Supprimer';
        deleteButton.addEventListener('click', () => {
            list.tasks.splice(taskIndex, 1);
            displayTaskLists();
        });
        taskActions.appendChild(deleteButton);

        taskCard.appendChild(taskActions);

        modalContent.appendChild(taskCard);
    });

    // Formulaire pour ajouter une nouvelle tâche
    const addTaskForm = document.createElement('form');
    addTaskForm.className = 'mt-4';
    addTaskForm.innerHTML = `
        <div>
            <label for="task-title-${index}" class="block text-sm font-medium text-gray-700">Titre de la tâche</label>
            <input type="text" id="task-title-${index}" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div class="mt-2">
            <label for="task-description-${index}" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="task-description-${index}" rows="2" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
        </div>
        <div class="mt-2">
            <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Ajouter</button>
        </div>
    `;
    addTaskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskTitle = document.getElementById(`task-title-${index}`).value;
        const taskDescription = document.getElementById(`task-description-${index}`).value;
        const newTask = { title: taskTitle, description: taskDescription, completed: false };
        list.tasks.push(newTask);
        displayTaskLists();
    });
    modalContent.appendChild(addTaskForm);

    // Afficher le modal
    modal.classList.remove('hidden');
}

// Initialisation de l'affichage des listes de tâches
displayTaskLists();
