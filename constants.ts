import { User, Transaction, StockItem } from './types';

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Virgile', rfid: 'A1-B2-C3-D4', totalConsumption: 15, memberSince: '2023-09-01' },
  { id: '2', name: 'Max', rfid: 'E5-F6-G7-H8', totalConsumption: 12, memberSince: '2023-09-05' },
  { id: '3', name: 'Jaydi', rfid: 'I9-J0-K1-L2', totalConsumption: 8, memberSince: '2023-09-10' },
  { id: '4', name: 'Marik', rfid: 'M3-N4-O5-P6', totalConsumption: 61, memberSince: '2023-08-20' },
  { id: '5', name: 'Roxy', rfid: 'Q7-R8-S9-T0', totalConsumption: 4, memberSince: '2023-10-01' },
];

export const INITIAL_STOCK: StockItem = {
  id: 'beer',
  name: 'Pilsner',
  quantity: 12,
  maxCapacity: 48,
  icon: 'beer',
};

export const RECENT_TRANSACTIONS: Transaction[] = [
  { id: 't1', userId: '1', userName: 'Virgile', type: 'CONSUMPTION', amount: 1, item: 'biertje', timestamp: new Date(Date.now() - 1000 * 60 * 30) },
  { id: 't2', userId: '2', userName: 'Max', type: 'CONSUMPTION', amount: 1, item: 'biertje', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
  { id: 't3', userId: '3', userName: 'Jaydi', type: 'RESTOCK', amount: 24, item: 'voorraad', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5) },
  { id: 't4', userId: '4', userName: 'Henk', type: 'CONSUMPTION', amount: 5, item: 'biertje', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  { id: 't5', userId: '5', userName: 'Gert', type: 'CONSUMPTION', amount: 1, item: 'biertje', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26) },
];

export const WEEKLY_DATA = [
  { name: 'Ma', usage: 12 },
  { name: 'Di', usage: 19 },
  { name: 'Wo', usage: 8 },
  { name: 'Do', usage: 24 },
  { name: 'Vr', usage: 35 },
  { name: 'Za', usage: 42 },
  { name: 'Zo', usage: 15 },
];