# Preemptive Priority CPU Scheduler Visualizer

An interactive, web-based simulation tool designed to visualize the **Preemptive Priority CPU Scheduling Algorithm**. This visualizer helps students, developers, and educators understand how operating systems manage processes using priorities with preemption.

## 🚀 Features

- **Interactive Process Manager**: Add, edit, or remove processes dynamically with custom Arrival Times, Burst Times, and Priorities.
- **Lower-Value Higher-Priority Standard**: Implements the standard convention where a lower numerical value represents a higher priority (e.g., Priority `1` > Priority `3`).
- **Preemptive Execution Simulation**: Visualizes preemption in real-time. If a new process arrives with a priority higher than the currently running process, the CPU preempts the current process and starts the new one.
- **Visual Gantt Chart**: Automatically generates an interactive, color-coded Gantt chart displaying the timeline of execution, including CPU `Idle` state tracking.
- **Detailed Process Statistics**: Computes and displays individual process statistics:
  - Completion Time (CT)
  - Turnaround Time (TAT)
  - Waiting Time (WT)
- **Average Metrics**: Computes and shows Average Turnaround Time and Average Waiting Time.
- **Sample Data Loader**: Pre-populate the table with sample processes for quick testing, demos, or learning.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) (with [TypeScript](https://www.typescriptlang.org/))
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)

---

## 📦 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/SiddharthSingh06/Preemptive-Priority-Scheduler.git
   cd Preemptive-Priority-Scheduler
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173/` (or the address shown in your terminal).

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```text
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── src
│   ├── App.tsx          # Main scheduling logic, UI layout, and simulation engine
│   ├── index.css        # Global styles and Tailwind directives
│   ├── main.tsx         # React root rendering entrypoint
│   └── vite-env.d.ts    # Vite TypeScript environment declarations
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to open issues, suggest improvements, or submit pull requests. Check out the [Contributing Guidelines](./CONTRIBUTING.md) for details on code style and setup workflows.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.


---

## 👥 Authors & Contributors

- [Siddharth Singh](https://github.com/SiddharthSingh06)
- [Shivam](https://github.com/shivam-techstack)

