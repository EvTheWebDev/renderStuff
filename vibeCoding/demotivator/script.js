// Demotivational and Motivational messages
const demotivationalMessages = [
    "Wow, you actually completed something... still a failure though.",
    "One step closer to inevitable disappointment!",
    "Your family would be disappointed... if they cared.",
    "Even a broken clock is right twice a day...",
    "Congratulations on doing the bare minimum!",
    "You call that progress?",
    "Don't get too excited, you'll probably mess up the next one.",
    "Task completed... but at what cost to your dignity?",
    "You're not failing... you're just succeeding at being unsuccessful.",
    "Remember: it's not about the destination, it's about the failures along the way."
];

const motivationalMessages = [
    "You're doing great! Keep going!",
    "Every step forward is progress!",
    "You're crushing it!",
    "Success is built one task at a time!",
    "You're making amazing progress!",
    "Keep up the fantastic work!",
    "You're unstoppable!",
    "Your dedication is inspiring!",
    "You're getting closer to your goals!",
    "Excellence is your habit!"
];

// DOM Elements
const modeToggle = document.getElementById('modeToggle');
const modeText = document.getElementById('modeText');
const mainTitle = document.getElementById('mainTitle');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const progressBar = document.getElementById('progressBar');
const progressPercent = document.getElementById('progressPercent');
const progressLabel = document.getElementById('progressLabel');
const messageElement = document.getElementById('message');

let tasks = [];
let isDemotivationalMode = true;

// Mode Toggle Function
modeToggle.addEventListener('change', () => {
    isDemotivationalMode = !modeToggle.checked;
    document.body.classList.toggle('motivational-mode', !isDemotivationalMode);
    updateUI();
});

function updateUI() {
    // Update text and styles based on mode
    modeText.textContent = isDemotivationalMode ? 'Demotivational Mode' : 'Motivational Mode';
    mainTitle.textContent = isDemotivationalMode ? 'Your Path to Failure' : 'Your Path to Success';
    taskInput.placeholder = isDemotivationalMode ? 
        'Add another disappointing task...' : 
        'Add a new task to achieve...';
    progressLabel.textContent = isDemotivationalMode ? 'Reverse Progress:' : 'Progress:';
    
    updateProgress();
}

function getRandomMessage() {
    const messages = isDemotivationalMode ? demotivationalMessages : motivationalMessages;
    return messages[Math.floor(Math.random() * messages.length)];
}

function updateProgress() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    let progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    if (isDemotivationalMode) {
        // In demotivational mode, progress bar shrinks as you complete tasks
        progressPercentage = 100 - progressPercentage;
    }

    progressBar.style.width = `${progressPercentage}%`;
    progressPercent.textContent = `${Math.round(progressPercentage)}%`;
    
    // Update progress bar color based on mode
    progressBar.style.backgroundColor = isDemotivationalMode ? 
        'var(--progress-color)' : 
        'var(--success-color)';

    messageElement.textContent = getRandomMessage();
}

function addTask(taskText) {
    if (taskText.trim() === '') return;

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);
    renderTask(task);
    updateProgress();
    taskInput.value = '';
}

function renderTask(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
        <div>
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span>${task.text}</span>
        </div>
        <button class="delete-btn">Delete</button>
    `;

    if (task.completed) {
        li.classList.add('completed');
    }

    const checkbox = li.querySelector('.task-checkbox');
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        li.classList.toggle('completed', task.completed);
        updateProgress();
    });

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        tasks = tasks.filter(t => t.id !== task.id);
        li.remove();
        updateProgress();
    });

    taskList.appendChild(li);
}

// Event Listeners
addTaskBtn.addEventListener('click', () => addTask(taskInput.value));
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask(taskInput.value);
    }
});

// Initial UI update
updateUI();