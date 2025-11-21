import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import StockCard from './components/StockCard';
import ActivityFeed from './components/ActivityFeed';
import ConsumptionChart from './components/ConsumptionChart';
import UserList from './components/UserList';
import TransactionHistory from './components/TransactionHistory';
import UserManagement from './components/UserManagement';
import AddStockModal from './components/AddStockModal';
import AddUserModal from './components/AddUserModal';
import { ViewState, StockItem, Transaction, User } from './types';
import { INITIAL_STOCK, RECENT_TRANSACTIONS, MOCK_USERS, WEEKLY_DATA } from './constants';
import { Menu } from 'lucide-react';

function App() {
  const [view, setView] = useState<ViewState>('DASHBOARD');
  const [stock, setStock] = useState<StockItem>(INITIAL_STOCK);
  const [transactions, setTransactions] = useState<Transaction[]>(RECENT_TRANSACTIONS);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const handleOpenAddStock = () => {
    setIsAddStockModalOpen(true);
  };

  const handleConfirmAddStock = (amount: number) => {
    const newStock = { ...stock, quantity: stock.quantity + amount };
    setStock(newStock);
    
    const newTransaction: Transaction = {
      id: `t${Date.now()}`,
      userId: '3', // Mock user 'Jaydi' usually refills
      userName: 'Jaydi',
      type: 'RESTOCK',
      amount: amount,
      item: 'voorraad',
      timestamp: new Date()
    };
    
    setTransactions([newTransaction, ...transactions]);
    setIsAddStockModalOpen(false);
  };

  const handleAddUser = (name: string, rfid: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: name,
      rfid: rfid,
      totalConsumption: 0,
      memberSince: new Date().toISOString().split('T')[0] // YYYY-MM-DD
    };
    setUsers([...users, newUser]);
    setIsAddUserModalOpen(false);
  };

  const renderContent = () => {
    if (view === 'TRANSACTIONS') {
        return (
            <TransactionHistory 
                transactions={transactions} 
                onAddStock={handleOpenAddStock} 
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
          <StockCard stock={stock} onAddStock={handleOpenAddStock} />
        </div>
        
        <div className="h-[400px]">
          <ActivityFeed 
              transactions={transactions} 
              onViewAll={() => setView('TRANSACTIONS')} 
          />
        </div>
        
        {/* Bottom Row */}
        <div className="h-[400px]">
          <ConsumptionChart data={WEEKLY_DATA} />
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
      <Sidebar currentView={view} setView={setView} />
      
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

      <AddStockModal 
        isOpen={isAddStockModalOpen}
        onClose={() => setIsAddStockModalOpen(false)}
        onConfirm={handleConfirmAddStock}
      />

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onConfirm={handleAddUser}
      />
    </div>
  );
}

export default App;