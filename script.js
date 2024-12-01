const localStorageKey = 'to-do-list';

// Função para verificar se a task já existe
function validateIfExistsNewTask(taskName) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    return values.some(x => x.name.toLowerCase() === taskName.toLowerCase());
}

// Função para destacar o input com erro
function highlightInputError(message) {
    let input = document.getElementById('input-new-task');
    input.style.border = '2px solid red'; // Define a borda vermelha
    alert(message); // Exibe uma mensagem para o usuário
    setTimeout(() => {
        input.style.border = ''; // Restaura a borda após 2 segundos
    }, 2000);
}

// Adicionar nova task
function newTask() {
    let input = document.getElementById('input-new-task');
    let taskName = input.value.trim();

    // Se o campo estiver vazio
    if (!taskName) {
        highlightInputError('O campo não pode estar vazio. Digite algo válido!');
        return;
    }

    // Se a task já existir
    if (validateIfExistsNewTask(taskName)) {
        highlightInputError('Já existe uma tarefa com essa descrição.');
        return;
    }

    // Se for válido, adiciona a task
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    values.push({ name: taskName, completed: false });
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    input.value = ''; // Limpa o campo
    showValues();
}

// Mostrar tasks na tela
function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let list = document.getElementById('to-do-list');
    list.innerHTML = values
        .map(task => 
            `<li class="${task.completed ? 'completed' : ''}">
                ${task.name}
                <div>
                    <button id="btn-complete" onclick='toggleTaskCompletion("${task.name}")'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                        </svg>
                    </button>
                    <button id="btn-delete" onclick='removeItem("${task.name}")'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 5h4a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5v-6ZM4.118 4 4 4.059V12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1h-1v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3H2.5ZM6.5 1h3a.5.5 0 0 1 .5.5v1h-4v-1a.5.5 0 0 1 .5-.5Z"/>
                        </svg>
                    </button>
                </div>
            </li>`
        )
        .join('');
}

// Marcar/desmarcar uma task como concluída
function toggleTaskCompletion(taskName) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let task = values.find(x => x.name === taskName);
    if (task) task.completed = !task.completed;
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();
}

// Remover task
function removeItem(taskName) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    values = values.filter(x => x.name !== taskName);
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();
}

// Carregar tasks na inicialização
showValues();
