import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import StockCard from './components/StockCard';
import ActivityFeed from './components/ActivityFeed';
import ConsumptionChart from './components/ConsumptionChart';
import UserList from './components/UserList';
import TransactionHistory from './components/TransactionHistory';
import UserManagement from './components/UserManagement';
import AddUserModal from './components/AddUserModal';
import { ViewState, StockItem, Transaction, User } from './types';
import { INITIAL_STOCK, WEEKLY_DATA } from './constants';
import { Menu, Zap } from 'lucide-react';
import { api } from './services/api';

function App() {
  const [view, setView] = useState<ViewState>('DASHBOARD');
  
  // State for switching between Mock Data and Live API
  // Hardcoded to true as per request: "Demo mode always on without toggle"
  const [isMockMode] = useState(true);

  // State initialization with empty/default values
  const [stock, setStock] = useState<StockItem>(INITIAL_STOCK);
  const [transactions, setTransactions] = useState<Transaction[]>([]); 
  const [users, setUsers] = useState<User[]>([]); 
  const [weeklyData, setWeeklyData] = useState<any[]>(WEEKLY_DATA); 
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [connectionError, setConnectionError] = useState(false);

  // Function to load data from the PHP API or Mock Data
  const loadData = async () => {
    try {
      const data = await api.getDashboardData(isMockMode);
      setUsers(data.users);
      setStock(data.stock);
      setTransactions(data.transactions);
      setWeeklyData(data.weeklyData);
      
      // If we are in mock mode, there is never a connection error
      setConnectionError(isMockMode ? false : false);
    } catch (error) {
      console.error("Failed to load data");
      if (!isMockMode) {
        setConnectionError(true);
      }
    }
  };

  // Reload data when isMockMode changes (or on mount)
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMockMode]);

  // Polling (Refresh every 5 seconds)
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Refresh automatically even in mock mode to simulate life
      loadData();
    }, 5000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMockMode]);

  const handleAddUser = async (name: string, rfid: string) => {
    // Call API with current mode
    const success = await api.addUser(name, rfid, isMockMode);
    if (success) {
      await loadData(); 
      setIsAddUserModalOpen(false);
      if(isMockMode) alert("Gebruiker toegevoegd (Demo Modus)");
    } else {
      alert("Kon gebruiker niet toevoegen. Check verbinding.");
    }
  };

  const renderContent = () => {
    if (view === 'TRANSACTIONS') {
        return (
            <TransactionHistory 
                transactions={transactions} 
            />
        );
    }

    if (view === 'USERS') {
        return (
          <UserManagement 
            users={users} 
            onAddUserClick={() => setIsAddUserModalOpen(true)}
          />
        );
    }

    // Default Dashboard View
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        {/* Top Row */}
        <div className="h-[400px]">
          <StockCard stock={stock} />
        </div>
        
        <div className="h-[400px]">
          <ActivityFeed 
              transactions={transactions} 
              onViewAll={() => setView('TRANSACTIONS')} 
          />
        </div>
        
        {/* Bottom Row */}
        <div className="h-[400px]">
          <ConsumptionChart data={weeklyData} />
        </div>
        
        <div className="h-[400px]">
          <UserList 
              users={users} 
              onManage={() => setView('USERS')} 
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Sidebar 
        currentView={view} 
        setView={setView} 
      />
      
      {/* Banner for Mock Mode */}
      {isMockMode && (
        <div className="bg-blue-600 text-white px-4 py-2 text-center text-sm font-medium flex items-center justify-center gap-2 md:ml-64">
           <Zap className="w-4 h-4 text-yellow-300" />
           Demo Modus Actief
        </div>
      )}

      {/* Mobile Header */}
      <div className="md:hidden bg-white p-4 border-b border-slate-200 flex items-center justify-between sticky top-0 z-20">
        <h1 className="text-lg font-bold flex items-center gap-2">
            Brew Buddy
        </h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="w-6 h-6 text-slate-700" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-slate-900/50 z-30" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="bg-white w-3/4 h-full p-4" onClick={(e) => e.stopPropagation()}>
                 <nav className="space-y-4 mt-4">
                    <button onClick={() => {setView('DASHBOARD'); setIsMobileMenuOpen(false)}} className="block w-full text-left px-4 py-2 font-medium">Dashboard</button>
                    <button onClick={() => {setView('TRANSACTIONS'); setIsMobileMenuOpen(false)}} className="block w-full text-left px-4 py-2 font-medium">Transacties</button>
                    <button onClick={() => {setView('USERS'); setIsMobileMenuOpen(false)}} className="block w-full text-left px-4 py-2 font-medium">Gebruikers</button>
                 </nav>
              </div>
          </div>
      )}

      <main className="md:ml-64 p-6 md:p-12 max-w-7xl mx-auto">
        {renderContent()}
      </main>

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onConfirm={handleAddUser}
      />
    </div>
  );
}

export default App;