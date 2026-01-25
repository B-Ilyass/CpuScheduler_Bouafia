class Process {
    constructor(name, arrivalTime, burstTime, priority) {
        this.name = name;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
        this.remainingTime = burstTime;
        this.priority = priority;
        this.color = this.getRandomColor();
    }

    getRandomColor() {
        const colors = ['#FFDDC1', '#C1FFD7', '#C1D4FF', '#FFC1F1', '#FFF2C1', '#C1FFF2', '#E1C1FF', '#FFC1C1'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
}

let processes = [];

function addProcess() {
    const name = document.getElementById('processName').value;
    const arrivalTime = parseInt(document.getElementById('arrivalTime').value);
    const burstTime = parseInt(document.getElementById('burstTime').value);
    const priority = parseInt(document.getElementById('priority').value);

    if (!name || isNaN(arrivalTime) || isNaN(burstTime) || isNaN(priority)) {
        alert('Please fill all fields correctly.');
        return;
    }

    if (processes.some(p => p.name === name)) {
        alert('Process name must be unique.');
        return;
    }

    const process = new Process(name, arrivalTime, burstTime, priority);
    processes.push(process);
    updateTable();
    clearForm();
}

function updateTable() {
    const tbody = document.querySelector('#idTable tbody');
    let html = '';
    processes.forEach(process => {
        html += `
            <tr style="background-color: ${process.color};">
                <td>${process.name}</td>
                <td>${process.arrivalTime}</td>
                <td>${process.burstTime}</td>
                <td>${process.remainingTime}</td>
                <td>${process.priority}</td>
            </tr>
        `;
    });
    tbody.innerHTML = html;
}

function clearForm() {
    document.getElementById('processName').value = '';
    document.getElementById('arrivalTime').value = '';
    document.getElementById('burstTime').value = '';
    document.getElementById('priority').value = '';
}

function start() {
  // + dopo
}

function reset() {
    processes = [];
    updateTable();
}
