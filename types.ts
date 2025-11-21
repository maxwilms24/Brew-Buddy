export interface User {
  id: string;
  name: string;
  rfid: string;
  totalConsumption: number;
  memberSince: string;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: 'CONSUMPTION' | 'RESTOCK';
  amount: number;
  item: string;
  timestamp: Date;
}

export interface StockItem {
  id: string;
  name: string;
  quantity: number;
  maxCapacity: number;
  icon: string;
}

export type ViewState = 'DASHBOARD' | 'TRANSACTIONS' | 'USERS';