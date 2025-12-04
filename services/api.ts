import { Transaction, User, StockItem } from '../types';
import { MOCK_USERS, RECENT_TRANSACTIONS, INITIAL_STOCK, WEEKLY_DATA } from '../constants';

// Pas dit aan naar jouw lokale server adres
const API_BASE_URL = 'http://localhost/brewbuddy/api';

// Hulpfuncties om Database (snake_case) naar App (camelCase) te vertalen
const mapUserFromDB = (data: any): User => ({
  id: String(data.id),
  name: data.name,
  rfid: data.rfid,
  totalConsumption: Number(data.total_consumption || 0),
  memberSince: data.created_at ? data.created_at.split(' ')[0] : new Date().toISOString().split('T')[0], // YYYY-MM-DD
});

const mapTransactionFromDB = (data: any): Transaction => ({
  id: String(data.id),
  userId: String(data.user_id),
  userName: data.user_name || 'Onbekend',
  type: data.type as 'CONSUMPTION' | 'RESTOCK',
  amount: Math.abs(Number(data.amount)),
  item: data.type === 'CONSUMPTION' ? 'biertje' : 'voorraad',
  timestamp: new Date(data.timestamp), // Zet MySQL datum string om naar JS Date object
});

export const api = {
  // Haal alle data op
  getDashboardData: async (useMock: boolean) => {
    // === MOCK MODE ===
    if (useMock) {
        // Simuleren van netwerk vertraging
        await new Promise(resolve => setTimeout(resolve, 500)); 
        return {
            users: MOCK_USERS,
            stock: INITIAL_STOCK,
            transactions: RECENT_TRANSACTIONS,
            weeklyData: WEEKLY_DATA
        };
    }

    // === LIVE MODE ===
    try {
      // We gebruiken Promise.allSettled zodat als 1 ding faalt (bijv stats), de rest wel laadt
      const results = await Promise.allSettled([
        fetch(`${API_BASE_URL}/users.php`),
        fetch(`${API_BASE_URL}/stock.php`),
        fetch(`${API_BASE_URL}/transactions.php`),
        fetch(`${API_BASE_URL}/stats.php?type=weekly`)
      ]);

      // Hulpfunctie om JSON te extracten of default waarde te geven
      const getData = async (result: PromiseSettledResult<Response>, defaultVal: any) => {
        if (result.status === 'fulfilled' && result.value.ok) {
          return await result.value.json();
        }
        return defaultVal;
      };

      const rawUsers = await getData(results[0], []);
      const rawStock = await getData(results[1], { quantity: 0 });
      const rawTransactions = await getData(results[2], []);
      const rawWeekly = await getData(results[3], []);

      // Mapping toepassen
      const users: User[] = Array.isArray(rawUsers) ? rawUsers.map(mapUserFromDB) : [];
      
      const stock: StockItem = {
        id: 'beer',
        name: 'Pilsner',
        quantity: Number(rawStock.quantity || 0), // Zorg dat dit altijd een nummer is
        maxCapacity: 48,
        icon: 'beer'
      };

      const transactions: Transaction[] = Array.isArray(rawTransactions) 
        ? rawTransactions.map(mapTransactionFromDB) 
        : [];

      // Weekly data mappen als de API dit in een ander formaat teruggeeft
      const weeklyData = Array.isArray(rawWeekly) ? rawWeekly : [
          { name: 'Ma', usage: 0 }, { name: 'Di', usage: 0 }, 
          { name: 'Wo', usage: 0 }, { name: 'Do', usage: 0 }, 
          { name: 'Vr', usage: 0 }, { name: 'Za', usage: 0 }, 
          { name: 'Zo', usage: 0 }
      ];

      return { users, stock, transactions, weeklyData };

    } catch (error) {
      console.error("API Connection Error:", error);
      throw error;
    }
  },

  addUser: async (name: string, rfid: string, useMock: boolean): Promise<boolean> => {
    if (useMock) {
        console.log(`[MOCK] Adding user: ${name}, ${rfid}`);
        return true;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/users.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rfid })
      });
      return response.ok;
    } catch (error) {
      console.error("Error adding user:", error);
      return false;
    }
  },

  addStock: async (amount: number, useMock: boolean): Promise<boolean> => {
    if (useMock) {
        console.log(`[MOCK] Adding stock: ${amount}`);
        return true;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/transactions.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          user_id: 1, // Zorg dat ID 1 bestaat in je DB als 'Admin' of 'Systeem'
          type: 'RESTOCK', 
          amount: amount
        })
      });
      return response.ok;
    } catch (error) {
      console.error("Error adding stock:", error);
      return false;
    }
  }
};