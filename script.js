class Process {
    constructor(name, arrivalTime, burstTime, priority) {
        this.name = name;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
        this.remainingTime = burstTime;
        this.priority = priority;
        this.color = this.getRandomColor();
    }
    // GPT
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

    const process = new Process(name, arrivalTime, burstTime, priority);
    processes.push(process);
    updateTable();
    updateProgressBar();
}

// gpt
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


function updateProgressBar() {
    const container = document.getElementById('progressBar');
    container.innerHTML = ''; 
    let totalBurst = 0;
    processes.forEach(p => totalBurst += p.burstTime);

    processes.forEach(p => {
        let percent = (p.burstTime / totalBurst) * 100;
        const div = document.createElement('div');
        div.classList.add('progress-bar');
        div.style.width = percent + '%';
        div.style.backgroundColor = p.color; 
        div.textContent = p.name;
        container.appendChild(div);
    });
}

function start() {
    updateTable();
    updateProgressBar();
    console.log('Simulation of round robin started');
}

function reset() {
    processes = [];
    updateTable();
    updateProgressBar();
    console.log('Simulation resetted');
}
