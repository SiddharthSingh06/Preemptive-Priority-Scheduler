# Contributing to Preemptive Priority Scheduler

First off, thank you for considering contributing to the Preemptive Priority Scheduler! Contributions like yours help make this tool better for everyone.

Here is a guide on how you can get started and contribute to the project.

## How Can I Contribute?

### 1. Reporting Bugs
* Check the current Issues to see if the bug has already been reported.
* If not, open a new Issue, clearly describing the problem, steps to reproduce it, and the expected behavior.

### 2. Suggesting Enhancements
* If you have ideas to improve the visualization, UI, or scheduling algorithm simulations, feel free to open an Issue to discuss them.

### 3. Pull Requests
If you are ready to make a direct code contribution:
1. **Fork** the repository: [SiddharthSingh06/Preemptive-Priority-Scheduler](https://github.com/SiddharthSingh06/Preemptive-Priority-Scheduler).
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/Preemptive-Priority-Scheduler.git
   cd Preemptive-Priority-Scheduler
   ```
3. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Install dependencies** and run the development server (see [Development Setup](#development-setup)).
5. **Make your changes** and ensure they align with the code style.
6. **Commit your changes** with clear, descriptive commit messages:
   ```bash
   git commit -m "Add feature to visualize ready queue state"
   ```
7. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Open a Pull Request** (PR) from your branch to the `main` branch of the original repository.

---

## Development Setup

To set up the project locally, ensure you have [Node.js](https://nodejs.org/) installed, and then run:

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
This will launch the app at `http://localhost:5173/` (or another port shown in your terminal).

### 3. Linting
Before committing, please check that the code adheres to the linting configuration:
```bash
npm run lint
```

### 4. Build for Production
To verify that the application compiles correctly for production:
```bash
npm run build
```

---

## Code of Conduct & Style Guide
* Keep the code clean, modular, and well-typed with TypeScript.
* Style using Tailwind CSS.
* Ensure UI elements remain highly responsive across mobile and desktop viewports.
