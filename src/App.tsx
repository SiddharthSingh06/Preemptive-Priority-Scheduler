import React, { useState, useMemo } from 'react';
import { PlusCircle, MinusCircle, Play, Clock, Zap, Target, Database } from 'lucide-react';

interface Process {
  id: string;
  name: string;
  arrivalTime: number;
  burstTime: number;
  priority: number;
  remainingTime?: number;
  startTime?: number;
  completionTime?: number;
  turnaroundTime?: number;
  waitingTime?: number;
}

interface GanttChartItem {
  time: number;
  process: string;
}

const generateProcessColor = (processName: string) => {
  const colors = [
    'bg-blue-100 border-blue-300',
    'bg-purple-100 border-purple-300',
    'bg-green-100 border-green-300',
    'bg-yellow-100 border-yellow-300',
    'bg-pink-100 border-pink-300',
    'bg-indigo-100 border-indigo-300',
    'bg-red-100 border-red-300',
    'bg-orange-100 border-orange-300',
    'bg-teal-100 border-teal-300',
    'bg-cyan-100 border-cyan-300'
  ];
  
  const hash = processName.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  return colors[Math.abs(hash) % colors.length];
};

function App() {
  const [processes, setProcesses] = useState<Process[]>([
    { id: '1', name: 'P1', arrivalTime: 0, burstTime: 0, priority: 0 }
  ]);
  const [results, setResults] = useState<{
    completed: Process[];
    avgTurnaround: number;
    avgWaiting: number;
    ganttChart: GanttChartItem[];
  } | null>(null);

  const processColors = useMemo(() => {
    const colors: Record<string, string> = {};
    processes.forEach(process => {
      colors[process.name] = generateProcessColor(process.name);
    });
    return colors;
  }, [processes]);

  const addProcess = () => {
    const newId = (processes.length + 1).toString();
    setProcesses([...processes, {
      id: newId,
      name: `P${newId}`,
      arrivalTime: 0,
      burstTime: 0,
      priority: 0
    }]);
  };

  const removeProcess = (id: string) => {
    if (processes.length > 1) {
      setProcesses(processes.filter(p => p.id !== id));
    }
  };

  const updateProcess = (id: string, field: keyof Process, value: number | string) => {
    setProcesses(processes.map(p => {
      if (p.id === id) {
        return { ...p, [field]: field === 'name' ? value : Number(value) };
      }
      return p;
    }));
  };

  const loadSampleData = () => {
    const sampleProcesses: Process[] = [
      { id: '1', name: 'P1', arrivalTime: 0, burstTime: 8, priority: 3 },
      { id: '2', name: 'P2', arrivalTime: 1, burstTime: 4, priority: 1 },
      { id: '3', name: 'P3', arrivalTime: 2, burstTime: 9, priority: 4 },
      { id: '4', name: 'P4', arrivalTime: 3, burstTime: 5, priority: 2 },
      { id: '5', name: 'P5', arrivalTime: 4, burstTime: 2, priority: 5 }
    ];
    setProcesses(sampleProcesses);
    setResults(null);
  };

  const runScheduler = () => {
    const workingProcesses = processes.map(p => ({
      ...p,
      remainingTime: p.burstTime
    })).sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = 0;
    const completed: Process[] = [];
    const readyQueue: Process[] = [];
    const ganttChart: GanttChartItem[] = [];
    let i = 0;

    while (completed.length < processes.length) {
      while (i < workingProcesses.length && workingProcesses[i].arrivalTime <= currentTime) {
        readyQueue.push(workingProcesses[i]);
        i++;
      }

      if (readyQueue.length > 0) {
        readyQueue.sort((a, b) => a.priority - b.priority);
        const currentProcess = readyQueue[0];

        if (currentProcess.startTime === undefined) {
          currentProcess.startTime = currentTime;
        }

        ganttChart.push({ time: currentTime, process: currentProcess.name });
        currentTime++;
        currentProcess.remainingTime!--;

        if (currentProcess.remainingTime === 0) {
          currentProcess.completionTime = currentTime;
          currentProcess.turnaroundTime = currentProcess.completionTime - currentProcess.arrivalTime;
          currentProcess.waitingTime = currentProcess.turnaroundTime - currentProcess.burstTime;
          completed.push(currentProcess);
          readyQueue.shift();
        }
      } else {
        ganttChart.push({ time: currentTime, process: 'Idle' });
        currentTime++;
      }
    }

    const avgTurnaround = completed.reduce((sum, p) => sum + p.turnaroundTime!, 0) / completed.length;
    const avgWaiting = completed.reduce((sum, p) => sum + p.waitingTime!, 0) / completed.length;

    setResults({
      completed,
      avgTurnaround,
      avgWaiting,
      ganttChart
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8 text-center">
          Preemptive Priority Scheduler
        </h1>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="mb-6">
            <div className="grid grid-cols-5 gap-4 mb-4 font-semibold text-gray-700 bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Process Name
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Arrival Time
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Burst Time
              </div>
              <div>Priority</div>
              <div></div>
            </div>
            
            {processes.map((process) => (
              <div key={process.id} className="grid grid-cols-5 gap-4 mb-2">
                <input
                  type="text"
                  value={process.name}
                  onChange={(e) => updateProcess(process.id, 'name', e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
                <input
                  type="number"
                  value={process.arrivalTime}
                  onChange={(e) => updateProcess(process.id, 'arrivalTime', e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  min="0"
                />
                <input
                  type="number"
                  value={process.burstTime}
                  onChange={(e) => updateProcess(process.id, 'burstTime', e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  min="1"
                />
                <input
                  type="number"
                  value={process.priority}
                  onChange={(e) => updateProcess(process.id, 'priority', e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  min="0"
                />
                <button
                  onClick={() => removeProcess(process.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <MinusCircle className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={addProcess}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              <PlusCircle className="w-5 h-5" />
              Add Process
            </button>

            <button
              onClick={loadSampleData}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
            >
              <Database className="w-5 h-5" />
              Load Sample Data
            </button>
            
            <button
              onClick={runScheduler}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
            >
              <Play className="w-5 h-5" />
              Run Scheduler
            </button>
          </div>
        </div>

        {results && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Results
            </h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Process Statistics</h3>
              <div className="space-y-2">
                {results.completed.map((process) => (
                  <div key={process.id} className={`${processColors[process.name]} rounded-lg p-3 border transition-all hover:shadow-md`}>
                    <div className="font-medium text-gray-800">{process.name}</div>
                    <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                      <div>Completion: {process.completionTime}</div>
                      <div>Turnaround: {process.turnaroundTime}</div>
                      <div>Waiting: {process.waitingTime}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6 bg-gray-50 rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Average Times</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <span className="font-medium text-blue-600">Average Turnaround Time:</span>{' '}
                  {results.avgTurnaround.toFixed(2)}
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <span className="font-medium text-purple-600">Average Waiting Time:</span>{' '}
                  {results.avgWaiting.toFixed(2)}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Gantt Chart</h3>
              <div className="flex overflow-x-auto pb-4">
                {results.ganttChart.map((item, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-16 h-16 border-r border-gray-200 flex flex-col items-center justify-center transition-all hover:shadow-md ${
                      item.process === 'Idle' 
                        ? 'bg-gray-50 border-gray-200' 
                        : `${processColors[item.process]}`
                    }`}
                  >
                    <div className="text-sm font-medium text-gray-800">{item.process}</div>
                    <div className="text-xs text-gray-500">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;