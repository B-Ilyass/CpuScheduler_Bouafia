let processes = [];
const colors = ['#FFDDC1', '#C1FFD7', '#C1D4FF', '#FFC1F1', '#FFF2C1', '#C1FFF2', '#E1C1FF', '#FFC1C1'];

function addProcess() {
    const name = document.getElementById('processName').value;
    const arrivalTime = parseInt(document.getElementById('arrivalTime').value);
    const burstTime = parseInt(document.getElementById('burstTime').value);
    const priority = parseInt(document.getElementById('priority').value);

    if (!name || isNaN(arrivalTime) || isNaN(burstTime) || isNaN(priority)) {
        alert('Please fill all fields correctly.');
        return;
    }

    let color;
    do {
        color = colors[Math.floor(Math.random() * colors.length)];
    } while (processes.length > 0 && color === processes[processes.length - 1].color);
    
    processes.push({ name, arrivalTime, burstTime, priority, color });
    updateTable();
}

function updateTable() {
    const tbody = document.querySelector('#idTable tbody');
    tbody.innerHTML = processes.map(p => `
        <tr style="background-color: ${p.color};">
            <td>${p.name}</td>
            <td>${p.arrivalTime}</td>
            <td>${p.burstTime}</td>
            <td>${p.burstTime}</td>
            <td>${p.priority}</td>
        </tr>
    `).join('');
}

function start() {
    if (!processes.length || !document.getElementById('timeSlice').value) return;
    
    const result = simulateRoundRobin(processes, parseInt(document.getElementById('timeSlice').value));
    updateProgressBar();
    
    const avgT = result.reduce((a, p) => a + (p.completion - p.arrival), 0) / result.length;
    const avgR = result.reduce((a, p) => a + (p.firstRun - p.arrival), 0) / result.length;
    const eff = (result.reduce((a, p) => a + p.burst, 0) / result[result.length - 1].completion) * 100;

    document.getElementById('avgTurnaroundTime').textContent = avgT.toFixed(2);
    document.getElementById('avgResponseTime').textContent = avgR.toFixed(2);
    document.getElementById('cpuEfficiency').textContent = eff.toFixed(2) + '%';
    document.getElementById('resultsContainer').style.display = 'block';
}

function simulateRoundRobin(pa, ts) {
    let p = pa.map(x => ({...x, arrival: x.arrivalTime, burst: x.burstTime, remaining: x.burstTime, firstRun: null, completion: null})).sort((a, b) => a.arrival - b.arrival);
    let t = 0, q = [], d = [], i = 0;
    while (d.length < p.length) {
        while (i < p.length && p[i].arrival <= t) q.push(p[i++]);
        if (!q.length) { if (i < p.length) t = p[i].arrival; else break; continue; }
        const x = q.shift();
        if (!x.firstRun) x.firstRun = t;
        const e = Math.min(x.remaining, ts);
        x.remaining -= e;
        t += e;
        if (x.remaining) q.push(x);
        else { x.completion = t; d.push(x); }
    }
    return d;
}

function updateProgressBar() {
    const container = document.getElementById('progressBar');
    const totalBurst = processes.reduce((a, p) => a + p.burstTime, 0);
    
    container.innerHTML = processes.map(p => {
        const percent = (p.burstTime / totalBurst) * 100;
        return `<div class="progress-bar" style="width: ${percent}%; background-color: ${p.color};">${p.name}</div>`;
    }).join('');
}

function reset() {
    processes = [];
    document.querySelector('#idTable tbody').innerHTML = '';
    document.getElementById('progressBar').innerHTML = '';
    document.getElementById('processName').value = '';
    document.getElementById('arrivalTime').value = '';
    document.getElementById('burstTime').value = '';
    document.getElementById('priority').value = '';
    document.getElementById('timeSlice').value = '';
    document.getElementById('resultsContainer').style.display = 'none';
    document.getElementById('avgTurnaroundTime').textContent = '-';
    document.getElementById('avgResponseTime').textContent = '-';
    document.getElementById('cpuEfficiency').textContent = '-';
}
