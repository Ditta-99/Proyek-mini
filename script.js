document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const filterBtn = document.getElementById('filter-btn');
    const deleteAllBtn = document.getElementById('delete-all-btn');
    const noTaskFoundMessage = document.querySelector('.no-task-found');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Fungsi untuk menyimpan tugas ke Local Storage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Fungsi untuk menampilkan tugas
    const renderTasks = () => {
        taskList.innerHTML = ''; // Kosongkan daftar tugas yang ada
        if (tasks.length === 0) {
            noTaskFoundMessage.style.display = 'block';
            taskList.appendChild(noTaskFoundMessage); // Pastikan pesan "No task found" ada
        } else {
            noTaskFoundMessage.style.display = 'none'; // Sembunyikan pesan "No task found"
            tasks.forEach((task, index) => {
                const listItem = document.createElement('li');
                listItem.dataset.id = task.id; // Untuk identifikasi unik

                // Task Name
                const taskNameDiv = document.createElement('div');
                taskNameDiv.textContent = task.name;
                taskNameDiv.classList.add('task-name');
                if (task.completed) {
                    taskNameDiv.style.textDecoration = 'line-through';
                    taskNameDiv.style.color = '#a0a0a0';
                }

                // Due Date
                const dueDateDiv = document.createElement('div');
                dueDateDiv.textContent = task.dueDate || 'No Date';
                dueDateDiv.classList.add('task-due-date');

                // Status
                const statusDiv = document.createElement('div');
                statusDiv.textContent = task.completed ? 'Completed' : 'Pending';
                statusDiv.classList.add('task-status');
                statusDiv.classList.add(task.completed ? 'status-completed' : 'status-pending');

                // Actions
                const actionsDiv = document.createElement('div');
                actionsDiv.classList.add('task-actions');

                const completeBtn = document.createElement('button');
                completeBtn.textContent = task.completed ? 'Uncomplete' : 'Complete';
                completeBtn.classList.add('edit-btn'); // Reuse edit-btn style for complete
                completeBtn.addEventListener('click', () => toggleComplete(task.id));

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.classList.add('delete-btn');
                deleteBtn.addEventListener('click', () => deleteTask(task.id));

                actionsDiv.appendChild(completeBtn);
                actionsDiv.appendChild(deleteBtn);

                listItem.appendChild(taskNameDiv);
                listItem.appendChild(dueDateDiv);
                listItem.appendChild(statusDiv);
                listItem.appendChild(actionsDiv);
                taskList.appendChild(listItem);
            });
        }
    };

    // Fungsi untuk menambahkan tugas baru
    const addTask = () => {
        const taskName = taskInput.value.trim();
        const dueDate = dueDateInput.value; // Format yyyy-mm-dd dari input date

        if (taskName === '') {
            alert('Task cannot be empty!');
            return;
        }

        const newTask = {
            id: Date.now(), // ID unik berdasarkan timestamp
            name: taskName,
            dueDate: dueDate,
            completed: false // Default status
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = ''; // Bersihkan input
        dueDateInput.value = ''; // Bersihkan input tanggal
    };

    // Fungsi untuk menandai tugas selesai/belum selesai
    const toggleComplete = (id) => {
        tasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveTasks();
        renderTasks();
    };

    // Fungsi untuk menghapus tugas
    const deleteTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    };

    // Fungsi untuk menghapus semua tugas
    const deleteAllTasks = () => {
        if (confirm('Are you sure you want to delete all tasks?')) {
            tasks = [];
            saveTasks();
            renderTasks();
        }
    };

    // Event Listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    deleteAllBtn.addEventListener('click', deleteAllTasks);

    // Filter fungsionalitas (perlu implementasi lebih lanjut)
    filterBtn.addEventListener('click', () => {
        alert('Filter functionality to be implemented!');
        // Contoh: Anda bisa membuat dropdown filter berdasarkan status (all, completed, pending)
        // Atau filter berdasarkan tanggal jatuh tempo
    });

    // Render tasks on initial load
    renderTasks();
});