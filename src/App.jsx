import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import MasterLayout from './components/MasterLayout';
import Dashboard from './pages/Dashboard';
import CraftDiscoveryView from './pages/CraftDiscoveryView';
import TeaHeritageView from './pages/TeaHeritageView';
import SanctuaryLedgerView from './pages/SanctuaryLedgerView';
import FieldJournalPlanner from './pages/FieldJournalPlanner';

// Refactored Assam Guide route mapping tree
const PAGES = {
  dashboard: Dashboard,
  fabric:    CraftDiscoveryView,
  tea:       TeaHeritageView,
  sanctuary: SanctuaryLedgerView,
  planner:   FieldJournalPlanner,
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
