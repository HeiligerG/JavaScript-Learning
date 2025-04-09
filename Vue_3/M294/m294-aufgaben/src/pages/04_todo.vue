<script setup>
import { ref, computed } from 'vue'

const tasks = ref([
    { task: "Clean your room", done: false, hours: 1, high_priority: true },
    { task: "Go to the washing machine", done: false, hours: 0.5, high_priority: false },
    { task: "Make Lunch", done: false, hours: 1, high_priority: true },
    { task: "Go to the supermarket", done: false, hours: 2, high_priority: false }
])

const newTask = ref('')
const newHours = ref(1)
const isHighPriority = ref(false)

const done = computed(() => tasks.value.filter(task => task.done).length)
const remainingHours = computed(() => {
    return tasks.value
        .filter(task => !task.done)
        .reduce((sum, task) => sum + task.hours, 0)
})

const sortedTasks = computed(() => {
    return [...tasks.value].sort((a, b) => {
        if (a.high_priority && !b.high_priority) return -1
        if (!a.high_priority && b.high_priority) return 1
        return 0
    })
})

function addTask() {
    if (newTask.value.trim()) {
        tasks.value.push({
            task: newTask.value.trim(),
            done: false,
            hours: parseFloat(newHours.value) || 0,
            high_priority: isHighPriority.value
        })
        newTask.value = ''
        newHours.value = 1
        isHighPriority.value = false
    }
}

function toggleTask(task) {
    task.done = !task.done
}

function removeTask(taskToRemove) {
    const index = tasks.value.findIndex(task => task === taskToRemove)
    if (index !== -1) {
        tasks.value.splice(index, 1)
    }
}

function doneTask(task) {
    task.done = true
}
</script>

<template>
    <div class="ToDoList">
        <h1>ToDoList</h1>
        
        <div class="status">
            <p>{{ done }} von {{ tasks.length }} Tasks sind erledigt, {{ remainingHours }} h Aufwand offen</p>
        </div>

        <div class="NewTask">
            <input type="text" placeholder="New Task" v-model="newTask">
            <input type="number" placeholder="Hours" v-model="newHours" min="0" step="0.5">
            <label>
                <input type="checkbox" v-model="isHighPriority"> Hohe Priorität
            </label>
            <button @click="addTask">Add</button>
        </div>

        <div class="Tasks">
            <table>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Prio</th>
                        <th>Task</th>
                        <th>Stunden</th>
                        <th>Aktionen</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="task in sortedTasks" :key="task.task" :class="{'is-done': task.done, 'high-priority': task.high_priority}">
                        <td>
                            <input type="checkbox" v-model="task.done" @change="toggleTask(task)">
                        </td>
                        <td>{{ task.high_priority ? 'Hoch' : 'Normal' }}</td>
                        <td>{{ task.task }}</td>
                        <td>{{ task.hours }}</td>
                        <td>
                            <button @click="removeTask(task)">Remove</button>
                            <button @click="doneTask(task)" :disabled="task.done">Done</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style>
.ToDoList {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    text-align: center;
    color: #333;
}

.status {
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
}

.NewTask {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    align-items: center;
}

.NewTask input[type="text"] {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.NewTask input[type="number"] {
    width: 80px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 8px 12px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    text-align: left;
    padding: 12px;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #f2f2f2;
    font-weight: bold;
}

.is-done {
    text-decoration: line-through;
    color: #999;
    background-color: #f9f9f9;
}

.high-priority:not(.is-done) {
    background-color: #fff8e1;
    font-weight: bold;
}
</style>