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

// gpt
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

// gpt
function start() {
    if (!processes.length || !document.getElementById('timeSlice').value) return;
    
    const ts = parseInt(document.getElementById('timeSlice').value);
    const q = processes.map(p => ({ ...p, r: p.burstTime, f: -1, c: 0 }));
    const rdy = [];
    let t = 0, i = 0;
    
    while (i < q.length || rdy.length) {
        while (i < q.length && q[i].arrivalTime <= t) rdy.push(q[i++]);
        if (!rdy.length) { t = q[i].arrivalTime; continue; }
        const p = rdy.shift();
        if (p.f === -1) p.f = t;
        const e = Math.min(ts, p.r);
        t += e;
        p.r -= e;
        if (p.r > 0) rdy.push(p);
        else p.c = t;
    }
    
    const n = q.length;
    const aT = q.reduce((a, p) => a + (p.c - p.arrivalTime), 0) / n;
    const aR = q.reduce((a, p) => a + (p.f - p.arrivalTime), 0) / n;
    const eff = (q.reduce((a, p) => a + p.burstTime, 0) / t) * 100;

    document.getElementById('avgTurnaroundTime').textContent = aT.toFixed(2);
    document.getElementById('avgResponseTime').textContent = aR.toFixed(2);
    document.getElementById('cpuEfficiency').textContent = eff.toFixed(2) + '%';
    document.getElementById('resultsContainer').style.display = 'block';
    updateProgressBar();
}


//gpt
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
