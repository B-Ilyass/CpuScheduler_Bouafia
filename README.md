# CPU Scheduler Simulator - Round Robin

Un simulatore interattivo dell'algoritmo di scheduling CPU **Round Robin** basato su web.

## 📋 Descrizione

L'applicazione permette di simulare il funzionamento dell'algoritmo Round Robin per lo scheduling dei processi CPU. Ogni processo riceve un intervallo di tempo fisso (time slice) per l'esecuzione. Se non completa entro il time slice, viene rimesso in fondo alla coda.

## ✨ Caratteristiche

- **Aggiunta processi dinamica**: Inserisci processi con tempo di arrivo e burst time
- **Simulazione Round Robin**: Esegui la simulazione con time slice personalizzabile
- **Diagramma di Gantt**: Visualizzazione grafica della distribuzione del tempo CPU
- **Calcolo metriche**:
  - Average Turnaround Time (tempo medio di completamento)
  - Average Response Time (tempo medio di risposta)
  - CPU Efficiency (efficienza della CPU)
- **Colori diversi**: Ogni processo ha un colore unico (processi consecutivi non possono avere lo stesso colore)

## 🚀 Come utilizzare

1. **Aggiungi Time Slice**: Inserisci un valore per il time slice
2. **Aggiungi Processi**: 
   - Process Name: Nome del processo (es. P1)
   - Arrival Time: Quando arriva il processo
   - Burst Time: Quanto tempo ha bisogno
   - Priority: Livello di priorità
3. **Clicca Start**: Esegui la simulazione
4. **Visualizza Risultati**: Guarda il diagramma e le metriche calcolate
5. **Reset**: Pulisci tutto e ricomincia

## 📊 Algoritmo Round Robin

L'algoritmo RR funziona così:
- Ogni processo riceve un intervallo di tempo fisso (time slice)
- Se completa, esce dalla coda
- Se non completa, va in fondo alla coda
- È uno scheduling **preemptive** e **fair** per tutti i processi

## 🛠️ Tecnologie

- HTML5
- CSS3 (Bootstrap)
- JavaScript Vanilla

## 📁 File

- `index.html` - Struttura HTML
- `script.js` - Logica della simulazione
- `styles.css` - Stili personalizzati (se presente)
- `README.md` - Questo file