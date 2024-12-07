import * as React from 'react'; // Use named import for React
import './App.css'; // Imports Tailwind and any global styles
import { BrowserRouter as Router } from 'react-router-dom';
import TopNavBar from './components/TopNavBar';
import MainRouter from './components/MainRouter';

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <TopNavBar />
        <div className="flex-grow p-4 overflow-auto">
          <MainRouter />
        </div>
      </div>
    </Router>
  );
}

export default App;
