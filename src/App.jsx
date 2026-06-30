import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import MasterLayout from './components/MasterLayout';
import Dashboard from './pages/Dashboard';
import Planner from './pages/Planner';
import Artisans from './pages/Artisans';
import Calendar from './pages/Calendar';
import Community from './pages/Community';

// Page map — maps route id → component
const PAGES = {
  dashboard: Dashboard,
  planner:   Planner,
  artisans:  Artisans,
  calendar:  Calendar,
  community: Community,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const PageComponent = PAGES[currentPage] || Dashboard;

  const handleNavigate = (pageId) => {
    if (PAGES[pageId]) setCurrentPage(pageId);
  };

  return (
    <AppProvider>
      <MasterLayout currentPage={currentPage} onNavigate={handleNavigate}>
        <PageComponent onNavigate={handleNavigate} />
      </MasterLayout>
    </AppProvider>
  );
}
